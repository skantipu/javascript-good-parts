import React, {useState} from 'react';
import './App.css';
import Validation from "./Validation/Validation";
import Char from "./Char/Char";

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
            <input type="text" onChange={inputHandler} value={input}/>
            <p>{input.length}</p>
            <Validation input={input}/>
            {chars}
        </div>
    );
}

export default App;
