import React from "react"
import { connect } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
const _ = require("lodash")

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes

  const filter = props.filter

  const vote = (id) => {
    props.voteAnecdote(id)
    props.setNotification(
      `You voted ${anecdotes.find((a) => a.id === id).content}`,
      5
    )
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdotes
