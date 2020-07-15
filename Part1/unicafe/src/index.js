import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Title = ({text}) => <h1>{text}</h1>;
const Button = ({clickHandler, text}) => {
  return <button onClick={clickHandler}>{text}</button>
};
const Statistics = ({allFeedback}) => {
  let table = 'No feedback given';
    if (allFeedback) {
      table = (
        <table>
          <tbody>
            {
              allFeedback.map(feedbackType => {
              return <Statistic key={feedbackType.label} 
                                label={feedbackType.label}
                                count={feedbackType.count}/>
              })
            }
          </tbody>
        </table>
      );
    }
  return (
    <React.Fragment>
      <Title text='statistics'/> 
      {table}
    </React.Fragment>
  );
};

const Statistic = ({label, count}) => (
  <tr><td>{label}</td><td>{count}</td></tr>
);

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countAll = good + neutral + bad;

  let allFeedback = null;

  if (countAll) {
    allFeedback = [
      {
        label:'good',
        count: good
      },
      {
        label:'neutral',
        count: neutral
      },
      {
        label:'bad',
        count: bad
      },
      {
        label:'all',
        count: countAll
      },
      {
        label:'average',
        count: (good-bad)/countAll 
      },
      {
        label:'positive',
        count: ((good/countAll)*100) + ' %' 
      }       
    ];
  };

  return (
    <div>
      <Title text='give feedback'/>
      <Button clickHandler={()=>setGood(good+1)} text='good'/>
      <Button clickHandler={()=>setNeutral(neutral+1)} text='neutral'/>
      <Button clickHandler={()=>setBad(bad+1)} text='bad'/>
      <Statistics allFeedback={allFeedback} /> 
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

