/**
 * Home.js
 *
 * @author Philip Van Raalte
 * @date 2017-12-11
 */
import React, {Component} from 'react';
import {Divider, Page} from '../SpectreCSS';
import {APIKey} from "../../config/keys";

class Home extends Component {
  sendRequest() {
    const channelID = "UCZrxXp1reP8E353rZsB3jaA";
    const results = 20;
    const url = `https://www.googleapis.com/youtube/v3/search?key=${APIKey}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${results}`;

    const query = "search query";
    const searchURL = `https://www.googleapis.com/youtube/v3/search?key=${APIKey}&q=${query}&part=snippet,id&order=date&maxResults=${results}`;
  }

  render() {
    return(
      <Page className="centered text-center">
        <h1>YouTube App React</h1>
        <Divider size={10}/>
      </Page>
    );
  }
}

export default Home;