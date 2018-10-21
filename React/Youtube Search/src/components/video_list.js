import React from 'react';
import VideoListItem from './video_list_item';

export default (props) => {
  const videoItemsList = props.videos.map((video, i) => {
    return <VideoListItem video={video} key={i}/>
  });
  return (
    <ul>
      {videoItemsList}
    </ul>
  );
}