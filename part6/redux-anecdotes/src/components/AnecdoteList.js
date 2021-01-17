import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import {
  setNotification,
  deleteNotification,
} from "../reducers/notificationReducer"

const _ = require("lodash")
const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter.toLowerCase())
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log("vote", id)
    dispatch(voteAnecdote(id))
    dispatch(
      setNotification(`You voted ${anecdotes.find((a) => a.id === id).content}`)
    )
    setTimeout(() => {
      dispatch(deleteNotification())
    }, 5000)
  }
  return (
    <div>
      {_.sortBy(anecdotes, function (a) {
        return -a.votes
      })
        .filter((a) => a.content.toLowerCase().includes(filter))
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
