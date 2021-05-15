import React from 'react'
const Header = ({course}) => <h1>{course.name}</h1>
  
const Content = ({course}) => 
        <div>
            {course.parts.map(part => <Part key={part.id} name={part.name} exercise={part.exercise} />)}
        </div>

const Part = ({name, exercise}) => <p>{name} {exercise}</p>

const Total = ({course}) => {
    let part = course.parts.map(course => course.exercise) 
    return(
        <p><b>Total of {part.reduce((s, p) => s + p)} exercises</b></p>
    )
}
  
const Course = ({course}) => {    
    return(
    <div>
        <Header course={course} />
        <Content course={course} />      
        <Total course={course} /> 
    </div>
    )
}

export default Course