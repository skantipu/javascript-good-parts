import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectBook } from "../actions";
import BookItem from './../components/book-item';

const BookList = (props) => {
  const booksList = props.books.map((book, index) => {
    return <BookItem
              book={book}
              key={index}
              onBookSelect={ book => props.selectBook(book) }/>
  });
  return (
    <ul>
      {booksList}
    </ul>
  );
}

const mapStateToProps = (state) => ({
  books: state.books,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ selectBook }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BookList);