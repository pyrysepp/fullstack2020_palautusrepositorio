const { favoriteBlog, mostBlogs, mostLikes } = require('../utils/list_helper')
const listHelper = require('../utils/list_helper')

const blogs = listHelper.initialBlogs


test('dummy returns one', () => {

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const totalLikes = listHelper.totalLikes

  test('of empty list is a zero', () => {
    expect(totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () =>{
    expect(totalLikes(blogs.slice(0,1))).toBe(blogs[0].likes)
  })

  test('of a bigger list is calculated right', () =>{
    expect(totalLikes(blogs)).toBe(36)
  })
})

describe('favorite blog', () =>{
  
  test('on a empty list returns 0', () => {
    expect(favoriteBlog([])).toBe(0)
  })
  test('when list has only one blog return information of that', () => {
    expect(favoriteBlog(blogs.slice(0,1))).toEqual({
      title: blogs[0].title,
      author: blogs[0].author,
      likes: blogs[0].likes
    })
  })
  test('on a bigger list returns the blog with most likes', ()=>{
    expect(favoriteBlog(blogs)).toEqual({
      title: blogs[2].title,
      author: blogs[2].author,
      likes: blogs[2].likes
    })
  })
})

describe('most blogs', () => {
  test('on a empty list returns 0', () => {
    expect(mostBlogs([])).toBe(0)
  })
  test('when list has only one blog return information of that', () => {
    expect(mostBlogs(blogs.slice(0,1))).toEqual({
      author: "Michael Chan",
      blogs: 1
    })
  })
  test('work correctly on bigger lists', () => {
    expect(mostBlogs(blogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    })
  })
})

describe('most likes', () => {
  test('on empty list returns 0', () => {
    expect(mostLikes([])).toBe(0)
  })
  test('when list has only one blog return the information of it', () => {
    expect(mostLikes(blogs.slice(0,1))).toEqual({
      author: "Michael Chan",
      likes: 7
    })
  })
  test('should work on larger lists', () => {
    expect(mostLikes(blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })
})