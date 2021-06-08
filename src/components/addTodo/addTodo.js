import React, { useState } from 'react'
import styles from './style.module.css'
import addtask from '../../Redux/actions/addTaskAction'
import shortid from 'short-id'
import { useDispatch } from 'react-redux'

function Addtodo({ setIsAdding }) {
  const dispatch = useDispatch()
  const date = new Date()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tag: '',
    id: '',
    hour: '',
    minute: '',
    isCompleted: false,
    isImportant: false,
    isFavorite: false,
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
  })
  const [formErrors, setFormErrors] = useState({
    nameError: '',
    tagError: '',
    timeError: '',
  })
  //handlers
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

  const handleCloseAdd = () => {
    setFormErrors({ nameError: '', tagError: '', timeError: '' })
    setFormData({
      name: '',
      description: '',
      tag: '',
      id: '',
      hour: '',
      minute: '',
      isCompleted: false,
      isFavorite: false,
      isImportant: false,
    })
    setIsAdding(false)
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
      dispatch(
        addtask({
          ...formData,
          id: shortid.generate(),
        })
      )
      setIsAdding(false)
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
  //end of handlers
  return (
    <div className={styles.addTodoDiv}>
      <label className={styles.addLabels}>Task Name:*</label>
      <input
        onChange={handleChangeInputs}
        name='name'
        maxLength='24'
        placeholder='task name'
        className={styles.addInput}
      />
      <div className={styles.errors}>{formErrors.nameError}</div>
      <label className={styles.addLabels}>Task description:</label>
      <textarea
        onChange={handleChangeInputs}
        name='description'
        maxLength='150'
        placeholder='description'
        className={styles.textArea}
      />
      <label className={styles.addLabels}>Task tag:*</label>
      <input
        onChange={handleChangeInputs}
        name='tag'
        maxLength='24'
        placeholder='example: #shop'
        className={styles.addInput}
      />
      <div className={styles.errors}>{formErrors.tagError}</div>

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
          defaultValue='false'
          onChange={handleImportantSelect}
        >
          <option value='true'>Yes</option>
          <option value='false'>No</option>
        </select>
        <div className={styles.addLabels}>Favorite?</div>
        <select
          className={styles.selects}
          defaultValue='false'
          onChange={handleFavoriteSelect}
        >
          <option value='true'>Yes</option>
          <option value='false'>No</option>
        </select>
      </div>
      <div className={styles.formBtnsDiv}>
        <div onClick={handleCloseAdd} className={styles.discardBtn}>
          Discard
        </div>
        <div onClick={handleSaveTodo} className={styles.saveBtn}>
          Save
        </div>
      </div>
    </div>
  )
}

export default Addtodo
