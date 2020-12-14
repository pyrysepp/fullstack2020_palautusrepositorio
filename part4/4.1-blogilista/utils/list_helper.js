const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs) => {
      const reducer = (sum, item) => {
          return sum + item
      }
      if(blogs.length === 0){
          return 0
      } else {
          return blogs.map(b => b.likes).reduce(reducer, 0)
      }
  }
  
  const favoriteBlog = (blogs) => {

    if(blogs.length === 0) {
        return 0
    } else {
        const favBlog = blogs.find(b => b.likes === blogs.map(b => b.likes).reduce(function(a,b){
            return Math.max(a,b)
        }))
        return {
            title: favBlog.title,
            author: favBlog.author,
            likes: favBlog.likes
        }
    }
  }

  const mostBlogs = (blogs) => {
    if(blogs.length === 0) {
        return 0
    } else {
      const grouped = _.values(_.groupBy(blogs, 'author' ))
      grouped.sort()
      grouped.reverse()
      const amountofBlogs = _.head(grouped).length  
      const authorofMost = _.head(grouped)[0].author
      
          return {
            author: authorofMost,
            blogs: amountofBlogs
            } 
    }
  }

  const mostLikes = (blogs) => {
      if(blogs.length === 0) {
          return 0
      } else {
          const grouped = _.groupBy(blogs, 'author')
          const reducer = (a,b) => {
              return a + b
          }
          const likes =  _.mapValues(grouped, function(a){
              return a.map(o => o.likes).reduce(reducer,0)
          })
          const most = _.maxBy(_.toPairs(likes), function(p){
              return p[1]
          })
          return {
              author: most[0],
              likes: most[1]
          }
      }
  }
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }