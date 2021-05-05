import React from 'react'

const Header = ({course}) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Content = ({course}) => {
  let parts = course.parts;  
  return (
    <div>
      <Part part= {parts[0]}/>
      <Part part= {parts[1]}/>
      <Part part= {parts[2]}/>
    </div>
  )
}

const Part = ({part}) => {
  return (
    <p>
        {part.course} {part.exercise}
    </p>
  )
}

const Total = ({course}) => {
  let total = course.parts[0].exercise + course.parts[1].exercise + course.parts[2].exercise;
  return(
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = {
    name : 'Half Stack application development',
    parts : [{
      course : 'Fundamentals of React',
      exercise : 10
    },
    {
      course : 'Using props to pass data',
      exercise : 7
    },
    {
      course : 'State of a component',
      exercise : 14
    }
    ]  
  }  

  return (
    <div>
      <Header course={course} />
      <Content course={course} />      
      <Total course={course} /> 
    </div>
  )
}

export default App