import React from 'react';

const BookDetail = (props) => {
  if (!props.book) {
    return <div></div>;
  }
  return (
    <div className="book-detail__holder">
      <h2>{props.book.title}</h2>
      <h3>{props.book.desc}</h3>
    </div>
  );
};

export default BookDetail;