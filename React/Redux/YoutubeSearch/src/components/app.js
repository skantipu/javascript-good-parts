import React, { Component } from 'react';
import VideoList from '../containers/video_list';
import SearchBar from '../containers/search_bar';
import VideoDetail from '../containers/video_detail';
import './../../style/style.scss';

export default class App extends Component {
  render() {
    return (
      <div className="flex-container">
        <div className="search-bar">
          <SearchBar />
        </div>
        <div className="flex-video-container">
          <div className="video-detail">
            <VideoDetail />
          </div>
          <div className="video-list">
            <VideoList />
          </div>
        </div>
      </div>
    );
  }
};