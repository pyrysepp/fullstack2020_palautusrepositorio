let timeoutID = undefined

const initialState = {
  message: "asdasdasd",
  timeoutID: undefined,
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET-NOTIFICATION":
      return {
        message: action.data.message,
      }
    case "DELETE-NOTIFICATION":
      return {
        message: "",
      }
    default:
      return state
  }
}

export const setNotification = (message, showTime) => {
  return async (dispatch) => {
    if (timeoutID) {
      console.log(timeoutID)
      clearTimeout(timeoutID)
    }

    timeoutID = setTimeout(() => {
      dispatch(deleteNotification())
    }, showTime * 1000)

    dispatch(showNotification(message))
  }
}

export const showNotification = (message, timeoutID) => {
  return {
    type: "SET-NOTIFICATION",
    data: {
      message,
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
