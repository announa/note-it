import NoteEditor from './NoteEditor';
import Board from './Board';
import styles from '../styles/components/Main.module.scss';
import AddIcon from '../assets/icons/add.svg';
import AddHoverIcon from '../assets/icons/add_hover.svg';
import { useNotes } from '../context/NotesContext';

export default function Main({type}: {type: string}) {
  const { addingNote, toggleAddingNote, openNote } = useNotes()

  function toggleAddNote() {
    toggleAddingNote();
    openNote(null);
  }

  return (
    <div className={styles.main}>
        {addingNote && <NoteEditor type={'add'} closeNoteEditor={toggleAddNote} />}
        <Board type={type}/>
      {!addingNote && type === 'Saved' && (
        <div className={styles['add-btn-container']}>
        <button className={`btn-round ${styles['add-btn']}`} title='Add a note' onClick={toggleAddNote}>
          {/* <AddIcon /> */}
          <img className={styles['add-icon']} src={AddIcon} alt="" />
          <img title='Add a note' className={styles['add-hover-icon']} src={AddHoverIcon} alt="" />
        </button>
        <div className={styles['add-menu']}>
          <button>Add a note</button>
          <button>Add a todo list</button>
        </div>
        </div>
      )}
    </div>
  );
}
