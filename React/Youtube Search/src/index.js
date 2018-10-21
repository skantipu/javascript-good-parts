import React, { Component } from 'react'; // needed as when we use JSX, it gets turned to something like React.createElement(...) during transpilation of JSX to JS, generating HTML
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import '../style/style.scss';

const key = 'AIzaSyDJ23y4_hQMa39dFM-1yxyT_RWgetg0yXk';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { videos: [] };
    YTSearch({ key, term: 'yoga'}, videos => {
      this.setState({ videos });
    });
  }
  render() {
    return (
      <div className="flex-container">
        <div className="search-bar">
          <SearchBar />
        </div>
        <div className="flex-video-container">
          <div className="video-detail">
            <VideoList videos={this.state.videos}/>
          </div>
          <div className="video-list">hi</div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));