import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Note from '../models/Note.class';

interface notesContextType {
  notes: Note[];
  addingNote: boolean;
  toggleAddingNote: () => void;
  saveNote: (newNote: Note) => void;
  deleteNote: (i: number) => void;
  openNote: (i: number | null) => void;
  openedNote: number | null;
  updateNote: (currentNote: Note, i: number) => void;
}

const NotesContext = createContext<notesContextType>({
  notes: [],
  addingNote: false,
  toggleAddingNote: () => {},
  saveNote: () => {},
  deleteNote: () => {},
  openNote: () => {},
  openedNote: null,
  updateNote: () => {},
});

export function useNotes() {
  return useContext(NotesContext);
}

export function NotesProvider({ children }: { children: ReactNode }) {
  // how to define the type of ReactNode correctly?

  const [notes, setNotes] = useState<Note[]>([]);
  const [openedNote, setOpenedNote] = useState<number | null>(null);
  const [addingNote, setAddingNote] = useState(false);

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

  function toggleAddingNote() {
    setAddingNote((prev) => !prev);
  }

  function openNote(i: number | null) {
    setOpenedNote(i);
  }

  return (
    <NotesContext.Provider
      value={{ notes, addingNote, toggleAddingNote, saveNote, deleteNote, openNote, openedNote, updateNote }}
    >
      {children}
    </NotesContext.Provider>
  );
}
