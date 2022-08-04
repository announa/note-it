import NoteEditor from './NoteEditor';
import Board from './Board';
import styles from '../styles/components/Main.module.scss';
import AddIcon from '../assets/icons/add.svg';
import AddHoverIcon from '../assets/icons/add_hover.svg';
import { useNotes } from '../context/NotesContext';
import { useState } from 'react';

export default function Main({ type }: { type: 'Saved' | 'Archived' }) {
  const { addingNote, addingTodoList, toggleAddingNote, toggleAddingTodoList, openNote } = useNotes();
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [currentAddType, setcurrentAddType] = useState<'note' | 'todo'>('note');

  function toggleAddMenu() {
    setAddMenuOpen((prev) => !prev);
  }

  function toggleAddNote(type: 'note' | 'todo') {
    setcurrentAddType(type)
    type === 'note' ? toggleAddingNote() : toggleAddingTodoList()
    openNote(null);
    if(addMenuOpen) toggleAddMenu();
  }

  return (
    <div className={styles.main}>
      {(addingNote || addingTodoList) && <NoteEditor type={'add'} closeNoteEditor={() => toggleAddNote(currentAddType)} />}
      <Board type={type} />
      {!addingNote && type === 'Saved' && (
        <div className={styles['add-btn-container']}>
          <button className={`btn-round ${styles['add-btn']}`} title='Add a note' onClick={toggleAddMenu}>
            {/* <AddIcon /> */}
            <img className={styles['add-icon']} src={AddIcon} alt='' />
            <img title='Add a note' className={styles['add-hover-icon']} src={AddHoverIcon} alt='' />
          </button>
          {addMenuOpen && (
            <div className={styles['add-menu']}>
              <button onClick={() => toggleAddNote('note')}>Add a note</button>
              <button onClick={() => toggleAddNote('todo')}>Add a todo list</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
