import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import Note from '../models/Note.class';
import INote from '../interfaces/INote';

interface notesContextType {
  notes: Note[];
  addingNote: boolean;
  toggleAddingNote: () => void;
  saveNote: (newNote: Note) => void;
  deleteNote: (i: number) => void;
  openNote: (i: number | null) => void;
  openedNote: number | null;
  updateNote: (userInput: INote, i: number) => void;
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

  const [notes, setNotes] = useState<Note[]>(() => {
    const storage = localStorage.getItem('notes');
    const storageNotes = storage ? JSON.parse(storage) : [];
    return storageNotes.map((note: Note) => new Note(note));
  });
  const [openedNote, setOpenedNote] = useState<number | null>(null);
  const [addingNote, setAddingNote] = useState(false);

  useEffect(() => {
      saveNotesToLocalStorage();
  }, [notes]);

  function saveNotesToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  function saveNote(newNote: Note) {
    const currentNotes = [...notes];
    currentNotes.push(newNote);
    setNotes(currentNotes);
  }

  function updateNote(userInput: INote, i: number) {
    const currentNotes = [...notes];
    currentNotes[i].title = userInput.title;
    currentNotes[i].text = userInput.text;
    currentNotes[i].edited = currentNotes[i].getFormattedDate(new Date());
    setNotes(currentNotes);
  }

  function deleteNote(i: number) {
    const currentNotes = [...notes];
    currentNotes.splice(i, 1);
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
