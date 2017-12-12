/**
 * @author Philip Van Raalte
 * @date 2017-12-11
 */
import {combineReducers} from 'redux';
import searchReducer from './searchReducer';
import videoReducer from './videoReducer';
import channelReducer from './channelReducer';
import playlistsReducer from './playlistsReducer';

export default combineReducers({
  search: searchReducer,
  video: videoReducer,
  channel: channelReducer,
  playlists: playlistsReducer
});