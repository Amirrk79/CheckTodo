import React from 'react'
import styles from './style.module.css'
import Drawer from '../drawer/drawer'
import Date1 from '../date/date'

function LayOut({ children }) {
  return (
    <div className={styles.layOut}>
      <div className={styles.drawerDiv}>
        <Drawer />
      </div>

      <div className={styles.layOutDiv}>
        <div className={styles.dateDiv}>
          <Date1 />
        </div>
        <div className={styles.layOutMain}>
          <div className={styles.todoBox}>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default LayOut
