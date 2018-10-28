import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { updatedVideos, videoSelected } from '../actions/index';
import YTSearch from 'youtube-search';
const key = 'AIzaSyDJ23y4_hQMa39dFM-1yxyT_RWgetg0yXk';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: 'ayurveda' };
    this.searchVideos(this.state.term);
    this.debounceTermChange = _.debounce(term => { this.searchVideos(term)}, 1000);
  }
  searchVideos(term) {
    YTSearch(term, { maxResults: 10, key }, (err, videos) => {
      this.props.updatedVideos(videos);
      this.props.videoSelected(videos[0]);
    });
  }
  onInputChange(e) {
    const term = e.target.value;
    this.setState({ term });
    this.debounceTermChange(term);
    }
  render() {
    return (
      <div className="search-input-holder">
        <input type="text"
               value={this.state.term}
               onChange={(e) => this.onInputChange(e)}
               placeholder="search"
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ updatedVideos, videoSelected }, dispatch);

export default connect(()=>({}), mapDispatchToProps)(SearchBar);