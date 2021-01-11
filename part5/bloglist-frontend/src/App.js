import React, { useState, useEffect, useRef } from "react"
import BlogList from "./components/BlogList"
import blogService from "./services/blogService"
import LoginForm from "./components/LoginForm"
import NewBlogForm from "./components/NewBlogForm"
import StatusMessage from "./components/StatusMessage"
import Togglable from "./components/Togglable"
import _ from "lodash"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [loginStatus, setLoginStatus] = useState(false)
    const [statusMessage, setStatusMessage] = useState(null)



    useEffect(() => {
        const fetchData = async () => {
            const allBlogs = await blogService.getAll()
            setBlogs(_.sortBy(allBlogs, "likes").reverse())
        }
        fetchData()
    }, [])

    const blogFormRef = useRef()

    const removeBlog = async (blogId) => {
        try {
            const response = await blogService.remove(blogId)
            console.log(response)
            setBlogs(blogs.filter((b) => b.id !== response.data.id))
        } catch (error) {
            console.log(error)
            setStatusMessage({
                good: false,
                message: error.response.data.error
            })
        }
    }
    const createBlog = async (blogObject) => {
        try {
            const response = await blogService.create(blogObject)
            const newBlog = response.data
            console.log(response)
            setBlogs(blogs.concat(newBlog))

            setStatusMessage({
                good: true,
                message: `${newBlog.title} by ${newBlog.author} added`,
            })
            blogFormRef.current.toggleVisibility()
            setTimeout(() => setStatusMessage(null), 3000)
        } catch (error) {
            console.log(error.response.data.error)
            setStatusMessage({ good: false, message: error.response.data.error })
            setTimeout(() => setStatusMessage(null), 5000)
        }
    }

    return (
        <div>
            <StatusMessage
                statusMessage={statusMessage}
                setStatusMessage={setStatusMessage}
            />
            <LoginForm
                loginStatus={loginStatus}
                setLoginStatus={setLoginStatus}
                statusMessage={statusMessage}
                setStatusMessage={setStatusMessage}
            />
            <Togglable
                loginStatus={loginStatus}
                ref={blogFormRef}
                buttonLabel="add new blog"
            >
                <NewBlogForm
                    loginStatus={loginStatus}
                    statusMessage={statusMessage}
                    setStatusMessage={setStatusMessage}
                    createBlog={createBlog}
                />
            </Togglable>
            <BlogList
                loginStatus={loginStatus}
                blogs={blogs}
                removeBlog={removeBlog}
            />
        </div>
    )
}

export default App
