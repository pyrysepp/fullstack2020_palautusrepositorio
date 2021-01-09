import React from 'react'


const Total = ({course}) => {
    return(   
      <p>
        Total of {course.parts.reduce(function(accumulator, currentValue) {
        return accumulator + currentValue.exercises
      },0)} exercises
      </p>  
    )
  }
  
  const Part = ({part}) => {
    return(
      <>
      <p>{part.name} {part.exercises}</p>
      </>
    )
  }
  
  export const Course = ({course}) => {
      
    return(
      
        <div>
        <h2>{course.name}</h2>
        <h3>Parts:</h3>
          {course.parts.map((part) => (
            
              <Part part={part} />
            
           ))
          }
        <h4>
          <Total course={course} /> 
        </h4>
        </div>
  
    )
        }