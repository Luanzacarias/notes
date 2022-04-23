import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    signOut 
} from "../services/firebase";

type User = {
    uid: string
}
type UserLogin = {
    email: string;
    password: string;
}
type AuthContextType = {
    user: User | undefined,
    signIn: (user:UserLogin) => Promise<void>,
    signUp: (user:UserLogin) => Promise<void>,
    handleSignOut: () => Promise<void>
}

type AuthContxtProviderProps = {
    children: ReactNode;
}



export const AuthContext = createContext({} as AuthContextType);

export function AuthContxtProvider(props: AuthContxtProviderProps){

    const [user, setUser] = useState<User>();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user){
                const { uid } = user
                setUser({
                    uid: uid
                })
            }
        
        })

        return () => {
            unsubscribe();
        }
    },[])

    async function signIn(user: UserLogin){
        await signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                if(userCredential.user){
                    const {uid} = userCredential.user;
                    setUser({uid: uid});
                    console.log('Setou user');
                    navigate('/');
                }
            }).catch((error) => {
                if(error.code === 'auth/wrong-password'){
                    alert(`Senha incorreta`)
                } else if (error.code === 'auth/user-not-found') {
                    alert(`Usuário não existe.`);
                }else {
                    alert("Algo deu errado.")
                }
                
            })
        
        
    }
    async function signUp(user: UserLogin){
        await createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                const {uid} = userCredential.user;
                setUser({uid: uid});
                navigate('/');
                
            }).catch((error) => {
                if(error.code === 'auth/email-already-in-use'){
                    alert(`Email já cadastrado, entre na sua conta.`)
                    navigate('/login')
                } else {
                    alert(`Algo de errado, código: ${error.code}`)
                    window.location.reload();

                }                
        })

        
        
    }

    async function handleSignOut(){

        await signOut(auth).then(() => {
            // Sign-out successful.
            setUser(undefined);
            navigate('/login');
            
          }).catch((error) => {
            // An error happened.
            alert(`Algo deu errado, código ${error.code}`)
            window.location.reload();
          });
    }
    

    return (
        <AuthContext.Provider value={{user, signIn, signUp, handleSignOut}}>
            {props.children}
        </AuthContext.Provider>
    )
}