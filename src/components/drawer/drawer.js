import React from 'react'
import { NavLink, Router } from 'react-router-dom'
import styles from './style.module.css'
import * as Routes from '../routepaths'
import { useLocation } from 'react-router-dom'
import {
  IoTodayOutline,
  BiStar,
  MdFavoriteBorder,
  MdDoneAll,
  TiDelete,
  BiUser,
} from 'react-icons/all'

function Drawer() {
  const name = localStorage.getItem('name')
  const location = useLocation()
  return (
    <div className={styles.drawer}>
      <div className={styles.drawerHeader}>
        <div>
          <div className={styles.userInfo}>
            {' '}
            <BiUser className={styles.headerIcon} />
            <div>Hi, {name}</div>
          </div>{' '}
        </div>
      </div>
      <div className={styles.drawerItem}>
        <NavLink
          activeStyle={{
            backgroundColor: '#1b1a21',
            color: '#f6f4fe',
          }}
          className={styles.navLink}
          to={Routes.mainMenu}
        >
          <div
            className={
              location.pathname === Routes.mainMenu
                ? styles.activeIconDiv
                : styles.passiveIconDiv
            }
          >
            {' '}
            <IoTodayOutline className={styles.drawerIcons} />
          </div>
          <div>Today</div>
        </NavLink>
      </div>
      <div className={styles.drawerItem}>
        <NavLink
          activeStyle={{
            backgroundColor: '#1b1a21',
            color: '#f6f4fe',
          }}
          className={styles.navLink}
          to={Routes.important}
        >
          <div
            className={
              location.pathname === Routes.important
                ? styles.activeIconDiv
                : styles.passiveIconDiv
            }
          >
            <BiStar className={styles.drawerIcons} />
          </div>
          <div>Important</div>
        </NavLink>
      </div>
      <div className={styles.drawerItem}>
        <NavLink
          activeStyle={{
            backgroundColor: '#1b1a21',
            color: '#f6f4fe',
          }}
          className={styles.navLink}
          to={Routes.favorite}
        >
          <div
            className={
              location.pathname === Routes.favorite
                ? styles.activeIconDiv
                : styles.passiveIconDiv
            }
          >
            {' '}
            <MdFavoriteBorder className={styles.drawerIcons} />{' '}
          </div>
          <div>Favorite</div>
        </NavLink>
      </div>
      <div className={styles.drawerItem}>
        <NavLink
          activeStyle={{
            backgroundColor: '#1b1a21',
            color: '#f6f4fe',
          }}
          className={styles.navLink}
          to={Routes.noCompleted}
        >
          <div
            className={
              location.pathname === Routes.noCompleted
                ? styles.activeIconDiv
                : styles.passiveIconDiv
            }
          >
            {' '}
            <TiDelete className={styles.drawerIcons} />
          </div>
          <div>UnCompleted</div>
        </NavLink>
      </div>
      <div className={styles.drawerItem}>
        <NavLink
          activeStyle={{
            backgroundColor: '#1b1a21',
            color: '#f6f4fe',
          }}
          className={styles.navLink}
          to={Routes.completed}
        >
          <div
            className={
              location.pathname === Routes.completed
                ? styles.activeIconDiv
                : styles.passiveIconDiv
            }
          >
            {' '}
            <MdDoneAll className={styles.drawerIcons} />
          </div>
          <div>Completed</div>
        </NavLink>
      </div>
    </div>
  )
}

export default Drawer
