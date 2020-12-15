const blogsRouter = require('express').Router()
const express = require('express')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const { response } = require('express')


blogsRouter.get('/', async (request, response) => {
    const allBlogs = await Blog.find({})
    
    response.json(allBlogs)
  })
  
  blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    if(!body.likes) {
      body.likes = 0
    }
    const blog = new Blog(body)
    try {
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog.toJSON())
    } catch (error) {
      next(error)
    }
  })

  blogsRouter.delete('/:id', async (request, response, next) => {
    try {
      const deletedPerson = await Blog.findByIdAndDelete(request.params.id)
      response.json(deletedPerson)
    } catch (error) {
      next(error)
    }
  })

  blogsRouter.put('/:id', async (req, res, next) => {
    console.log(req.body)
    
    const blog = {
      likes: req.body.likes
    }
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {new: true, runValidators: true, omitUndefined:true})
      res.json(updatedBlog)
    } catch (error) {
      next(error)
    }

  })

 module.exports = blogsRouter
  