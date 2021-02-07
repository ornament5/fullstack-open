import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notificationContent  = useSelector(state => state.notification)
  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (!notificationContent) {
    style = null
  }

  return (
    <div style={style}>
     {notificationContent}
    </div>
  )
}

export default Notification