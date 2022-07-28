import {useState} from 'react'
import AddNote from './AddNote'
import Board from './Board'
import styles from '../styles/components/Main.module.scss'
import AddIcon from '../assets/img/Add'

export default function Main() {

  const [adding, setAdding] = useState(false)

  function toggleAddNote(){
   setAdding((prev) => !prev)
  }

  return (
    <div className={styles.main}>
     {adding && <AddNote closeAddNote={toggleAddNote}/>}
     {!adding && <button className={`btn-round ${styles['add-btn']}`} title='Add a note' onClick={toggleAddNote}><AddIcon /></button>}
     <Board />
    </div>
  )
}
