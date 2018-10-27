import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li onClick={() => this.props.onVideoTap(this.props.video)}>
        <div>
          <img src={this.props.video.thumbnails.medium.url} height='150px'/>
        </div>
        <div className='video-title'>
          {this.props.video.title}
        </div>
      </li>
    );
  }
}

