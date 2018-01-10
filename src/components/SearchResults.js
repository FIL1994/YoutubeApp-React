/**
 * @author Philip Van Raalte
 * @date 2017-12-11
 */
import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {EmptyState} from './SpectreCSS';
import _ from 'lodash';

import {formatDate} from '../util';

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {errorCount: 0};
  }

  renderItems(items) {
    if(items.length === 0) {
      return <EmptyState title="No results found"/>;
    }

    return (
      <ul className="text-left col-10 centered">
        {
          items.map(({id: {videoId}, snippet: {
            title, description, channelId, channelTitle, publishedAt, thumbnails: {
              medium: {url, width, height}, 'default': small
            }
          }}) =>
            <li key={videoId} className="tile">
              <div className="tile-icon">
                <div className="hide-md">
                  <Link to={`/video/${videoId}`}>
                    <img src={url} width={width} height={height} alt={title}/>
                  </Link>
                </div>
                <div className="show-md">
                  <Link to={`/video/${videoId}`}>
                    <img src={small.url} width={small.width} height={small.height} alt={title}/>
                  </Link>
                </div>
              </div>
              <div className="tile-content">
                <div className="tile-title h6">
                  <Link to={`/video/${videoId}`}>
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
                    <span>- {formatDate(publishedAt)}</span>
                  </div>
                  <br/>
                  <p>{description}</p>
                </div>
              </div>
            </li>
          )
        }
      </ul>
    );
  }

  render() {
    const {items} = this.props;

    return(
      <Fragment>
        {
          !_.isArray(items)
            ?
              ''
            :
            <Fragment>
              <h5>Search Results</h5>
              {this.renderItems(items)}
              </Fragment>
        }
      </Fragment>
    );
  }
}

export default SearchResults;