import { useState } from 'react';
import { useNotes } from '../context/NotesContext';
import Note from '../models/Note.class';
import styles from '../styles/components/Note.module.scss';
import NoteEditor from './NoteEditor';

interface Props{
  note: Note;
  index: number;
}

export default function RenderNote(props: Props) {

  const { note, index } = props;
  const { openNote, openedNote, addingNote, toggleAddingNote } = useNotes()

  function openCurrentNote(index: number){
    if(addingNote) toggleAddingNote();
    openNote(index)
  }

  return (
    <>
      {openedNote != index && (
        <div className={ styles['note-container'] } onClick={ () => openCurrentNote(index) }>
          <div className={ styles.title }>{ note.title }</div>
          <div className={ styles.text }>{ note.text }</div>
        </div>
      )}
      {openedNote === index && <NoteEditor type={'edit'} closeNoteEditor={ () => openNote(null) } index={ index } note={ note }/>}
    </>
  );
}
