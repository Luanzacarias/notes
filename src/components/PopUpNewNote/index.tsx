import { FormEvent, useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useAuth } from '../../Hooks/useAuth';
import { handleSetNoteDB } from '../../services/firebase';

import './styles.scss';

type PopUpProps = {
    closePopUp: () => void;
}

export function PopUpNewNote(props: PopUpProps){

    const {user} = useAuth();

    const [title, setTitle] = useState('')
    const [classNameTitle, setClassNameTitle] = useState('');
    const [content, setContent] = useState('');
    const [classNameContent, setClassNameContent] = useState('');
    
    const [date, setDate] = useState('');
    const [classNameDate, setClassNameDate] = useState('');
    let dateToday = new Date();
    let day  = dateToday.getDate().toString().padStart(2, '0');
    let month  = (dateToday.getMonth()+1).toString().padStart(2, '0');
    let year  = dateToday.getFullYear();
    const today = `${year}-${month}-${day}`;

    const [buttonHigh, setButtonHigh] = useState(false);
    const [buttonMedium, setButtonMedium] = useState(false);
    const [buttonLow, setButtonLow] = useState(false);
    const [priority, setPriority] = useState('');

    const [valid, setValid] = useState(false);

    useEffect(() => {
        handleValid();
    })

    function handleSetTitle(title: string){
        if (title.trim() !== ''){
            setClassNameTitle('valid');
        }else {
            setClassNameTitle('invalid')
        }
        setTitle(title);
    }
    function handleSetContent(content: string){
        if (content.trim() !== ''){
            setClassNameContent('valid')
        } else {
            setClassNameContent('invalid')
        }
        setContent(content);
    }
    function handleSetPriority(button: string){
        switch (button) {
            case 'high':
                setButtonHigh(true);
                setButtonMedium(false);
                setButtonLow(false);
                setPriority('high');
                break;
            
            case 'medium':
                setButtonHigh(false);
                setButtonMedium(true);
                setButtonLow(false);
                setPriority('medium');
                break

            case 'low':
                setButtonHigh(false);
                setButtonMedium(false);
                setButtonLow(true);
                setPriority('low');
                break

            default:
                setButtonHigh(false);
                setButtonMedium(false);
                setButtonLow(false);
                setPriority('');
                break;
        }
    }
    function handleSetDate(date: string){
        if (date.trim() === ''){
            setClassNameDate('invalid');
        }else {
            setClassNameDate('valid');
        }
        
        setDate(date);

    }
    function handleValid(){
        if(title.trim() === '' || 
            content.trim() === '' || 
                date.trim() === '' ){
            setValid(false);
            return;
        }
        if(buttonHigh === false && 
            buttonMedium === false && 
                buttonLow === false){
            setValid(false);
            return;
        }

        setValid(true);
    }
    function handleFormatDate(date: string){
        let year = date.split('-')[0];
        let month = date.split('-')[1];
        let day = date.split('-')[2];

        return `${day}/${month}/${year}`
    }
    
    function handleSubmit(event: FormEvent){
        event.preventDefault();

        if(priority.trim() === '') {
            alert("Nível de prioridade não indicado.")
            return
        }

        const dateFormated = handleFormatDate(date);

        const note = {
            title: title,
            content: content,
            priority: priority,
            date: dateFormated,
            // eniando false para não ser marcada como concluída de início
            isFinished: false
        }
        handleSetNoteDB(user?.uid ,note);
        // após enviar pro db, fecha o popUp
        props.closePopUp();
    }

    return(
        <div id="popUpNewNote">
            <div className="body">
                <button className="closePopUp" onClick={props.closePopUp} >
                    <FiX size={24} color="#AFAFAF" />  
                </button>
                
                <form onSubmit={(event) => handleSubmit(event)}>

                    <h1>Adicione uma nota</h1>

                    <p>Título</p>
                    <input 
                        type="text" 
                        className={classNameTitle} 
                        placeholder='Ex: Trabalho...'
                        value={title}
                        onChange={(event) => handleSetTitle(event.target.value)}   
                        
                    />
                    
                    <p>Conteúdo</p>
                    <textarea 
                    className={classNameContent}
                        placeholder='Ex: Organizar todos os arquivos do setor X em ordem cronológica.'
                        value={content}
                        onChange={(event) => handleSetContent(event.target.value)}
                    />

                    <p>Data do prazo</p>
                    <input 
                        className={`date ${classNameDate}`}
                        type="date" 
                        min={today}
                        value={date}
                        onChange={(event) => handleSetDate(event.target.value)}
                    />
                   
                    <p>Nível de urgência</p>
                    <div className="buttons" >
                        <div 
                            className={`button high ${buttonHigh ? '' : 'disabled'}`}
                            onClick={() => handleSetPriority('high')}
                        >Urgente</div>
                        <div
                            className={`button medium ${buttonMedium ? '' : 'disabled'}`}
                            onClick={() => handleSetPriority('medium')}
                        >Prazo curto</div>
                        <div 
                            className={`button low ${buttonLow ? '' : 'disabled'}`}
                            onClick={() => handleSetPriority('low')}
                        >Sem pressa</div>
                    </div>

                    <button disabled={!valid} className="submit">ADICIONAR</button>
                </form>
            </div>
        </div>
    )
}