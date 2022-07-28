import {createContext, ReactNode, useContext, useState, useEffect} from 'react'
import Note from '../models/Note.class';

interface notesContextType{
  notes: Note[],
  saveNote: (newNote: Note)=>void;
  deleteNote: (i: number)=>void;
}

const NotesContext = createContext<notesContextType>({notes: [], saveNote: () => {}, deleteNote: ()=>{}})

export function useNotes(){
  return useContext(NotesContext)
}

export function NotesProvider({children}: {children: ReactNode}) {  // how to define the type of ReactNode correctly?

 const[notes, setNotes] = useState<Note[]>([])

 useEffect(() => {
  console.log(notes)
 }, [notes])

 function saveNote(newNote: Note){
  console.log(newNote)
  const currentNotes = [...notes]
  currentNotes.push(newNote)
  setNotes(currentNotes)
 }

 function deleteNote(i: number){
  const currentNotes = [...notes]
  currentNotes.splice(i, 0)
  setNotes(currentNotes)
 }

  return (
   <NotesContext.Provider value={{notes, saveNote, deleteNote}}>
    {children}
   </NotesContext.Provider>
  )
}
