import blogService from "../services/blogService"
import { setNotification } from "./notificationReducer"
import loginService from "../services/loginService"
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
    case "LOGGED_USER":
      return {
        user: action.data,
        loginStatus: true,
      }
    default:
      return state
  }
}

export const loginAction = (user) => {
  return async (dispatch) => {
    try {
      const loggedUser = await loginService.login(user)
      console.log("handleLogin response:", loggedUser)
      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(loggedUser)
      )
      blogService.setToken(loggedUser.token)
      dispatch({
        type: "LOGIN",
        data: loggedUser,
      })
      dispatch(setNotification("succesfully logged in", true, 5))
    } catch (error) {
      console.log(error.response.data.message)
      dispatch(setNotification(error.response.data.message, false, 5))
    }
  }
}
export const logoutAction = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogAppUser")
    blogService.setToken(null)
    dispatch(setNotification("succesfully logged out", true, 5))
    dispatch({
      type: "LOGOUT",
    })
  }
}
export const loggedUserAction = (user) => {
  return {
    type: "LOGGED_USER",
    data: user,
  }
}
export default loginReducer
