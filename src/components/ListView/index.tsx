import { useGetNote } from "../../Hooks/useGetNote"
import { EmptyNotes } from "../EmptyNotes"
import { Loading } from "../Loading";
import { Note } from "../Note"

import './styles.scss';

export function ListView(){
    const { notesHigh, notesMedium, notesLow, loading } = useGetNote();

    return (
        <>
            {
                loading ? 
                    <Loading />
                :
                <>
                    {
                        (notesHigh.length + 
                            notesMedium.length + 
                                notesLow.length) > 0 
                        ?
                        <div id="list-view">
                            <div className="legenda">
                                <div className="box">
                                    <div className="circle high"/>
                                    <p>Urgente</p>
                                </div>
                                <div className="box">
                                    <div className="circle medium"/>
                                    <p>Prazo curto</p>
                                </div>
                                <div className="box">
                                    <div className="circle low"/>
                                    <p>Sem pressa</p>
                                </div>
                            </div>
                            <div className="notes">
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