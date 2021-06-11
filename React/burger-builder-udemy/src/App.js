import React, {useState} from 'react';
import './App.css';
import styled from 'styled-components';
import Burger from "./Burger/Burger";
import Items from "./Items/Items";
import CartTotal from "./CartTotal/CartTotal";

const StyledHeader = styled.header`
    background-color: brown;
    color: white;
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    height: 40px;`;
const StyledRightDiv = styled.div`
    display: flex;
    width: 250px;
    justify-content: space-around;
`;

const App = () => {
  const itemCost = {
    'salad': 2,
    'fruit': 3,
    'bread': 1.5,
    'drink': 2
  };
  const [itemCount, setItemCount] = useState({
    'salad': 0,
    'fruit': 0,
    'bread': 0,
    'drink': 0
  });
  const lessClickHander = (item) => {
    setItemCount({
      ...itemCount,
      [item]: Math.max(--itemCount[item], 0)
    });
  }
  const moreClickHandler = (item) => {
    setItemCount({
      ...itemCount,
      [item]: ++itemCount[item]
    });
  }
  return (
    <div className="App">
      <StyledHeader className="App-header">
        <div>Icon</div>
        <StyledRightDiv>
          <div>BurgerBuilder</div>
          <div>Checkout</div>
        </StyledRightDiv>
      </StyledHeader>
      <Burger />
      <Items items = {itemCount} clickLess = {lessClickHander} clickMore = {moreClickHandler}></Items>
      <CartTotal itemCount = {itemCount} itemCost = {itemCost}/>
    </div>
  );
}

export default App;
