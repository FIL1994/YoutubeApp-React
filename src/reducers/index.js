/**
 * @author Philip Van Raalte
 * @date 2017-12-11
 */
import {combineReducers} from 'redux';
import searchReducer from './searchReducer';
import videoReducer from './videoReducer';

export default combineReducers({
  // state: (state = {}) => state,
  search: searchReducer,
  video: videoReducer
});