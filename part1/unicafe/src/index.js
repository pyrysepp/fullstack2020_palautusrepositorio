import React, { useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';



const Button = (props) => {
  return(
  <button onClick={props.handleClick}>{props.text}</button>
  )
}

const average = (good, bad, neutral) => {
  return(
    ((bad*-1) + (good*1) + (neutral*0)) / (good+bad+neutral)
  )
}

const positivePr = (good, bad, neutral) => {
  return(
    (good/(good+bad+neutral))*100 + ' %'
  )
}
const StatisticLine = (props) => {
  return(
    <tr>
    <th>{props.text}</th> <td>{props.value}</td>
    </tr>
  )
}
const Statistics = (props) => {
  if(props.good===0 & props.bad===0 & props.neutral===0) {
    return (
      <div>
        <h2>No feedback given</h2>
      </div>
    )
  }
  return(
  <div>
    <h2>Statistics</h2>
    <table>
    <StatisticLine text="good" value ={props.good}/>
    <StatisticLine text="neutral" value ={props.neutral} />
    <StatisticLine text="bad" value ={props.bad} />
    <StatisticLine text="all" value ={props.good + props.bad + props.neutral} />
    <StatisticLine text="average" value ={average(props.good, props.bad, props.neutral)} />
    <StatisticLine text="positive" value={positivePr(props.good, props.bad, props.neutral)}  />
    </table>
  </div>
  )
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
    <div>
      <h2>Give feedback</h2>
      
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
    </div>
    <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
