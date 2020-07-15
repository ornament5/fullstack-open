import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';


const Header = ({courseName}) => {
  return  <h1>{courseName}</h1>;
};

const Content = ({parts}) => {
  return (
    <Fragment>
      {
        parts.map((part) => {
          return <Part key={part.name} name={part.name} exercisesCount={part.exercises}/>;
        })
      }
    </Fragment>
  );
};

const Part = ({name, exercisesCount}) => <p>{name} {exercisesCount}</p>;

const Total = ({parts}) => {
  return (
    <p>Number of exercises &nbsp;
      {parts.reduce((sum, currentPart) => sum + currentPart.exercises)}
    </p>);
};


const App = () => {
  const course = {
    name:'Half Stack application development',
    parts: [
      {
        name:'Fundamentals of React',
        exercises:10
      },
      {
        name:'Using props to pass data',
        exercises:7
      },
      {
        name:'State of a component',
        exercises:14
      }  
    ]
  };

  return (
    <div>
      <Header courseName={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));