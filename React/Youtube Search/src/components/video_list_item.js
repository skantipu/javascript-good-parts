import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const snippet = this.props.video.snippet;
    return (
      <li>
        <div>
          <img src={snippet.thumbnails.medium.url} height='150px'/>
        </div>
        <div className='video-title'>
          {snippet.title}
        </div>
      </li>
    );
  }
}