const initialState = { user: undefined, loginStatus: false }
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.data,
        loginStatus: true,
      }
    case "LOGOUT":
      return {
        user: undefined,
        loginStatus: false,
      }
    default:
      return state
  }
}

export const loginAction = (user) => {
  return async (dispatch) => {
    dispatch({
      type: "LOGIN",
      data: user,
    })
  }
}
export const logoutAction = () => {
  return async (dispatch) => {
    dispatch({
      type: "LOGOUT",
    })
  }
}
export default loginReducer
