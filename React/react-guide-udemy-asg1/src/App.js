import React, {useState} from 'react';
import './App.css';
import Validation from "./Validation/Validation";
import Char from "./Char/Char";
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: red;
  border: 1px solid organge;
  border-radius: 3px;
`;

function App() {
    const [input, setInput] = useState('');
    const inputHandler = (ev) => {
        setInput(ev.target.value);
    }
    const deleteChar = (char, index) => {
        setInput(input.substring(0, index) + input.substring(index+1));
    };
    const chars = input.split("").map((char, index) => <Char char={char} click={() => deleteChar(char, index)} key={index}/>);

    return (
        <div className="App">
            <StyledInput type="text" onChange={inputHandler} value={input}/>
            <p>{input.length}</p>
            <Validation input={input}/>
            {chars}
        </div>
    );
}

export default App;
