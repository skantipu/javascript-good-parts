import React, { Component } from 'react'; // needed as when we use JSX, it gets turned to something like React.createElement(...) during transpilation of JSX to JS, generating HTML
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash';
import '../style/style.scss';

const key = 'AIzaSyDJ23y4_hQMa39dFM-1yxyT_RWgetg0yXk';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { videos: [], selectedVideo: null, term: 'cat' };
    this.onTermChange(this.state.term);
  }
  onTermChange(term) {
    YTSearch(term, { maxResults: 10, key }, (err, videos) => {
      this.setState({ videos, selectedVideo: videos[0] });
    });
  }
  render() {
    const search = _.debounce(term => { this.onTermChange(term)}, 500);
    return (
      <div className="flex-container">
        <div className="search-bar">
          <SearchBar onSearchTermChange={ search }/>
        </div>
        <div className="flex-video-container">
          <div className="video-detail">
            <VideoDetail video={this.state.selectedVideo} />
          </div>
          <div className="video-list">
            <VideoList videos={this.state.videos} onVideoSelect={ selectedVideo => this.setState({selectedVideo}) } />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));