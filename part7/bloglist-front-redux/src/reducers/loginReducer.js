import blogService from "../services/blogService"
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
    default:
      return state
  }
}

export const loginAction = (user) => {
  return async (dispatch) => {
    const loggedUser = await loginService.login(user)
    window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(loggedUser))
    blogService.setToken(loggedUser.token)
    dispatch({
      type: "LOGIN",
      data: loggedUser,
    })
  }
}
export const logoutAction = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogAppUser")
    blogService.setToken(null)
    dispatch({
      type: "LOGOUT",
    })
  }
}
export default loginReducer
