import { combineReducers } from 'redux';
import VideoListReducer from './video_list';
import ActiveVideoReducer from './active_video';

const rootReducer = combineReducers({
  videos: VideoListReducer,
  activeVideo: ActiveVideoReducer
});

export default rootReducer;