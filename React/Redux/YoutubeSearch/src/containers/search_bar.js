import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updatedVideos } from '../actions/index';
import YTSearch from 'youtube-search';
const key = 'AIzaSyDJ23y4_hQMa39dFM-1yxyT_RWgetg0yXk';

class SearchBar extends Component {
  onInputChange(e) {
    const term = e.target.value;
    YTSearch(term, { maxResults: 10, key }, (err, videos) => {
      this.props.updatedVideos(videos);
    });
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

const mapDispatchToProps = (dispatch) => bindActionCreators({ updatedVideos }, dispatch);

export default connect(()=>{}, mapDispatchToProps)(SearchBar);