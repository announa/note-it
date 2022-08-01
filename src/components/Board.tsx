import Notes from './Notes'
import styles from '../styles/components/Board.module.scss'

export default function Board() {

  return (
    <div className={styles.board}>
      <h1>Saved notes</h1>
      <div className={styles['notes-container']}>
      <Notes />
      </div>
    </div>
  )
}
