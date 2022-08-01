import { useNotes } from '../context/NotesContext';
import RenderNote from './RenderNote';

export default function Notes({type}: {type: string}) {
  const { notes, archivedNotes } = useNotes();
  const currentNotes = type === 'Saved' ? notes : archivedNotes;

  const renderNotes = currentNotes.map((note, i) => (
    <RenderNote
      key={'note-' + i}
      note={note}
      index={i}
      type={type}
    />
  ));

  return <>{renderNotes}</>;
}
