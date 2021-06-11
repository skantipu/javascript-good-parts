import React from 'react';
import styled from 'styled-components';
const StyledDiv = styled.div`
   display: flex;
   justify-content: space-between;
   width: 300px;
`;
const Item = (props) => {
   return (
     <StyledDiv>
       <div>{props.item} ({props.count})</div>
       <button onClick={() => props.clickLess(props.item)} disabled={props.count === 0}>Less</button>
       <button onClick={() => props.clickMore(props.item)}>More</button>
     </StyledDiv>
   );
};

export default Item;
