import React, { useState } from 'react'
import styles from './style.module.css'
import { IoMdAdd } from 'react-icons/all'
import { useSelector } from 'react-redux'
import Addtodo from '../addTodo/addTodo'
import TaskItem from '../taskItem/taskItem'

function TodoList({ title }) {
  const todos = useSelector((state) => state.tasks)
  const [isAdding, setIsAdding] = useState(false)
  const handleAdd = () => {
    setIsAdding(true)
  }
  let filteredTodos
  if (title === 'Today') {
    filteredTodos = todos
  } else if (title === 'Completed') {
    filteredTodos = todos.filter((task) => task.isCompleted === true)
  } else if (title === 'UnCompleted') {
    filteredTodos = todos.filter((task) => task.isCompleted === false)
  } else if (title === 'Important') {
    filteredTodos = todos.filter((task) => task.isImportant === true)
  } else if (title === 'Favorite') {
    filteredTodos = todos.filter((task) => task.isFavorite === true)
  }

  return (
    <div className={styles.todoList}>
      {isAdding ? (
        <Addtodo setIsAdding={setIsAdding} />
      ) : (
        <div>
          <div className={styles.todoListHeader}>
            <div>{title}</div>
            <div onClick={handleAdd}>
              <IoMdAdd className={styles.addIcon} />
            </div>
          </div>
          <div>
            {filteredTodos.map((task) => {
              return <TaskItem task={task} key={task.id} />
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default TodoList
