const blogsRouter = require("express").Router();
const express = require("express");
const Blog = require("../models/blog");
const mongoose = require("mongoose");
const { response } = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const allBlogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });

  response.json(allBlogs);
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  if (!body.likes) {
    body.likes = 0;
  }

  console.log(user.name);
  console.log(user.blogs);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog.toJSON());
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(request.params.id);
  console.log(user.id.toString());
  console.log(blog.user);
  if (!(blog.user.toString() === user.id)) {
    return response.status(401).json({ error: "incorrect user" });
  }
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id);
  response.json(deletedBlog);
});

blogsRouter.put("/:id", async (req, res, next) => {
  console.log(req.body);

  const blog = {
    likes: req.body.likes,
  };
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
      runValidators: true,
      omitUndefined: true,
    });
    res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
