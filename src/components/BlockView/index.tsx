import { useGetNote } from '../../Hooks/useGetNote';
import { EmptyNotes } from '../EmptyNotes';
import { Loading } from '../Loading';
import { Note } from '../Note';

import './styles.scss';

export function BlockView(){
    
    const { notesHigh, notesMedium, notesLow, loading } = useGetNote();
    
    return(
        <>  
            {
                loading  ? 
                
                    <Loading />

                :
                <>
                    {
                    (notesHigh.length + 
                        notesMedium.length + 
                            notesLow.length) > 0 
                    ?
                    <div id="block-view">
                        <div className="notes-box border">
                            <h3 className='high'>Urgente</h3>
                            {
                                notesHigh.map((note) => {
                                    return (
                                        note.isFinished ?
                                        <></> 
                                        :
                                        <Note
                                        key={note.id}
                                        id={note.id}
                                        title={note.title}
                                        content={note.content}
                                        date={note.date}
                                        priority={note.priority}
                                        isFinished={note.isFinished}
                                    />
                                    
                                    )
                                    
                                })
                            }
                            {
                                notesHigh.map((note) => {
                                    return (
                                        note.isFinished ?
                                        <Note
                                        key={note.id}
                                        id={note.id}
                                        title={note.title}
                                        content={note.content}
                                        date={note.date}
                                        priority={note.priority}
                                        isFinished={note.isFinished}
                                        />
                                        :
                                        
                                    <></> 
                                    )
                                    
                                })
                            }
                        </div>
                        <div className="notes-box border">
                            <h3 className='medium'>Prazo curto</h3>
                            {
                                notesMedium.map((note) => {
                                    return (
                                        note.isFinished ?
                                        <></> 
                                        :
                                        <Note
                                        key={note.id}
                                        id={note.id}
                                        title={note.title}
                                        content={note.content}
                                        date={note.date}
                                        priority={note.priority}
                                        isFinished={note.isFinished}
                                        />
                                    )
                                    
                                })
                            }
                            {
                                notesMedium.map((note) => {
                                    return (
                                        note.isFinished ?
                                        <Note
                                            key={note.id}
                                            id={note.id}
                                            title={note.title}
                                            content={note.content}
                                            date={note.date}
                                            priority={note.priority}
                                            isFinished={note.isFinished}
                                        />
                                        :
                                        <></>
                                    )
                                    
                                })
                            }
                        </div>
                        <div className="notes-box">
                            <h3 className='low'>Sem pressa</h3>
                            {
                                notesLow.map((note) => {
                                    return (
                                        note.isFinished ?
                                        <></>
                                        :
                                        <Note
                                            key={note.id}
                                            id={note.id}
                                            title={note.title}
                                            content={note.content}
                                            date={note.date}
                                            priority={note.priority}
                                            isFinished={note.isFinished}
                                        />
                                    )
                                    
                                })
                            }
                            {
                                notesLow.map((note) => {
                                    return (
                                        note.isFinished ?
                                        <Note
                                            key={note.id}
                                            id={note.id}
                                            title={note.title}
                                            content={note.content}
                                            date={note.date}
                                            priority={note.priority}
                                            isFinished={note.isFinished}
                                        />
                                        :
                                        <></>
                                    )
                                    
                                })
                            }
                        </div>
                    </div>
                    :
                    <EmptyNotes />
                }
                </>
            }
            
        </>
    )
}