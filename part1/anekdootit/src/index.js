import React, { useState } from 'react'
import ReactDOM from 'react-dom'


function randomInt(min, max) {
  return Math.floor(min + Math.random()*(max + 1 - min))
}

const MostVotes = (props) => {
    let maxvalue = props.json[0].value
    let max = props.json[0].anec

    for(let i = 0; i < props.json.length; i++) {
      if(props.json[i].value > maxvalue) {
        max = props.json[i].anec;
        maxvalue = props.json[i].value
      }
    }
    return(
      <>
      <p>{max}</p>
      </>
    )
}



const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [anects, setVotes] = useState(props.anecdotes)

  const handleUpdate = () => {
    const copy = [...anects]
    copy[selected].value = copy[selected].value + 1
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <h2>{props.anecdotes[selected].anec}</h2>
      <p>has {props.anecdotes[selected].value} votes</p>
      <button onClick={() => handleUpdate()} >vote</button>
      <button onClick={() => setSelected(randomInt(0,props.anecdotes.length-1)) }>next anecdote</button>
      <h1>Anecdote with the most votes</h1>
      <MostVotes json={anects} />
    </div>
  )
}

const anecdotes = [
  {
     "anec":"If it hurts, do it more often",
     "value": 0
  },
  {
     "anec":"Adding manpower to a late software project makes it later!",
     "value": 0
  },
  {
     "anec":"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
     "value": 0
  },
  {
     "anec":"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
     "value": 0
  },
  {
     "anec":"Premature optimization is the root of all evil.",
     "value": 0
  },
  {
     "anec":"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
     "value": 0
  }
]



ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
)