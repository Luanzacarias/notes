import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../Hooks/useAuth';
import { PopUpDeleteAndEnd } from '../PopUpDeletAndEnd';
import './styles.scss';

type HeaderProps =  {
    isSignOut?: boolean
}

export function Header( props: HeaderProps){

    const {handleSignOut} = useAuth();
    const [popUp, setPopUp] = useState(false);

    function handleOpenPopUp(){
        setPopUp(true);
    }
    function handleClosePopUp(){
        setPopUp(false);
    }
    function signOut(){
        handleSignOut();
    }

    return (
        <div id="header">
            <img src={logoImg} alt="Logo" />
            <div className="buttons">
                {
                    props.isSignOut ?
                        <button className="singOut" onClick={handleOpenPopUp} >Sair</button>
                    :
                    <>
                        <button className="login" ><Link to="/login">Entrar</Link></button>
                        <button className="singUp"><Link to="/signUp">Cadastrar</Link></button>
                    </>
                }
                
            </div>
            {
               popUp && 
                <PopUpDeleteAndEnd
                    closePopUp={handleClosePopUp} 
                    action={signOut}    
                />
            }
        </div>
    )
}