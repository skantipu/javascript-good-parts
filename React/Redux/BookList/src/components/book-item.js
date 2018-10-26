import React from 'react';

//const BookItem = (props) => {
const BookItem = ({ book, selectedBook, ...props }) => {
  const isSelected = (book, selectedBook) => {
    if (selectedBook && book.title === selectedBook.title) {
      return 'active'
    }
    return '';
  };
  return (
    <li onClick={() => props.onBookSelect(book)} className={isSelected(book, selectedBook)}>
      {book.title}
    </li>
  );
};

export default BookItem;