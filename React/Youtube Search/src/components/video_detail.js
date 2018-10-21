import React from 'react';

export default ({ video }) => {
  if (video) {
    const videoURL = `https://www.youtube.com/embed/${video.id.videoId}`;
    console.log(videoURL);
    return (
      <div>
        <iframe src={videoURL} frameBorder='0' allow='autoplay; encrypted-media' allowFullScreen></iframe>
        <div className='video-detail-desc'>
          <div>{video.snippet.title}</div>
          <div>{video.snippet.description}</div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}