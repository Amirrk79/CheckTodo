import React, { useState } from 'react'
import styles from './styles.module.css'
import history from '../../history'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

function Login() {
  const [formData, setFormData] = useState({
    name: '',
    errorName: '',
  })
  const handleChange = (e) => {
    setFormData({
      [e.target.name]: e.target.value,
      errorName: '',
    })
  }
  const handleSubmit = () => {
    if (!formData.name) {
      setFormData({ ...formData, errorName: 'Please enter your name.' })
    } else {
      localStorage.setItem('name', formData.name)
      history.push('/menu')
    }
  }
  return (
    <div className={styles.main}>
      <Helmet>
        <title>Check Todo</title>
      </Helmet>
      <div className={styles.loginForm}>
        <h1 className={styles.headerText}>Wellcome to Check todo</h1>

        <div className={styles.inputDiv}>
          <input
            onChange={handleChange}
            name='name'
            placeholder='Enter your name'
            className={styles.loginInput}
          />
          <div className={styles.error}>{formData.errorName}</div>
          <div onClick={handleSubmit} className={styles.loginBtn}>
            SUBMIT
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Login)
