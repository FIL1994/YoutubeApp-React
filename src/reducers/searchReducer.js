/**
 * @author Philip Van Raalte
 * @date 2017-12-11
 */
import { GET_SEARCH_RESULTS } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_SEARCH_RESULTS:
      if (action.payload.data !== undefined) {
        let {
          data: { items, pageInfo },
          status
        } = action.payload;
        return { items, pageInfo, status };
      }
      return action.payload;
    default:
      return state;
  }
}
