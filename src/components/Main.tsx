import { useState } from 'react';
import NoteEditor from './NoteEditor';
import Board from './Board';
import styles from '../styles/components/Main.module.scss';
import AddIcon from '../assets/img/Add';
import { useNotes } from '../context/NotesContext';

export default function Main() {
  const { addingNote, toggleAddingNote, openNote } = useNotes()

  function toggleAddNote() {
    toggleAddingNote();
    openNote(null);
  }

  return (
    <div className={styles.main}>
        {addingNote && <NoteEditor type={'add'} closeNoteEditor={toggleAddNote} />}
        <Board />
      {!addingNote && (
        <button className={`btn-round ${styles['add-btn']}`} title='Add a note' onClick={toggleAddNote}>
          <AddIcon />
        </button>
      )}
    </div>
  );
}
