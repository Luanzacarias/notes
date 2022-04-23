import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
  off,
  remove,
  update
} from 'firebase/database';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

// tipagens e funções relaciodos ao banco de dados
type NoteProps = {
  title: string,
  content: string,
  priority: string,
  date: string,
  isFinished: boolean
}


export async function handleSetNoteDB(uid: string | undefined, note:NoteProps){

  const userRef = ref(db, `users/${uid}/notes`);
  const newUserRef = push(userRef);
  await set(newUserRef,{
    
      title: note.title,
      content: note.content,
      priority: note.priority,
      date: note.date,
      isFinished: note.isFinished
  })
  
}

export async function deleteNote(uid:string | undefined, id: string){
  const noteRef = ref(db, `users/${uid}/notes/${id}`);
  await remove(noteRef);
}

export async function handleFinished(uid:string | undefined, id: string, boolean: boolean){
  const noteRef = ref(db, `users/${uid}/notes/${id}`);
  await update(noteRef, {
    isFinished: boolean
  })
}

export {
  auth,
  db,
  onValue,
  ref, 
  off,
  signOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword
}