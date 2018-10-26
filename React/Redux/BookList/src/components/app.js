import React, { Component } from 'react';
import BookList from '../containers/book-list';
import BookDetail from '../containers/book-detail';
import './../../style/style.scss';

export default class App extends Component {
  render() {
    return (
      <div className="flex-container">
        <div className="book-list">
          <BookList />
        </div>
        <div className="book-detail">
          <BookDetail />
        </div>
      </div>
    );
  }
};