import React, {Fragment} from 'react';

const CourseHeader = ({courseName}) => {
    return  <h2>{courseName}</h2>;
};
  
  const Content = ({parts}) => {
    return (
      <Fragment>
        {
          parts.map((part) => {
            return <Part key={part.id} name={part.name} exercisesCount={part.exercises}/>;
          })
        }
      </Fragment>
    );
  };
  
  const Part = ({name, exercisesCount}) => <p>{name} {exercisesCount}</p>;
  
  const Total = ({parts}) => {
    return (
      <p>
        <strong>    
            total of &nbsp;
            {parts.reduce((sum, currentPart) => sum + currentPart.exercises, 0)}
            &nbsp; exercises
        </strong> 
      </p>);
  };
  

const Course = ({course}) => {
    return (
        <div>
            <CourseHeader courseName={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    );
};

export default Course;