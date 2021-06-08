import React, { useState, useEffect } from 'react'
import useInterval from '../custom hooks/useInterval'

function Date1() {
  const [dateInfo, setDateInfo] = useState({
    day: '',
    month: '',
    year: '',
    hour: '',
    minute: '',
    second: '',
  })
  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  useInterval(() => {
    const date = new Date()
    setDateInfo({
      day: days[date.getDay()],
      month: months[date.getMonth()],
      year: date.getFullYear(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
    })
  }, 1000)
  useEffect(() => {
    const date = new Date()
    setDateInfo({
      day: days[date.getDay()],
      month: months[date.getMonth()],
      year: date.getFullYear(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
    })
  }, [])

  return (
    <div>
      <div>
        Today: {dateInfo.day}, {dateInfo.month}, {dateInfo.year},{' '}
        {dateInfo.hour}:{dateInfo.minute}:{dateInfo.second}{' '}
      </div>
    </div>
  )
}

export default Date1
