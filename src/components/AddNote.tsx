import { useRef} from 'react';
import { useNotes } from '../context/NotesContext';
import styles from '../styles/components/AddNote.module.scss';

export default function AddNote({closeAddNote}: {closeAddNote: ()=>void}) {
 
  const {saveNote} = useNotes()
  const input = useRef<HTMLTextAreaElement>(null)

  function saveToNotes(){
    if(input.current){
      console.log(input)
    const content = input.current.value;
    console.log(content)
    saveNote(content);
    }
  }

  function cancel(closeAddNote: ()=>void){
    if(input && input.current) input.current.value = ''
    closeAddNote();
  }

  return (
    <div className={styles['add-note-container']}>
      <h2>Add a new note</h2>
      <textarea ref={input} name='note-input' id='note-input' rows={10}></textarea>
      <button className='btn-secondary' onClick={() => cancel(closeAddNote)}>Cancel</button>
      <button disabled={input.current?.value === ''} onClick={saveToNotes}>Save note</button>
    </div>
  );
}
