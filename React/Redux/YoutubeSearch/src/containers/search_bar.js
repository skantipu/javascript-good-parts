import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchUpdated } from '../actions/index';

class SearchBar extends Component {
  onInputChange(e) {
    this.props.searchUpdated(e.target.value);
  }
  render() {
    return (
      <div className="search-input-holder">
        <input type="text"
               onChange={(e) => this.onInputChange(e)}
               placeholder="search"
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ searchUpdated }, dispatch);

export default connect(()=>{}, mapDispatchToProps)(SearchBar);