import { useState } from 'react';
import Note from '../models/Note.class';
import styles from '../styles/components/Note.module.scss';
import NoteEditor from './NoteEditor';

interface Props{
  note: Note;
  index: number;
}

export default function RenderNote(props: Props) {

  const { note, index } = props;
  const [isEditing, setIsEditing] = useState(false);

  function toggleIsEditing() {
    console.log('toggle is editing');
    console.log(index);
    setIsEditing((prev) => !prev);
  }

  return (
    <>
      {!isEditing && (
        <div className={ styles['note-container'] } onClick={ toggleIsEditing }>
          <div className={ styles.title }>{ note.title }</div>
          <div className={ styles.text }>{ note.text }</div>
        </div>
      )}
      {isEditing && <NoteEditor type={'edit'} closeNoteEditor={ toggleIsEditing } index={ index } note={ note }/>}
    </>
  );
}
