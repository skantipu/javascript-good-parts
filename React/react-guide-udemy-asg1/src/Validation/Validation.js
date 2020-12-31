import React from 'react';

const Validation = (props) => {
    return (
      <p>
          {
              props.input.length > 5 ? 'text too long' : 'text too short'
          }
      </p>
    );
}

export default Validation;