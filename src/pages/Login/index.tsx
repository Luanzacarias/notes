import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/Header";

import organizeImg from '../../assets/organize.svg';
import './styles.scss';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";


export function Login(){

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);
    const [valid, setValid] = useState(false);

    const {user, signIn} = useAuth()
    
    
    useEffect(()=> {
        function hasUser(){
            if(user){
                navigate('/');
            }
        }

        hasUser();

    })

    useEffect(() => {
        handleValid();
    })

    function handleValid(){
        if (email.trim() === '' || password.trim() === ''){
            setValid(false);
            return
        }
        setValid(true);
    }

    function handleSubmit(event: FormEvent){
        event.preventDefault();
        // verificações
        if (email.trim() === '' || password.trim() === ''){
            setErrorMessage(true);
            return
        }
        setErrorMessage(false);
        signIn({email, password});
        
        
    }

   

    return(
        <div id="login">
            <Header />
            <main>
                <aside>
                    <img src={organizeImg} alt="" />
                    <h1>Organize os<br/>
                        seus afazeres<br/>
                        aqui!</h1>
                    <h3>Prático, rápido e gratuito!</h3>
                </aside>
                <form onSubmit={(event) => handleSubmit(event)}>
                    {
                        errorMessage &&
                        <p className="errorMessage">Email e/ou senha vazio(s)</p>
                    }
                    <p>EMAIL</p>
                    <input 
                        type="email" 
                        placeholder="Seu email" 
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}    
                    />
                    
                    <p>SENHA</p>
                    <input 
                        type="password" 
                        placeholder="Sua senha" 
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    
                    <button disabled={!valid} >ENTRAR</button>
               </form>
            </main>
        </div>
    )
}