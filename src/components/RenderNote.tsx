import { useNotes } from '../context/NotesContext';
import Note from '../models/Note.class';
import styles from '../styles/components/Note.module.scss';
import NoteEditor from './NoteEditor';
import ArchiveIcon from '../assets/icons/archive.svg';
import EditIcon from '../assets/icons/edit.svg';
import DeleteIcon from '../assets/icons/delete.svg';
import RestoreIcon from '../assets/icons/arrow-up.svg';
import AddedAtIcon from '../assets/icons/calendar-plus.png';
import EditedAtIcon from '../assets/icons/calendar-edit.png';

interface Props {
  note: Note;
  index: number;
  type: string;
}

export default function RenderNote(props: Props) {
  const { note, index, type } = props;
  const {
    openNote,
    openedNote,
    addingNote,
    moveToArchivedNotes,
    toggleAddingNote,
    deleteNote,
    deleteArchivedNote,
    restoreNote,
  } = useNotes();

  const deleteFn = type === 'Saved' ? deleteNote : deleteArchivedNote;

  function editNote(index: number) {
    if (addingNote) toggleAddingNote();
    openNote(index);
  }

  return (
    <>
      {openedNote !== index && (
        <div className={styles['note-container']}>
          <div className={styles['notes-icons']}>
            {type === 'Saved' && (
              <>
                <button title='edit note' className='icon-btn' onClick={() => editNote(index)}>
                  <img src={EditIcon} alt='' />
                </button>
                <button title='archive note' className='icon-btn' onClick={() => moveToArchivedNotes(index)}>
                  <img src={ArchiveIcon} alt='' />
                </button>
              </>
            )}
            {type === 'Archived' && (
              <button title='archive note' className='icon-btn' onClick={() => restoreNote(index)}>
                <img src={RestoreIcon} alt='' />
              </button>
            )}
            <button title='delete note' className='icon-btn' onClick={() => deleteFn(index)}>
              <img src={DeleteIcon} alt='' />
            </button>
          </div>
          <div className={styles.title}>{note.title}</div>
          {!!note.text && <div className={styles.text}>{note.text}</div>}
          {note.todos.length > 0 && <div className={styles.todos}>{note.todos}</div>}
          <div className={styles.added}>
            <img src={AddedAtIcon} alt='' title='Added at' />
            {note.added.toString()}
          </div>
          {note.edited && (
            <div className={styles.edited}>
              <img src={EditedAtIcon} alt='' title='Edited at' />
              {note.edited.toString()}
            </div>
          )}
        </div>
      )}
      {openedNote === index && (
        <NoteEditor type={'edit'} closeNoteEditor={() => openNote(null)} index={index} currentNote={note} />
      )}
    </>
  );
}
