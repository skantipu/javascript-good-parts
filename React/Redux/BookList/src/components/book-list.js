import React from 'react';
import BookItem from './book-item';

const BookList = (props) => {
  const bookItems = props.books.map((book, ind) => <BookItem key={ind} bookItem={book} onBookSelect={props.onBookSelect}/>);
  return (
    <ul>
      {bookItems}
    </ul>
  );
};

export default BookList;