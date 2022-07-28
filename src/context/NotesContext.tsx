import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Note from '../models/Note.class';

interface notesContextType {
  notes: Note[];
  saveNote: (newNote: Note) => void;
  deleteNote: (i: number) => void;
  updateNote: (currentNote: Note, i: number) => void;
}

const NotesContext = createContext<notesContextType>({
  notes: [],
  saveNote: () => {},
  deleteNote: () => {},
  updateNote: () => {},
});

export function useNotes() {
  return useContext(NotesContext);
}

export function NotesProvider({ children }: { children: ReactNode }) {
  // how to define the type of ReactNode correctly?

  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const storage = localStorage.getItem('notes');
    const storageNotes = storage ? JSON.parse(storage) : [];
    setNotes(storageNotes);
  }, []);

  function saveNote(newNote: Note) {
    const currentNotes = [...notes];
    currentNotes.push(newNote);
    setNotes(currentNotes);
  }

  function updateNote(currentNote: Note, i: number) {
    const currentNotes = [...notes];
    currentNotes[i] = currentNote;
    setNotes(currentNotes);
  }

  function deleteNote(i: number) {
    const currentNotes = [...notes];
    currentNotes.splice(i, 0);
    setNotes(currentNotes);
  }

  return <NotesContext.Provider value={{ notes, saveNote, deleteNote, updateNote }}>{children}</NotesContext.Provider>;
}
