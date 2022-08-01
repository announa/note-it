import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Note from '../models/Note.class';
import INote from '../interfaces/INote';

interface notesContextType {
  notes: Note[];
  archivedNotes: Note[];
  addingNote: boolean;
  toggleAddingNote: () => void;
  addNote: (newNote: Note) => void;
  deleteNote: (i: number) => void;
  deleteArchivedNote: (i: number) => void;
  moveToArchivedNotes: (i: number) => void;
  openNote: (i: number | null) => void;
  openedNote: number | null;
  restoreNote: (i: number) => void;
  updateNote: (userInput: INote, i: number) => void;
}

const NotesContext = createContext<notesContextType>({
  notes: [],
  archivedNotes: [],
  addingNote: false,
  toggleAddingNote: () => {},
  addNote: () => {},
  deleteNote: () => {},
  deleteArchivedNote: () => {},
  moveToArchivedNotes: () => {},
  openNote: () => {},
  openedNote: null,
  restoreNote: () => {},
  updateNote: () => {},
});

export function useNotes() {
  return useContext(NotesContext);
}

export function NotesProvider({ children }: { children: ReactNode }) {
  // how to define the type of ReactNode correctly?

  const [notes, setNotes] = useState<Note[]>(getFromLocalStorage('notes'));
  const [archivedNotes, setArchivedNotes] = useState<Note[]>(getFromLocalStorage('archivedNotes'));

  const [openedNote, setOpenedNote] = useState<number | null>(null);
  const [addingNote, setAddingNote] = useState(false);

  useEffect(() => {
    saveNotesToLocalStorage('notes');
  }, [notes]);

  useEffect(() => {
    saveNotesToLocalStorage('archivedNotes');
  }, [archivedNotes]);

  function getFromLocalStorage(item: string) {
    const storage = localStorage.getItem(item);
    const storageNotes = storage ? JSON.parse(storage) : [];
    return storageNotes.map((note: Note) => new Note(note));
  }

  function saveNotesToLocalStorage(item: string) {
    localStorage.setItem(item, JSON.stringify(notes));
  }

  function addNote(newNote: Note) {
    const currentNotes = [...notes];
    currentNotes.push(newNote);
    setNotes(currentNotes);
  }

  function moveToArchivedNotes(i: number) {
    console.log(i)
    addArchivedNote(notes[i]);
    deleteNote(i);
  }

  function addArchivedNote(note: Note) {
    const currentNotes = [...archivedNotes];
    currentNotes.push(note);
    setArchivedNotes(currentNotes);
  }

  function restoreNote(i: number){
    addNote(archivedNotes[i]);
    deleteArchivedNote(i)
  }

  function deleteNote(i: number) {
    const currentNotes = [...notes];
    currentNotes.splice(i, 1);
    setNotes(currentNotes);
  }

  function deleteArchivedNote(i: number) {
    const currentNotes = [...archivedNotes];
    currentNotes.splice(i, 1);
    setArchivedNotes(currentNotes);
  }

  function updateNote(userInput: INote, i: number) {
    const currentNotes = [...notes];
    currentNotes[i].title = userInput.title;
    currentNotes[i].text = userInput.text;
    currentNotes[i].edited = currentNotes[i].getFormattedDate(new Date());
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
      value={{
        notes,
        archivedNotes,
        addNote,
        addingNote,
        toggleAddingNote,
        deleteNote,
        deleteArchivedNote,
        moveToArchivedNotes,
        openNote,
        openedNote,
        restoreNote,
        updateNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
