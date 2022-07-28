import React from 'react'
import Notes from './Notes'
import styles from '../styles/components/Board.module.scss'

export default function Board() {
  return (
    <div className={styles.board}>
      <h2>Saved notes</h2>
      <div className={styles['notes-container']}>
      <Notes />
      </div>
    </div>
  )
}
