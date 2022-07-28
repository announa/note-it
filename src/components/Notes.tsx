import { useNotes } from '../context/NotesContext'
import RenderNote from './RenderNote'

export default function Notes() {
  
  const {notes} = useNotes()

  const renderNotes = notes.map((note, i) => <RenderNote key={'note-' + i} note={ note } />)
  
  return (
    <>{ renderNotes }</>
  )
}
