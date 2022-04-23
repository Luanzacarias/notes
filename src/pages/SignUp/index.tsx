import { FormEvent, useEffect, useState } from "react";

import { useAuth } from "../../Hooks/useAuth";
import { Header } from "../../components/Header";

import organizeImg from '../../assets/organize.svg';
import './styles.scss';



export function SignUp(){

    const [email, setEmail] = useState('');
    const [classNameEmail, setClassNameEmail] = useState('');
    const [password, setPassword] = useState('');
    const [classNamePassword, setClassNamePassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [classNameConfirmPassword, setClassNameConfirmPassword] = useState('');

    const [valid, setValid] = useState(false);

    const {signUp} = useAuth();

    useEffect(() => {
        handleValid();
    })

    function handleValidEmail(email: string){
        // verificar se o email está válido
        if (email.includes('@') && email.includes('.')) {
            setClassNameEmail('valid');
        } else {
            setClassNameEmail('invalid')
        }
        // não importa setar o valor msm que errado, pois o type email já verifica antes de submeter o form
        setEmail(email);
    }
    function handleValidPassword(password: string){
        let regexpNumbers = /[0-9]/;
        let regexpLetters = /[a-z, A-Z]/;
        // verificar se a senha está válida
        if (password.match(regexpNumbers) && password.match(regexpLetters) && password.length >= 8) {
            setClassNamePassword('valid');
        } else {
            setClassNamePassword('invalid')
        }
        setPassword(password)
    }
    function handleConfirmPassword(confirmPassword: string){
        // verificar se a senha está válida
        if (confirmPassword === password) {
            setClassNameConfirmPassword('valid');
        } else {
            setClassNameConfirmPassword('invalid')
        }
        setConfirmPassword(confirmPassword);
    }

    function handleValid(){
        
        if (confirmPassword !== password || 
                classNameEmail !== 'valid' || 
                classNamePassword !== 'valid' || 
                classNameConfirmPassword !== 'valid'
            ){
            setValid(false)
            return
        }
        setValid(true)

    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        signUp({email, password});
        
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
                    <p>EMAIL</p>
                    <input 
                        className={classNameEmail}
                        type="email" 
                        placeholder="Seu melhor email"  
                        value={email}
                        onChange={(event) => handleValidEmail(event.target.value)} 
                        
                    />
                    
                    <p>SENHA</p>
                    <input 
                        className={classNamePassword}
                        type="password" 
                        placeholder="Crie sua senha" 
                        minLength={8}
                        value={password}
                        onChange={(event) => handleValidPassword(event.target.value)} 
                    />
                    <p className="requisitions">Mínimo de 8 dígitos.<br/>Letras e números.</p>

                    <p>CONFIRME SUA SENHA</p>
                    <input 
                        className={classNameConfirmPassword}
                        type="password" 
                        placeholder="Confirme sua senha" 
                        value={confirmPassword}
                        onChange={(event) => handleConfirmPassword(event.target.value)}
                    />
                    <button disabled={!valid} >CADASTRAR-SE</button> 
               </form>
            </main>
        </div>
    )
}