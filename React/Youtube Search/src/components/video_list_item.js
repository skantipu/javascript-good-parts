import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const snippet = this.props.video.snippet;
    return (
      <li onClick={() => this.props.onVideoTap(this.props.video)}>
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

// you can make this a functional component