const initialState = {
  message: "asdasdasd",
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
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(deleteNotification())
    }, showTime * 1000)
  }
}
export const showNotification = (message) => {
  return {
    type: "SET-NOTIFICATION",
    data: {
      message,
    },
  }
}

export const deleteNotification = () => {
  return {
    type: "DELETE-NOTIFICATION",
  }
}

export default notificationReducer
