import React from 'react';

export default ({ video }) => {
  if (!video) {
    return <div>Loading...</div>;
  }
  const videoURL = `https://www.youtube.com/embed/${video.id}`;
  console.log(videoURL);
  return (
    <div>
      <iframe src={videoURL} frameBorder='0' allow='autoplay; encrypted-media' allowFullScreen></iframe>
      <div className='video-detail-desc'>
        <div>{video.title}</div>
        <div>{video.description}</div>
      </div>
    </div>
  );
}