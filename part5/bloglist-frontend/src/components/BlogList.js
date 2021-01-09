import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs, loginStatus, removeBlog }) => {
  if (loginStatus) {
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} removeBlog={removeBlog} blog={blog} />
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default BlogList;
