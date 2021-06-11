import React from 'react';

const CartTotal = (props) => {
  let total = 0;
  const findSum = (itemCountObj) => {
    for (const item in itemCountObj) {
      total += (itemCountObj[item] * props.itemCost[item]);
    }
    return total;
  }
  return (
    <h3> Cart Total: ${findSum(props.itemCount)}</h3>
  );
};

export default CartTotal;