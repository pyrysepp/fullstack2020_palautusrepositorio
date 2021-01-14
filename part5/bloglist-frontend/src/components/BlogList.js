import React from "react"
import Blog from "./Blog"
import PropTypes from "prop-types"

const BlogList = ({ blogs, loginStatus, removeBlog }) => {
    if (loginStatus) {
        return (
            <div className="Bloglist">
                <h2>blogs</h2>
                {blogs.map((blog) => (
                    <Blog key={blog.id} removeBlog={removeBlog} testHandler={() => null} blog={blog} />
                ))}
            </div>
        )
    } else {
        return null
    }
}

BlogList.propTypes = {
    blogs: PropTypes.array.isRequired,
    loginStatus: PropTypes.bool.isRequired,
    removeBlog: PropTypes.func.isRequired
}
export default BlogList
