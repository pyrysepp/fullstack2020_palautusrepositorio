import userService from "../services/userService"

const initialState = []
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_USERS":
      return action.data
    case "ADD_USER":
      return state.concat(action.data)
    default:
      return state
  }
}

export const initUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: "INIT_USERS",
      data: users,
    })
  }
}
export const addUser = (ser) => {
  return {
    type: "ADD_USER",
    data: ser,
  }
}
export default userReducer
