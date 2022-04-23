import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../Hooks/useAuth";

import { Header } from "../../components/Header";
import { PopUpNewNote } from "../../components/PopUpNewNote";
import { ListView } from "../../components/ListView";
import { BlockView } from "../../components/BlockView";

import plusSignalImg from "../../assets/plus-signal.svg";
import "./styles.scss";
export function Home(){

    const [popUpAddNote, setPopUpAddNote] = useState(false);
    const [listView, setListView] = useState(true);

    const navigate = useNavigate();
    const {user} = useAuth();

    useEffect(() => {
        
        function hasUser(){
            if(!user){
                navigate('/login');
            }
        }

        hasUser();

    })

    function handleOpenAddNote(){
        setPopUpAddNote(true);
    }
    function handleCloseAddNote(){
        setPopUpAddNote(false);
    }
    function handleChangeToListView(){
        setListView(true);
    }
    function handleChangeToBlockView(){
        setListView(false);
    }

    return(

            <div id="home-page">
                <Header isSignOut />
                <main>
                    <div className="controls">
                        <button className="add" onClick={handleOpenAddNote} >
                            <img src={plusSignalImg} alt="add" />
                            <p>adicionar</p>
                        </button>
                        <div className="view">
                            <button 
                                className={`list ${listView ? 'active' : ''}`} 
                                onClick={handleChangeToListView}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 4H21V6H11V4ZM11 8H17V10H11V8ZM11 14H21V16H11V14ZM11 18H17V20H11V18ZM3 4H9V10H3V4ZM5 6V8H7V6H5ZM3 14H9V20H3V14ZM5 16V18H7V16H5Z" fill={listView ? '#363636' : '#AFAFAF'}/>
                                </svg>
                            </button>
                            <button 
                                className={`block ${listView ? '' : 'active'}`}
                                onClick={handleChangeToBlockView}
                            >
                                <svg width="45" height="24" viewBox="0 0 45 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 4H21V6H11V4ZM11 8H17V10H11V8ZM11 14H21V16H11V14ZM11 18H17V20H11V18ZM3 4H9V10H3V4ZM5 6V8H7V6H5ZM3 14H9V20H3V14ZM5 16V18H7V16H5Z" fill={listView ? '#AFAFAF' : '#363636'}/>
                                    <path d="M32 4H42V6H32V4ZM32 8H38V10H32V8ZM32 14H42V16H32V14ZM32 18H38V20H32V18ZM24 4H30V10H24V4ZM26 6V8H28V6H26ZM24 14H30V20H24V14ZM26 16V18H28V16H26Z" fill={listView ? '#AFAFAF' : '#363636'}/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="conteiner">

                        {
                            listView ?
                                <ListView />
                                :
                                <BlockView />
                        }
                    
                    </div>
                    
                </main>

                {
                    popUpAddNote && <PopUpNewNote closePopUp={handleCloseAddNote} />
                }
                
            </div>
        
    )
}