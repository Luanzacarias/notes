import { useState } from 'react';
import { useAuth } from '../../Hooks/useAuth';
import { deleteNote, handleFinished } from '../../services/firebase';
import { PopUpDeleteAndEnd } from '../PopUpDeletAndEnd';

import { FiX } from 'react-icons/fi';
import { HiCheck } from 'react-icons/hi';

import './styles.scss';

type NoteProps = {
    id: string,
    title: string;
    content: string;
    priority: string;
    date: string;
    isFinished: boolean;
}

export function Note(note : NoteProps){

    const [popUp, setPopUp] = useState(false);
    const [check, setCheck] = useState(note.isFinished);
    const { user } = useAuth();

    function handleOpenPopUp(){
        setPopUp(true);
    }
    function handleClosePopUp(){
        setPopUp(false);
    }
    function handleDeleteNote(){
        deleteNote(user?.uid, note.id);
        handleClosePopUp();
    }
    function handleCheck(){
        
        handleFinished(user?.uid, note.id, !check);
        setCheck(!check);   
            
    }

    return(
        <div id="note" className={note.isFinished ? `backFinished${note.priority}` : `${note.priority}` }>
            
            <div 
                className='checkbox'
                onClick={handleCheck}    
            >
                {
                    note.isFinished ? 
                        <HiCheck size={18} color='#EFEFEF' />
                        :
                        <div className="size" />
                }
                
            </div>
            
            <div className={`content ${note.isFinished ? 'finished' : ''}`}>
                <div className="title">
                    <h3>{note.title}</h3>
                    <h4>{note.date}</h4>
                </div>
                
                <p>{note.content}</p>
            </div>
            <button onClick={handleOpenPopUp}>
                <FiX size={14} color='#E5E5E5' strokeWidth={3} />
            </button> 
            {
                popUp &&
                    <PopUpDeleteAndEnd 
                        closePopUp={handleClosePopUp}
                        action={handleDeleteNote}
                        note
                        priority={note.priority}
                    />
            }
        </div>
    )
}