import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )  
}

const HeadingText = ({text}) => {
  return (
    <h2>{text}</h2>
  )  
}

const Statistic = ({text, count}) => {
  return (
    <tr>
      <td>{text}</td><td>{count}</td>
    </tr>
  )  
}

const Statistics = ({all, good, neutral, bad}) => {
  if (all === 0) {
    return (
      <p>No feedback given</p>
    )  
  }
  else {
   return (
     <table>
       <thead></thead>
       <tbody>
        <Statistic text="good" count={good}/>
        <Statistic text="neutral" count={neutral}/>
        <Statistic text="bad" count={bad}/>
        <Statistic text="all" count={all}/>
        <Statistic text="average" count={(good - bad)/ all}/>
        <Statistic text="positive" count={good / all * 100 + "%"}/>
       </tbody>
       <tfoot></tfoot>    
    </table>
  )
  }  
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const incrementGood = () => {
    setGood(good + 1)
    CountStats()
  }

  const incrementNeutral = () => {
    setNeutral(neutral + 1)
    CountStats()
  }
  
  const incrementBad = () => {
    setBad(bad + 1)
    CountStats()
  }

  const CountStats = () => setAll(all + 1)

  return (
    <div>
      <HeadingText text="give feedback"/>
      <Button handleClick={incrementGood} text='Good' />
      <Button handleClick={incrementNeutral} text='Neutral' />
      <Button handleClick={incrementBad} text='Bad' />
      <HeadingText text="statistics"/>
      <Statistics all={all} good = {good} neutral={neutral} bad={bad}/>      
    </div>
  )
}

export default App