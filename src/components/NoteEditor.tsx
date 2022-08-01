import { useEffect, useRef, useState } from 'react';
import { useNotes } from '../context/NotesContext';
import INote from '../interfaces/INote';
import Note from '../models/Note.class';
import styles from '../styles/components/NoteEditor.module.scss';
import ButtonContainer from './ButtonContainer';

interface Props {
  type: 'add' | 'edit';
  closeNoteEditor: () => void;
  index?: number;
  currentNote?: Note;
}

export default function NoteEditor(props: Props) {
  const { closeNoteEditor, type, index, currentNote } = props;
  const title = type === 'add' ? 'Add a new note' : 'Edit your note';
  const confirmAction = type === 'add' ? () => saveToNotes() : () => saveEditedNote();
  const { notes, saveNote, updateNote } = useNotes();
  const textarea = useRef<HTMLTextAreaElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [userInput, setUserInput] = useState<INote>({ title: '', text: '' });

  useEffect(() => {
    if (currentNote) setUserInput(currentNote);
  }, []);

  function getCurrentInput(type: 'title' | 'text', e: any) {
    const inputValue = {
      title: type === 'title' ? e.target.value : userInput.title,
      text: type === 'text' ? e.target.value : userInput.text,
    };
    setUserInput(inputValue);
  }

  function saveToNotes() {
    saveNote(new Note(userInput));
    resetInputFields();
    closeNoteEditor();
  }

  function saveEditedNote() {
    if (index !== undefined) {
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
    setUserInput({ title: '', text: '' });
  }

  return (
    <div className={styles['note-editor']}>
      <h2>{title}</h2>
      <div className={styles['add-note-container']}>
        <div className='input-field'>
          {/* <label htmlFor="title">Title</label> */}
          <input
            ref={input}
            type='text'
            name='title'
            placeholder='Add a title'
            onChange={($event) => getCurrentInput('title', $event)}
            value={userInput.title}
          />
        </div>
        <div className={`input-field ${styles['textarea-field']}`}>
          {/* <label htmlFor="text">Your note</label> */}
          <textarea
            ref={textarea}
            name='note-input'
            id='note-input'
            onChange={($event) => getCurrentInput('text', $event)}
            placeholder='Add your note'
            value={userInput.text}
          ></textarea>
        </div>
        <ButtonContainer userInput={userInput} confirm={confirmAction} cancel={cancel} />
      </div>
    </div>
  );
}
