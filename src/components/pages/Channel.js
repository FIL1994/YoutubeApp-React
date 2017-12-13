/**
 * @author Philip Van Raalte
 * @date 2017-12-12
 */
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Page, EmptyState, Loading, Divider} from '../SpectreCSS';
import _ from 'lodash';

import VideoCarousel from '../VideoCarousel';
import {getChannel, getPlaylists} from '../../actions/index';

class Channel extends Component {
  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.getChannel(id);
    this.props.getPlaylists(id);
  }

  renderChannelDetails() {
    const {channel: {items}} = this.props;
    if(items === undefined) {
      return <Loading large/>;
    }
    if(items.length === 0) {
      return <EmptyState title="No channel found"/>;
    }
    const item = items[0];
    const {
      snippet: { title, description, thumbnails: {
        high: {url, width, height}
      }},
      statistics: {subscriberCount, videoCount, viewCount}
    } = item;
    return(
      <Fragment>
        <h3>{title}</h3>
        <img src={url} width={width} height={height} alt={title}/>
        <Divider/>
        <p>{description}</p>
        <Divider/>
        {this.renderPlaylists()}
      </Fragment>
    );
  }

  renderPlaylists() {
    const {playlists} = this.props;
    if(_.isEmpty(playlists)) {
      return;
    }
    if(playlists.length === 0) {
      return <EmptyState title="No playlists found"/>;
    }
    return(
      <Fragment>
        <h4>Playlists</h4>
        {
          playlists.map(({etag, items, title}) => (
            <div className="col-11 centered" key={etag}>
              <VideoCarousel title={title} carouselID={title.replace(/\s+/g, "")} items={items}/>
              <Divider/>
            </div>
            )
          )
        }
      </Fragment>
    );
  }

  render() {
    return(
      <Page className="centered text-center">
        {this.renderChannelDetails()}
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    channel: state.channel,
    playlists: state.playlists
  };
}

export default connect(mapStateToProps, {getChannel, getPlaylists})(Channel);