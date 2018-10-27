import YTSearch from 'youtube-search';
const key = 'AIzaSyDJ23y4_hQMa39dFM-1yxyT_RWgetg0yXk';

export const searchUpdated = (term) => {
  YTSearch(term, { maxResults: 10, key }, (err, videos) => {
    return {
      type: 'SEARCH_UPDATED',
      payload: videos
    };
  });
};

export const videoSelected = (video) => ({
  type: 'VIDEO_SELECTED',
  payload: video
});