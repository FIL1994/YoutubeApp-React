/**
 * @author Philip Van Raalte
 * @date 2017-12-13
 */
import {GET_MOST_POPULAR_VIDEOS} from '../actions/types';

export default function (state = {}, action) {
  switch(action.type) {
    case GET_MOST_POPULAR_VIDEOS:
      return action.payload;
    default:
      return state;
  }
}