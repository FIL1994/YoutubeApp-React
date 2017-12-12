/**
 * @author Philip Van Raalte
 * @date 2017-12-11
 */
import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {EmptyState} from './SpectreCSS';
import _ from 'lodash';

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {errorCount: 0};
  }

  renderItems() {
    const {items} = this.props;

    if(!_.isArray(items)) {
      return;
    }

    if(items.length === 0) {
      return <EmptyState title="No results found"/>;
    }

    // console.log(items);

    return (
      <ul className="text-left">
        {
          items.map(({etag, id: {videoId}, snippet: {
            title, description, channelId, channelTitle, publishedAt, thumbnails: {'default': standard, high, medium}
          }}) =>
            <li key={etag} className="tile">
              <div className="tile-icon">
                <Link to={`/video/${videoId}`}>
                  <img src={medium.url} width={medium.width} height={medium.height}/>
                </Link>
              </div>
              <div className="tile-content" href={`https://www.youtube.com/watch?v=${videoId}`}>
                <div className="tile-title h6">{title}</div>
                <div className="tile-subtitle">
                  <div className="text-gray">
                    <span>
                      <Link to={`/channel/${channelId}`}>
                        {channelTitle}
                      </Link>
                    </span>
                    <span>- {(new Date(publishedAt)).toLocaleDateString()}</span>
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
    return(
      <Fragment>
        <h5>Search Results</h5>
        {this.renderItems()}
      </Fragment>
    );
  }
}

export default SearchResults;