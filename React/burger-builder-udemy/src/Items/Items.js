import React from 'react';
import Item from "./Item/Item";
const Items = (props) => {
  const ItemList = [];
  for (const item in props.items) {
    ItemList.push(<Item item = {item} key = {item} clickLess={props.clickLess} clickMore={props.clickMore} count = {props.items[item]} />);
  }
  return ItemList;
}


export default Items;