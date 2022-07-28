import { useEffect, useRef, useState } from 'react';
import { useNotes } from '../context/NotesContext';
import Note from '../models/Note.class';
import styles from '../styles/components/AddNote.module.scss';
import ButtonContainer from './ButtonContainer';

interface Props {
  type: 'add' | 'edit';
  closeNoteEditor: () => void;
  index?: number;
  note?: Note;
}

export default function NoteEditor(props: Props) {
  const { closeNoteEditor, type, index, note } = props;
  const title = type === 'add' ? 'Add a new note' : 'Edit your note';
  const confirmAction = type === 'add' ? () => saveToNotes() : () => saveEditedNote();
  const { notes, saveNote, updateNote } = useNotes();
  const textarea = useRef<HTMLTextAreaElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [userInput, setUserInput] = useState(() => new Note());

  useEffect(() => {
    const inputValue = {
      title: note ? note.title : '',
      text: note ? note.text : '',
    };
    setUserInput(inputValue)
  }, [])

  useEffect(() => {
    saveNotesToLocalStorage();
  }, [notes]);

  function getCurrentInput(type: 'title' | 'text', e: any) {
    const inputValue = {
      title: type === 'title' ? e.target.value : userInput.title,
      text: type === 'text' ? e.target.value : userInput.text,
    };
    setUserInput(inputValue);
  }

  function saveToNotes() {
    saveNote(userInput);
    resetInputFields();
    closeNoteEditor()
  }

  function saveEditedNote() {
    if (index != undefined) {
      updateNote(userInput, index);
      resetInputFields();
      closeNoteEditor();
    }
  }

  function cancel() {
    resetInputFields();
    closeNoteEditor();
  }

  function resetInputFields() {
    setUserInput({title: '', text: ''})
  }

  function saveNotesToLocalStorage() {
    console.log('save to local storage');
    console.log(notes);
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  return (
    <div className={styles['add-note-container']}>
      <h2>{title}</h2>
      <input
        ref={input}
        type='text'
        placeholder='Add a title'
        onChange={($event) => getCurrentInput('title', $event)}
        value={userInput.title}
      />
      <textarea
        ref={textarea}
        name='note-input'
        id='note-input'
        rows={10}
        onChange={($event) => getCurrentInput('text', $event)}
        placeholder='Add your note'
        value={userInput.text}
      ></textarea>
      <ButtonContainer note={userInput} confirm={confirmAction} cancel={cancel} />
    </div>
  );
}
