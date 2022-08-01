import Notes from './Notes'
import styles from '../styles/components/Board.module.scss'

export default function Board({type}: {type: string}) {

  return (
    <div className={styles.board}>
      <h1>{type} notes</h1>
      <div className={styles['notes-container']}>
      <Notes type={type}/>
      </div>
    </div>
  )
}
