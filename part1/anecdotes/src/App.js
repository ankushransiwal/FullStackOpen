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

const DisplayText = ({text}) => {
  return (
    <p>{text}</p>
  )  
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0])

  const addVote = () => {
    const copy = [...votes]
    // increment the value in position 2 by one
    copy[selected] += 1  
    setVotes(copy)
    checkMostVoted()
  }

  const checkMostVoted = () => {
    var selectedIndex = 0;
    var highestVotes = 0;
    votes.forEach((value, index) => { 
      if(value > highestVotes){
        selectedIndex = index;
      }    
    })
    setMostVoted(selectedIndex)
  }

  const nextAnecdote = () => {
    console.log(selected);
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  return (
    <div>      
      <HeadingText text="Anecdote of the day"/>
      <DisplayText text={anecdotes[selected]}/>
      <DisplayText text={"has " + votes[selected] + " votes"}/>
      <Button handleClick={addVote} text='Vote' />     
      <Button handleClick={nextAnecdote} text='Next Anecdote' />
      <HeadingText text="Anecdote with most votes"/>
      <DisplayText text={anecdotes[mostVoted]}/>
      <DisplayText text={"has " + votes[mostVoted] + " votes"}/>        
    </div>
  )
}

export default App