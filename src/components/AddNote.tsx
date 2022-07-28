import { useRef, useState} from 'react';
import { useNotes } from '../context/NotesContext';
import Note from '../models/Note.class';
import styles from '../styles/components/AddNote.module.scss';
import ButtonContainer from './ButtonContainer';

export default function AddNote({closeAddNote}: {closeAddNote: ()=>void}) {
 
  const {saveNote} = useNotes()
  const textarea = useRef<HTMLTextAreaElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const [userInput, setUserInput] = useState(() => new Note())

  function getCurrentInput(){
    const inputValue = {
      title: input.current ? input.current.value : '',
      text: textarea.current? textarea.current.value : ''
    }
    setUserInput(inputValue)
  }

  function saveToNotes(){
    console.log('saving')
    saveNote(userInput);
    resetInputFields();    
  }

  function cancel(){
    resetInputFields();
    closeAddNote();
  }

  function resetInputFields(){
    if(textarea && textarea.current) textarea.current.value = '';
    if(input && input.current) input.current.value = '';
    getCurrentInput();
  }

  return (
    <div className={styles['add-note-container']}>
      <h2>Add a new note</h2>
      <input ref={input} type="text" placeholder='Add a title' onChange={getCurrentInput} />
      <textarea ref={textarea} name='note-input' id='note-input' rows={10} onChange={getCurrentInput} placeholder='Add your note'></textarea>
      <ButtonContainer note={userInput} confirm={saveToNotes} cancel={cancel}/>
    </div>
  );
}
