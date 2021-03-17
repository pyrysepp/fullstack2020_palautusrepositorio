import blogService from "../services/blogService"
import { setNotification } from "./notificationReducer"

const initialState = []
const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data
    case "NEW_BLOG":
      return state.concat(action.data)
    case "REMOVE_BLOG":
      return state.filter((a) => a.id !== action.data)
    case "COMMENT_BLOG":
      return state.map((b) => (b.id === action.data.id ? action.data : b))
    case "LIKE_BLOG":
      return state.map((a) => (a.id === action.data.id ? action.data : a))
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    console.log("initializeBlogs redux")
    const blogs = await blogService.getAll()
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    })
  }
}
export const commentBlogAction = (id, comment) => {
  return async (dispatch) => {
    try {
      const commentedBlog = await blogService.commentBlog(id, comment)
      console.log(commentedBlog)
      dispatch({
        type: "COMMENT_BLOG",
        data: commentedBlog,
      })
    } catch (error) {
      console.log("comment error")
      dispatch(setNotification(error.response.error.message, false, 5))
    }
  }
}
export const createBlogAction = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: "NEW_BLOG",
      data: newBlog,
    })
  }
}
export const removeBlogAction = (blog) => {
  return async (dispatch) => {
    const removedBlog = await blogService.remove(blog.id)
    dispatch({
      type: "REMOVE_BLOG",
      data: removedBlog.id,
    })
  }
}
export const likeBlogAction = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.likeBlog({
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch({
      type: "LIKE_BLOG",
      data: likedBlog,
    })
  }
}
export default blogReducer
