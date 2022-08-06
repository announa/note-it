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
import TodoList from './TodoList';

interface Props {
  note: Note;
  index: number;
  type: string;
}

export default function RenderNote(props: Props) {
  const { note, index, type } = props;
  const {
    notes,
    openNote,
    openedNote,
    addingNote,
    moveToArchivedNotes,
    toggleAddingNote,
    deleteNote,
    deleteArchivedNote,
    restoreNote,
    updateNote,
    updateTodos
  } = useNotes();

  const deleteFn = type === 'Saved' ? deleteNote : deleteArchivedNote;

  function editNote(index: number) {
    if (addingNote) toggleAddingNote();
    openNote(index);
  }

  function toggleTodo(i: number) {
    const currentNotes = [...notes];
    currentNotes[index].todos[i].done = !currentNotes[index].todos[i].done;
    updateTodos(currentNotes[index].todos, i);
  }

  function deleteTodo(i: number){
    const currentTodos = [...notes[index].todos];
    currentTodos.splice(i, 1)
    updateTodos(currentTodos, index)
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
          {!!note.todos && note.todos.length > 0 && (
            <div className={styles.todos}>
              <TodoList todos={note.todos} index={index} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
            </div>
          )}
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
