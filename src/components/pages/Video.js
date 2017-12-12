/**
 * @author Philip Van Raalte
 * @date 2017-12-12
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Page, EmptyState} from '../SpectreCSS';

import {getVideoInfo} from '../../actions/index';

class Video extends Component {
  componentDidMount() {
    const {id} = this.props.match.params;
    console.log("Video", id);

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
    const {etag, id, player: {embedHtml}, statistics: {dislikeCount, likeCount, viewCount, favoriteCount, commentCount},
      snippet: {
        channelId, channelTitle, description, publishedAt, tags, title
      }} = item;

    console.log("ITEM", item);
    return(
      <div>
        <h1>{title}</h1>
      </div>
    );
  }

  render() {
    console.log(this.props);

    return(
      <Page className="centered text-center">
        {this.renderVideoDetails()}
      </Page>
    )
  }
}

function mapStateToProps(state) {
  return {
    video: state.video
  };
}

export default connect(mapStateToProps, {getVideoInfo})(Video);