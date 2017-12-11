/**
 * @author Philip Van Raalte
 * @date 2017-12-11
 */
import axios from 'axios';
import {APIKey} from '../config/keys';
import {GET_SEARCH_RESULTS} from './types';

//API info
const ROOT_URL = "https://www.googleapis.com/youtube/v3";
const SIGNATURE = `?key=${APIKey}`;

export function getSearchResults(query) {
  const maxResults = 20;
  const requestURL = `${ROOT_URL}/search${SIGNATURE}&q=${encodeURI(query)}&part=snippet,id&order=date&maxResults=${maxResults}`;
  return dispatch => {
    axios.get(requestURL)
      .then(response =>
        dispatch({
          type: GET_SEARCH_RESULTS,
          payload: response
        })
      );
  };

  // return {
  //   type: GET_SEARCH_RESULTS,
  //   payload: request
  // };
}