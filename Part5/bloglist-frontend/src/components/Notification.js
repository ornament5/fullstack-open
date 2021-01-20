import React from 'react'

const Notification = ({ type, text }) => {
  if(text === null) {
    return null
  } else {
    return <div className={`${type} notification`}>{text}</div>
  }
}

export default Notification