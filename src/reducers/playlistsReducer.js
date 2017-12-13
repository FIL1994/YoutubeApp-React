/**
 * @author Philip Van Raalte
 * @date 2017-12-12
 */
import {GET_PLAYLISTS} from '../actions/types';

export default function (state = {}, action) {
  switch(action.type) {
    case GET_PLAYLISTS:
      let payloadData = action.payload.map(({ title, status, data: {items, etag} }) => {
        return {title, etag, items, status};
      });

      return payloadData;
    default:
      return state;
  }
}