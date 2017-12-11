/**
 * @author Philip Van Raalte
 * @date 2017-12-11
 */
import _ from 'lodash';
import {GET_SEARCH_RESULTS} from '../actions/types';

export default function (state = {}, action) {
  switch(action.type) {
    case GET_SEARCH_RESULTS:
      if(!_.isEmpty(action.payload.data)) {
        let {data, status} = action.payload;
        return {..._.pick(data, ['items', 'pageInfo']), status};
      }
      return action.payload;
    default:
      return state;
  }
}