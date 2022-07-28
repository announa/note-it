import {useState} from 'react'
import AddNote from './AddNote'
import styles from '../styles/components/Main.module.scss'

export default function Main() {

  const [adding, setAdding] = useState(false)

  function toggleAddNote(){
   setAdding((prev) => !prev)
  }

  return (
    <div className={styles.main}>
     {adding && <AddNote closeAddNote={toggleAddNote}/>}
     {!adding && <button onClick={toggleAddNote}>Add note</button>}
    </div>
  )
}
