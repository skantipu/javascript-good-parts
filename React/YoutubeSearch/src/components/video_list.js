import React from 'react';
import VideoListItem from './video_list_item';

export default ({ videos, onVideoSelect: onVideoClick }) => {
  const videoItemsList = videos.map((video, i) =>
    <VideoListItem video={video} key={i} onVideoTap={onVideoClick}/> );
  return (
    <ul>
      {videoItemsList}
    </ul>
  );
}