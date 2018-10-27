import YTSearch from 'youtube-search';
const key = 'AIzaSyDJ23y4_hQMa39dFM-1yxyT_RWgetg0yXk';

export default (state = [], action) => {
  switch(action.type) {
    case "SEARCH_UPDATED":
      return action.payload;
  }
  return state;
};