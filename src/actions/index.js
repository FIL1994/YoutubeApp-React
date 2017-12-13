/**
 * @author Philip Van Raalte
 * @date 2017-12-11
 */
import axios from 'axios';
import {APIKey} from '../config/keys';
import {GET_SEARCH_RESULTS, GET_VIDEO, GET_CHANNEL, GET_PLAYLISTS, GET_MOST_POPULAR_VIDEOS} from './types';

//API info
const ROOT_URL = "https://www.googleapis.com/youtube/v3";
const SIGNATURE = `?key=${APIKey}`;

export function getSearchResults(query) {
  const maxResults = 20;
  const order = "relevance"; // date, rating, title, relevance, videoCount, viewCount
  const requestURL = `${ROOT_URL}/search${SIGNATURE}&q=${encodeURI(query)}&part=snippet&order=${order}&maxResults=${maxResults}&videoEmbeddable=true&type=video`;
  return dispatch =>
    axios.get(requestURL)
      .then(response => dispatch({
        type: GET_SEARCH_RESULTS,
        payload: response
      }));
}

export function getMostPopularVideos() {
  const maxResults = 15;
  const requestURL = `${ROOT_URL}/videos${SIGNATURE}&chart=mostPopular&part=snippet&maxResults=${maxResults}`;
  return dispatch =>
    axios.get(requestURL)
      .then(response => dispatch({
        type: GET_MOST_POPULAR_VIDEOS,
        payload: response
      }));
}

export function getVideoInfo(id) {
  // part = snippet, statistics, player, topicDetails
  const requestURL = `${ROOT_URL}/videos${SIGNATURE}&id=${id}&part=snippet,statistics`;
  return dispatch =>
    axios.get(requestURL)
      .then(response => dispatch({
        type: GET_VIDEO,
        payload: response
      }));
}

export function getChannel(id) {
  const requestURL = `${ROOT_URL}/channels${SIGNATURE}&id=${id}&part=snippet,statistics`;
  return dispatch =>
    axios.get(requestURL)
      .then(response => dispatch({
        type: GET_CHANNEL,
        payload: response
      }));
}

export function getPlaylists(id) {
  const requestURL = `${ROOT_URL}/playlists${SIGNATURE}&channelId=${id}&part=snippet&maxResults=5`;
  return dispatch => {
    axios.get(requestURL)
      .then(response => {
        let promises = [];

        response.data.items.forEach(({id: pID}) => {
          const playlistsRequestURL = `${ROOT_URL}/playlistItems${SIGNATURE}&playlistId=${pID}&part=snippet&maxResults=8`;
          promises.push(axios.get(playlistsRequestURL));
        });

        Promise.all(promises).then(values =>
          dispatch({
            type: GET_PLAYLISTS,
            payload: values.map((v, index) => {
              return {...v, title: response.data.items[index].snippet.title};
            })
          })
        );
      });
  }
}