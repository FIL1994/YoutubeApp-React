/**
 * @author Philip Van Raalte
 * @date 2017-12-12
 */
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Page, EmptyState, Divider} from '../SpectreCSS';

import {getVideoInfo} from '../../actions/index';

class Video extends Component {
  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.getVideoInfo(id);
  }

  renderVideoDetails() {
    const {video: {items}} = this.props;
    if(items === undefined) {
      return <EmptyState title="Loading video details"/>;
    }
    if(items.length === 0) {
      return <EmptyState title="No video found"/>;
    }
    const item = items[0];
    const {player: {embedHtml}, statistics: {dislikeCount, likeCount, viewCount},
      snippet: {
        channelId, channelTitle, description, publishedAt, tags, title
      }} = item;
    const publishedDate = (new Date(publishedAt)).toLocaleString();
    return(
      <Fragment>
        <h3>{title}</h3>
        <div dangerouslySetInnerHTML={{__html: embedHtml}}/>
        <div className="col-7 centered">
          <span className="float-left">{viewCount} views</span>
          <span className="float-right">{likeCount} likes {dislikeCount} dislikes</span>
          <br/>
          {tags.map(t => <span key={t} className="chip">{t}</span>)}
          <br/>
        </div>
        <Divider/>
        <div>
          <div>
            <span className="h6">
              <Link to={`/channel/${channelId}`}>
                {channelTitle}
              </Link>
            </span>
            {` - `}
            <span className="text-gray">
              {publishedDate}
            </span>
          </div>
          <Divider/>
          <p>{description}</p>
        </div>
      </Fragment>
    );
  }

  render() {
    return(
      <Page className="centered text-center">
        {this.renderVideoDetails()}
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    video: state.video
  };
}

export default connect(mapStateToProps, {getVideoInfo})(Video);