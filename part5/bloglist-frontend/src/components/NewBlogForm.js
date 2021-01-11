import React, { useState } from "react"

const NewBlogForm = ({ loginStatus, createBlog }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()

        const newBlog = {
            title,
            author,
            url,
        }
        createBlog(newBlog)
        setTitle("")
        setAuthor("")
        setUrl("")
    }

    if (loginStatus) {
        return (
            <form onSubmit={handleSubmit} id="form">
                <h2>Add a new blog</h2>
                <div>
          title
                    <input
                        id="titleInput"
                        type="text"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
          author
                    <input
                        id="authorInput"
                        type="text"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
          url
                    <input
                        id="urlInput"
                        type="text"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        )
    } else {
        return null
    }
}

export default NewBlogForm
