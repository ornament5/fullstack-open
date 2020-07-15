import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({clickHandler, text}) => {
  return <button onClick={clickHandler}>{text}</button>
};

const Title = ({text}) => <h1>{text}</h1>;

const App = (props) => {
  const [selected, setSelected] = useState(1);
  const [votes, setVotes] = useState(new Array(6).fill(0));

  const handleNextAnecdoteClick = () => {
    return setSelected(getRandomInteger());
  };

  const handleVoteClick = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] = updatedVotes[selected] + 1;
    return setVotes(updatedVotes);
  };

  const getRandomInteger = () => {
    const int = Math.floor(Math.random()*6);
    if (int === selected) {
      return getRandomInteger();
    } else {
      return int;
    }
  };

  const getMostPopularAnecdote = () => {
    const highestVoteCount = Math.max(...votes);
    const position = votes.findIndex(voteCount => voteCount === highestVoteCount);

    return anecdotes[position];
  }

  let mostPopularAnecdote ='No votes yet';

  if (votes.reduce((sum, next) => sum + next) > 0) {
    mostPopularAnecdote = getMostPopularAnecdote();
  }

  return (
    <div>
      <Title text='Anecdote of the day'/> 
      {props.anecdotes[selected]}
      <br />
      <Button clickHandler={handleVoteClick} text='Vote'/>
      <Button clickHandler={handleNextAnecdoteClick} text='Next anecdote'/>
      <Title text='Anecdote with most votes'/> 
      {mostPopularAnecdote}
    </div>
  )
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
);