/**
 * @author Philip Van Raalte
 * @date 2017-12-13
 */
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Page, EmptyState, Loading, Divider} from '../SpectreCSS';
import _ from 'lodash';

import {getMostPopularVideos} from '../../actions/index';

class MostPopular extends Component {
  componentDidMount() {
    this.props.getMostPopularVideos();
  }

  renderItems(items) {
    return(
      <ul className="text-left col-10 centered">
        {
          items.map(({id, snippet: {
            title, description, channelId, channelTitle, publishedAt, thumbnails: {
              medium: {url, width, height}
            }
          }}) =>
          <li key={id} className="tile">
            <div className="tile-icon">
              <Link to={`/video/${id}`}>
                <img src={url}/>
              </Link>
            </div>
            <div className="tile-content">
              <div className="tile-title h6">
                <Link to={`/video/${id}`}>
                  {title}
                </Link>
              </div>
              <div className="tile-subtitle">
                <div className="text-gray">
                  <span>
                    <Link to={`/channel/${channelId}`}>
                      {channelTitle}
                    </Link>
                  </span>
                  <span>- {(new Date(publishedAt)).toLocaleString()}</span>
                </div>
                <br/>
                <p>{_.truncate(description, {length: 350})}</p>
              </div>
            </div>
          </li>
          )
        }
      </ul>
    );
  }

  render() {
    console.log("MOST POPULAR", this.props.mostPopular);
    const {items} = this.props.mostPopular;

    return(
      <Page className="centered text-center">
        <h3>Most Popular</h3>
        <Divider/>
        {
          !_.isArray(items)
          ?
            <Loading large/>
          :
            this.renderItems(items)
        }
      </Page>
    )
  }
}

function mapStateToProps(state) {
  return {
    mostPopular: state.mostPopular
  };
}

export default connect(mapStateToProps, {getMostPopularVideos})(MostPopular);