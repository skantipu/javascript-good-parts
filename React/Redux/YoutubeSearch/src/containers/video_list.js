import React from 'react';
import VideoListItem from '../components/video_list_item';
import {videoSelected} from "../actions";
import {bindActionCreators} from "redux";
import { connect } from "react-redux";

const VideoList = (props) => {
  const videoItemsList = props.videos.map((video, i) =>
    <VideoListItem video={video} key={i} onVideoTap={() => props.videoSelected(video)}/> );
  return (
    <ul>
      {videoItemsList}
    </ul>
  );
}

const mapStateToProps = (state) => ({
  videos: state.videos
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ videoSelected }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);