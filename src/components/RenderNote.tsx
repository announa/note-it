import Note from '../models/Note.class';
import styles from '../styles/components/Note.module.scss';

export default function RenderNote({ note }: {note: Note}) {
  return (
    <div className={styles['note-container']}>
      <div className={styles.title}>{note.title}</div>
      <div className={styles.text}>{note.text}</div>
    </div>
  );
}
