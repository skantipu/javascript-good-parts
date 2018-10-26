import React from 'react';

const BookItem = (props) => {
  return (
    <li onClick={() => props.onBookSelect(props.book)}>
      {props.book.title}
    </li>
  );
};

export default BookItem;