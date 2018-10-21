import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };
  }
  onInputChange(e) {
    this.setState({ term: e.target.value })
  }
  render() {
    return (
      <div className="search-input-holder">
        <input type="text"
               value={this.state.term}
               onChange={this.onInputChange.bind(this)}
               placeholder="search"
        />
      </div>
    );
  }
}