import React from 'react';
import { connect } from "react-redux";

const VideoDetail = (props) => {
  const video = props.activeVideo;
  if (!video) {
    return <div>Loading...</div>;
  }
  const videoURL = `https://www.youtube.com/embed/${video.id}`;
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

const mapStateToProps = (state) => ({
  activeVideo: state.activeVideo
});

export default connect(mapStateToProps)(VideoDetail);