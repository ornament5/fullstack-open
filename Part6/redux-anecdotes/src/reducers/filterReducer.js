const filterReducer = (state = '', action) => {
    switch(action.type) {
        case 'CHANGE_FILTER':
            return action.text
        default: 
            return state
    }
}

export const changeFilterValue = (newValue) => {
   return {
    type:'CHANGE_FILTER',
    text:newValue
  }
}

export default filterReducer