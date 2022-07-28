import { useState } from 'react';
import NoteEditor from './NoteEditor';
import Board from './Board';
import styles from '../styles/components/Main.module.scss';
import AddIcon from '../assets/img/Add';
import { NotesProvider } from '../context/NotesContext';

export default function Main() {
  const [adding, setAdding] = useState(false);

  function toggleAddNote() {
    setAdding((prev) => !prev);
  }

  return (
    <div className={styles.main}>
      <NotesProvider>
        {adding && <NoteEditor type={'add'} closeNoteEditor={toggleAddNote} />}
        <Board />
      </NotesProvider>
      {!adding && (
        <button className={`btn-round ${styles['add-btn']}`} title='Add a note' onClick={toggleAddNote}>
          <AddIcon />
        </button>
      )}
    </div>
  );
}
