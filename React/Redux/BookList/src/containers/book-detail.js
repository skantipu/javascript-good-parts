import React from 'react';
import { connect } from 'react-redux';

const BookDetail = ({ book }) => {
  if (!book) {
    return <div></div>;
  }
  return (
    <div className="book-detail__holder">
      <h2>{book.title}</h2>
      <h3>{book.desc}</h3>
    </div>
  );
};

const mapStateToProps = (state) => ({
  book: state.activeBook
});

export default connect(mapStateToProps)(BookDetail);