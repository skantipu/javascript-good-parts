import React from 'react';
import VideoListItem from './video_list_item';

export default (props) => {
  const videoItemsList = props.videos.map(video => {
    return <VideoListItem video={video}/>
  });
  return (
    <ul>
      {videoItemsList}
    </ul>
  );
}