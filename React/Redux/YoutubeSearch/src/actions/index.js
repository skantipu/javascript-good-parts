export const updatedVideos = (videos) => ({
  type: 'VIDEOS_UPDATED',
  payload: videos
});

export const videoSelected = (video) => ({
  type: 'VIDEO_SELECTED',
  payload: video
});