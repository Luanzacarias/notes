import { useEffect, useState } from "react";
import { db, off, onValue, ref } from "../services/firebase";
import { useAuth } from "./useAuth";

type firebaseNotes = Record<string, {
    title: string;
    content: string;
    priority: string;
    date: string;
    isFinished: boolean;
  }>
  type NoteProps= {
    id: string,
    title: string,
    content: string,
    priority: string,
    date: string,
    isFinished: boolean
  
  }

export function useGetNote(){

    const { user } = useAuth();
    const [notes, setNotes] = useState<NoteProps[]>([]);
    const [loading, setLoading] = useState<Boolean>(true); 
    // .reverse pra inverter o array e oq for mais novo ficar no topo
    const notesHigh = notes.filter((note) => note.priority === 'high').reverse();
    const notesMedium = notes.filter((note) => note.priority === 'medium').reverse();
    const notesLow = notes.filter((note) => note.priority === 'low').reverse();


    useEffect(() => {
      
        setLoading(true);
        const userRef = ref(db, `users/${user?.uid}`);
        
        onValue(userRef, (user) => {
            if(user.val() == null || user.exists() === false) {
              setNotes([])
              setLoading(false);
              return
            }
            const userNotes = user.val();
            // pegando o valor de das perguntas se tiver.
            const firebaseNotes: firebaseNotes = userNotes.notes ?? {};
            const parsedNotes = Object.entries(firebaseNotes).map(([key, value]) => {
              
              return {
                id: key,
                title: value.title,
                content: value.content,
                priority: value.priority,
                date: value.date,
                isFinished: value.isFinished
        
              }
            })
            setNotes(parsedNotes);
            setLoading(false);
        })
        
        return () => {
            off(userRef, 'value')
        }
    },[user?.uid])
    
    return {notesHigh, notesMedium, notesLow, loading, setLoading}

}