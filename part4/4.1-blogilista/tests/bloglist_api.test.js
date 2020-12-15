const { TestScheduler } = require('jest')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../utils/list_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
  
    await Blog.insertMany(helper.initialBlogs)
    
})

describe('apiTests',  () => {

    test('GET request should return the correct amount of blogs', async () =>{
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helper.initialBlogs.length)
    })

    test('The ID field of a blog should be \'id\' instead of \'_id\'', async() => {
        const response = await api.get('/api/blogs')
        response.body.forEach(b => expect(b.id).toBeDefined())
    })

    test('Adding blogs works as expected', async () => {
        expect.extend({
            toMatchValues(received) {
                const pass = typeof received.title === "string" && typeof received.author === "string" && typeof received.url === "string" && typeof received.likes === "number"
                if(pass) {
                    return {
                        message: () => 'types of added blog are correct',
                        pass: true
                    }
                } else {
                    return {
                        message: () => 'types of added blog are incorrect',
                        pass: false
                    }
                }
            }
        })
        const newBlog = {
            title: "this is a test",
            author: "me",
            url: "https://fullstackopen.com/",
            likes: 10, 
        }


        const postResponse = await api.post('/api/blogs').send(newBlog)
        
        
            
        
        const getResponse = await api.get('/api/blogs')
        
        expect(getResponse.body.length).toBe(helper.initialBlogs.length+1)
        expect(postResponse.body).toMatchValues()

    })

    test('if likes -field is not defined, set likes as 0', async () => {
        const newBlog = {
            title: "likes should be 0",
            author: "me",
            url: "https://fullstackopen.com/",
        }
        const postResponse = await api.post('/api/blogs').send(newBlog)
        expect(postResponse.body.likes).toBe(0)
        
    })

    test('missing title and/or url will result in status code 400', async () => {

        const newBlog = {
            author: "me",
            likes: 10
        }
        const postResponse = await api.post('/api/blogs').send(newBlog)
        
        expect(postResponse.status).toBe(400)
    })
})
afterAll(() => {
    mongoose.connection.close()
    
})