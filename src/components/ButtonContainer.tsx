import Note from '../models/Note.class';
import styles from '../styles/components/ButtonContainer.module.scss'

interface Props{
 note: Note;
 confirm: ()=>void;
 cancel: ()=>void;
}

export default function ButtonContainer(props: Props) {

 const note = props.note;
 const confirm = props.confirm;
 const cancel = props.cancel;

  return (
    <div className={styles['btn-container']}>
      <button className='btn-secondary' onClick={cancel}>
        Cancel
      </button>
      <button disabled={note.text===''} onClick={confirm}>
        Save note
      </button>
      </div>
  );
}
