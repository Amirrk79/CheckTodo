import React, { useState, useEffect } from 'react'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/all'
import styles from './style.module.css'
import deleteTask from '../../Redux/actions/deleteTaskAction'
import updateTask from '../../Redux/actions/updateTaskAction'
import { useDispatch } from 'react-redux'
import toggleCompleted from '../../Redux/actions/toggleCompletedAction'

const electron = window.require('electron')
const remote = electron.remote
const { Notification } = remote

function TaskItem({ task }) {
  const dispatch = useDispatch()
  const [onEditing, setOnEditing] = useState(false)
  const [favoriteValue, setFavoriteValue] = useState(false)
  const [importantValue, setImportantValue] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [formData, setFormData] = useState({
    name: task.name,
    description: task.description,
    tag: task.tag,
    id: task.id,
    hour: task.hour,
    minute: task.minute,
    isCompleted: task.isCompleted,
    isImportant: task.isImportant,
    isFavorite: task.isFavorite,
    year: task.year,
    month: task.month,
    day: task.day,
  })
  const [formErrors, setFormErrors] = useState({
    nameError: '',
    tagError: '',
    timeError: '',
  })
  //notif
  function showNotification() {
    const notification = {
      title: `Your task time has come, Do it now(${task.name}).`,
      body: 'When you complete a task, you can set it as a completed task.',
      timeoutType: 'never',
    }

    new Notification(notification).show()
  }

  //end of notif
  //useEffect
  useEffect(() => {
    setImportantValue(task.isImportant)
    setFavoriteValue(task.isFavorite)
    setIsCompleted(task.isCompleted)
  }, [])
  //end of useEffect
  //states
  const [toggleTask, setToggleTask] = useState(false)
  //end of states
  //handlers
  const handleToggleTask = () => {
    setToggleTask(!toggleTask)
  }
  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id))
  }
  const handleEdit = () => {
    setOnEditing(!onEditing)
  }
  const handleDiscard = () => {
    setOnEditing(!onEditing)
    setFormData({
      name: task.name,
      description: task.description,
      tag: task.tag,
      id: task.id,
      hour: task.hour,
      minute: task.minute,
      isCompleted: task.isCompleted,
      isImportant: task.isImportant,
      isFavorite: task.isFavorite,
    })
  }
  const handleSaveTodo = () => {
    if (!formData.name) {
      setFormErrors({
        ...formErrors,
        nameError: 'please enter your task name.',
      })
    } else if (!formData.tag) {
      setFormErrors({
        ...formErrors,
        tagError: 'please enter a tag for your task.',
      })
    } else if (!formData.hour || !formData.minute) {
      setFormErrors({ ...formErrors, timeError: 'please set your task time.' })
    } else {
      dispatch(updateTask(formData))
      setOnEditing(!onEditing)
    }
  }
  const handleChangeInputs = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setFormErrors({
      nameError: '',
      tagError: '',
      timeError: '',
    })
  }
  const handleHour = (e) => {
    let value = e.target.value
    if (isNaN(value)) {
      return
    } else if (value > 23) {
      return
    } else {
      setFormData({ ...formData, hour: value })
      setFormErrors({
        nameError: '',
        tagError: '',
        timeError: '',
      })
    }
  }
  const handleMinute = (e) => {
    let value = e.target.value
    if (isNaN(value)) {
      return
    } else if (value > 59) {
      return
    } else {
      setFormData({ ...formData, minute: value })
      setFormErrors({
        nameError: '',
        tagError: '',
        timeError: '',
      })
    }
  }
  const handleImportantSelect = (e) => {
    let boolean = JSON.parse(e.target.value)
    setFormData({ ...formData, isImportant: boolean })
  }
  const handleFavoriteSelect = (e) => {
    let boolean = JSON.parse(e.target.value)
    setFormData({ ...formData, isFavorite: boolean })
  }
  const handleToggleCompleted = () => {
    dispatch(toggleCompleted(task.id))
    setIsCompleted(!isCompleted)
  }

  //end of handlers
  //calculate time of todos for notifications
  let time = new Date()
  let minute = time.getMinutes()
  let hour = time.getHours()
  let nowMinutes = hour * 60 + minute
  let todoTimeMinutes = task.hour * 60 + parseInt(task.minute)
  let setTimeOutMinutes = (todoTimeMinutes - nowMinutes) * 60 * 1000

  setTimeout(function () {
    if (setTimeOutMinutes < 0) {
      return
    } else if (
      time.getFullYear() !== task.year ||
      time.getMonth() !== task.month ||
      time.getDate() !== task.day
    ) {
      return
    } else {
      showNotification()
      return
    }
  }, setTimeOutMinutes)

  //end of calculate
  return (
    <div>
      {onEditing ? (
        <div>
          <div className={styles.editTodoDiv}>
            <div className={styles.headerInputs}>
              <div className={styles.inputHeaderDiv}>
                <label className={styles.addLabels}>Task Name:*</label>
                <input
                  onChange={handleChangeInputs}
                  name='name'
                  maxLength='24'
                  value={formData.name}
                  className={styles.addInput}
                />
                <div className={styles.errors}>{formErrors.nameError}</div>
              </div>
              <div className={styles.inputHeaderDiv}>
                <label className={styles.addLabels}>Task tag:*</label>
                <input
                  onChange={handleChangeInputs}
                  name='tag'
                  maxLength='24'
                  value={formData.tag}
                  className={styles.addInput}
                />
                <div className={styles.errors}>{formErrors.tagError}</div>
              </div>
            </div>

            <label className={styles.addLabels}>Task description:</label>
            <textarea
              onChange={handleChangeInputs}
              name='description'
              maxLength='150'
              value={formData.description}
              className={styles.textArea}
            />

            <div className={styles.addLabels}>Task time: (hour / minute)*</div>
            <div className={styles.timePickerDiv}>
              <input
                onChange={handleHour}
                type='text'
                name='hour'
                value={formData.hour}
                maxLength='2'
                placeholder='23'
                className={styles.timePicker}
              />
              <div className={styles.addLabels}>:</div>
              <input
                onChange={handleMinute}
                type='text'
                name='minute'
                value={formData.minute}
                maxLength='2'
                placeholder='57'
                className={styles.timePicker}
              />
              <div className={styles.errors}>{formErrors.timeError}</div>
            </div>
            <div className={styles.selectDivs}>
              <div className={styles.addLabels}>Important?</div>
              <select
                className={styles.selects}
                defaultValue={importantValue ? `true` : `false`}
                onChange={handleImportantSelect}
              >
                <option value='true'>Yes</option>
                <option value='false'>No</option>
              </select>
              <div className={styles.addLabels}>Favorite?</div>
              <select
                className={styles.selects}
                defaultValue={favoriteValue ? `ture` : `false`}
                onChange={handleFavoriteSelect}
              >
                <option value='true'>Yes</option>
                <option value='false'>No</option>
              </select>
            </div>
            <div className={styles.formBtnsDiv}>
              <div onClick={handleDiscard} className={styles.discardBtn}>
                Discard
              </div>
              <div onClick={handleSaveTodo} className={styles.saveBtn}>
                Save
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={toggleTask ? styles.taskItemOpened : styles.taskItem}>
          <div className={styles.taskInfo}>
            <div className={styles.name}>{task.name}</div>
            <div className={styles.time}>
              {' '}
              {task.hour}:{task.minute}
            </div>
            <div className={styles.tag}>{task.tag}</div>
            <div className={styles.toggle} onClick={handleToggleTask}>
              <div className={styles.dropDownArrow}>
                {' '}
                {toggleTask ? (
                  <IoMdArrowDropup className={styles.iconUp} />
                ) : (
                  <IoMdArrowDropdown className={styles.iconDown} />
                )}{' '}
              </div>
            </div>
          </div>
          <div
            className={
              toggleTask ? styles.taskDescriptionOpened : styles.taskDescription
            }
          >
            <div className={styles.status}>
              Task status:{' '}
              <div>
                {isCompleted ? (
                  <div className={styles.completedStatus}>Completed</div>
                ) : (
                  <div className={styles.unCompletedstatus}>Uncompleted</div>
                )}
              </div>
            </div>
            Task description:{' '}
            <div className={styles.description}>{task.description}</div>
          </div>
          <div className={toggleTask ? styles.divBtnsOpened : styles.divBtns}>
            <div onClick={handleDeleteTask} className={styles.deleteBtn}>
              Delete
            </div>
            <div onClick={handleEdit} className={styles.editBtn}>
              Edit
            </div>
            {isCompleted ? (
              <div
                onClick={handleToggleCompleted}
                className={styles.toggleUnCompletedBtn}
              >
                Set Uncompleted
              </div>
            ) : (
              <div
                onClick={handleToggleCompleted}
                className={styles.toggleCompletedBtn}
              >
                Set Completed
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskItem
