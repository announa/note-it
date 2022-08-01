import { useNotes } from '../context/NotesContext';
import Note from '../models/Note.class';
import styles from '../styles/components/Note.module.scss';
import NoteEditor from './NoteEditor';
import EditIcon from '../assets/icons/edit.svg';
import DeleteIcon from '../assets/icons/delete.svg';
import RestoreIcon from '../assets/icons/arrow-up.svg';
import { eventNames } from 'process';

interface Props {
  note: Note;
  index: number;
}

export default function RenderNote(props: Props) {
  const { note, index } = props;
  const { openNote, openedNote, addingNote, toggleAddingNote, deleteNote } = useNotes();

  function openCurrentNote(index: number) {
    if (addingNote) toggleAddingNote();
    openNote(index);
  }

  return (
    <>
      {openedNote !== index && (
        <div className={styles['note-container']}>
          <div className={styles['notes-icons']}>
            <button className='icon-btn' onClick={()=> openCurrentNote(index)}>
              <img src={EditIcon} alt='' />
            </button>
            <button className='icon-btn' onClick={()=> deleteNote(index)}>
              <img src={DeleteIcon} alt='' />
            </button>
          </div>
          <div className={styles.title}>{note.title}</div>
          <div className={styles.text}>{note.text}</div>
          <div className={styles.added}>Added at: {note.added.toString()}</div>
          {note.edited && <div className={styles.edited}>Edited at: {note.edited.toString()}</div>}
        </div>
      )}
      {openedNote === index && (
        <NoteEditor type={'edit'} closeNoteEditor={() => openNote(null)} index={index} currentNote={note} />
      )}
    </>
  );
}
