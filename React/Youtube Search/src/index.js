import React from 'react'; // needed as when we use JSX, it gets turned to something like React.createElement(...) during transpilation of JSX to JS, generating HTML
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import '../style/style.scss';

// YouTube API key - AIzaSyDJ23y4_hQMa39dFM-1yxyT_RWgetg0yXk
const App = () => {
  return (
    <div className="flex-container">
      <div className="search-bar">
        <SearchBar />
      </div>
      <div className="flex-video-container">
        <div className="video-detail">hi</div>
        <div className="video-list">hi</div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('.container'));