import { createStore, combineReducers, applyMiddleware } from "redux"
import notificationReducer from "./reducers/notificationReducer"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import blogReducer from "./reducers/blogReducer"
import loginReducer from "./reducers/loginReducer"

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  login: loginReducer,
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
