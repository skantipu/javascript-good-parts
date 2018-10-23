import React from 'react';
import ReactDOM from 'react-dom';
import '../style/style.scss';

const App = () => {
  const title = 'Hello World!!'
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('.container'));