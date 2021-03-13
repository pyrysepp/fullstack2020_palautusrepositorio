let timeoutID = undefined

const initialState = {
  message: undefined,
  good: null,
  timeoutID: undefined,
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET-NOTIFICATION":
      return {
        message: action.data.message,
        good: action.data.good,
      }
    case "DELETE-NOTIFICATION":
      return {
        message: undefined,
      }
    default:
      return state
  }
}

export const setNotification = (message, good, showTime) => {
  return async (dispatch) => {
    if (timeoutID) {
      console.log(timeoutID)
      clearTimeout(timeoutID)
    }

    timeoutID = setTimeout(() => {
      dispatch(deleteNotification())
    }, showTime * 1000)

    dispatch(showNotification(message, good, timeoutID))
  }
}

export const showNotification = (message, good, timeoutID) => {
  return {
    type: "SET-NOTIFICATION",
    data: {
      message,
      good,
      timeoutID,
    },
  }
}

export const deleteNotification = () => {
  return {
    type: "DELETE-NOTIFICATION",
  }
}

export default notificationReducer
