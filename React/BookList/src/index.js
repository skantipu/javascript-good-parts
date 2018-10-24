import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BookList from './components/book-list';
import BookDetail from './components/book-detail';
import '../style/style.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [
        {
          title: 'Harry Potter 1',
          desc: 'Harry Potter and the Chamber of Secrets'
        },
        {
          title: 'Harry Potter 2',
          desc: 'Harry Potter and the Sorcerer\'s Stone'
        },
        {
          title: 'Harry Potter 3',
          desc: 'Harry Potter and the Goblet of Fire'
        },
        {
          title: 'Harry Potter 4',
          desc: 'Harry Potter and the Order of the Phoenix'
        },
        {
          title: 'Harry Potter 5',
          desc: 'Harry Potter and the Deathly Hallows'
        },
        {
          title: 'Harry Potter 6',
          desc: 'Harry Potter and the Half-Blood Prince'
        },
        {
          title: 'Harry Potter 7',
          desc: 'Harry Potter and the Prisoner of Azkaban'
        },
      ],
      activeBook: null
    };
  }
  render(){
    return (
      <div className="flex-container">
        <div className="book-list">
          <BookList books={this.state.books} onBookSelect={ book => {
            this.setState({ activeBook: book });
          }}/>
        </div>
        <div className="book-detail">
          <BookDetail book={this.state.activeBook} />
        </div>
      </div>
    );
  }
};

ReactDOM.render(<App />, document.querySelector('#root'));