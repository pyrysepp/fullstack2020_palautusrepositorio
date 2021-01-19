import anecdoteService from "../services/anecdoteService"

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.voteAnecdote(id)
    dispatch({
      type: "VOTE",
      data: {
        votedAnecdote,
      },
    })
  }
}
export const initialize = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: "INITIALIZE",
      data: {
        anecdotes,
      },
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createOne(content)
    dispatch({
      type: "CREATE",
      data: {
        anecdote,
      },
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const changedAnecdote = action.data.votedAnecdote
      return state.map((a) =>
        a.id !== changedAnecdote.id ? a : changedAnecdote
      )
    case "CREATE":
      return state.concat(action.data.anecdote)
    case "INITIALIZE":
      return action.data.anecdotes
    default:
      return state
  }
}

export default reducer
