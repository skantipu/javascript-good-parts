import React, {useState} from 'react';

const Char = (props) => {
    const style = {
        display: "inline-block",
        padding: "20px",
        margin: "10px",
        border: "1px solid black"
    };
    return (
        <div style={style} onClick={props.click}>
            {props.char}
        </div>
    );
};

export default Char;