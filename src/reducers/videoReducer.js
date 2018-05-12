/**
 * @author Philip Van Raalte
 * @date 2017-12-12
 */
import _ from "lodash";
import { GET_VIDEO } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_VIDEO:
      if (!_.isEmpty(action.payload.data)) {
        let {
          data: { items },
          status
        } = action.payload;
        return { items, status };
      }
      return action.payload;
    default:
      return state;
  }
}
