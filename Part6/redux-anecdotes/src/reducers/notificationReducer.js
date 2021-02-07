let hideNotificationTimer = null
const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data
    case 'HIDE_NOTIFICATION':
      return ''
    default: 
      return state
  }
}

export const showNotification = (text, duration) => {
  return async dispatch => {
    clearTimeout(hideNotificationTimer)
    dispatch({
      type:'SHOW_NOTIFICATION',
      data:text
    })
    hideNotificationTimer = setTimeout(() => dispatch({ type:'HIDE_NOTIFICATION' }), duration*1000)
  }
}

export default notificationReducer