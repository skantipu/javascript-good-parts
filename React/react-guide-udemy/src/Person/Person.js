import React from 'react';
const Person = (props) => {
    const style = {
        margin: "10px",
        border: "1px solid grey",
        padding: "10px",
        width: "400px"
    }
    return (
        <div style={style}>
            I'm {props.name} and I'm {props.age} years of age! Enter a name: <input type="text" value={props.name} onChange={props.inputChange}/>
            <br />
            <button onClick={props.deletePerson}>Delete</button>
        </div>
    );
}
export default Person;