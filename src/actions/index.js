/**
 * @author Philip Van Raalte
 * @date 2017-12-11
 */
import axios from 'axios';
import {APIKey} from '../config/keys';
import {GET_SEARCH_RESULTS, GET_VIDEO} from './types';

//API info
const ROOT_URL = "https://www.googleapis.com/youtube/v3";
const SIGNATURE = `?key=${APIKey}`;

export function getSearchResults(query) {
  const maxResults = 20;
  const order = "relevance"; // date, rating, title, relevance, videoCount, viewCount
  const requestURL = `${ROOT_URL}/search${SIGNATURE}&q=${encodeURI(query)}&part=snippet&order=${order}&maxResults=${maxResults}&videoEmbeddable=true&type=video`;
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

export function getVideoInfo(id) {
  const requestURL = `${ROOT_URL}/videos${SIGNATURE}&id=${id}&part=contentDetails,snippet,suggestions`;
  return dispatch => {
    axios.get(requestURL)
      .then(response =>
        dispatch({
          type: GET_VIDEO,
          payload: response
        })
      );
  }
}