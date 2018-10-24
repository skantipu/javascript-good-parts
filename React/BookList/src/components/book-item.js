import React from 'react';

const BookItem = (props) => {
  return (
    <li onClick={() => props.onBookSelect(props.bookItem) }>{props.bookItem.title}</li>
  );
};

export default BookItem;