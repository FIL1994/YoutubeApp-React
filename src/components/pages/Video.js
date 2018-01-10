/**
 * @author Philip Van Raalte
 * @date 2017-12-12
 */
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Page, EmptyState, Divider, Button} from '../SpectreCSS';
import ResponsiveIFrame from '../ResponsiveIFrame';
import _ from 'lodash';

import {getVideoInfo} from '../../actions/index';
import {formatNum} from '../../util';

class Video extends Component {
  constructor(props) {
    super(props);

    this.state = {showMore: false};
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.getVideoInfo(id);
  }

  renderVideoDetails() {
    const {video: {items}} = this.props;
    const {showMore} = this.state;

    if(items === undefined) {
      return <EmptyState title="Loading video details"/>;
    }
    if(items.length === 0) {
      return <EmptyState title="No video found"/>;
    }
    const item = items[0];
    const {
      id,
      statistics: {dislikeCount, likeCount, viewCount},
      snippet: {
        channelId, channelTitle, description, publishedAt, tags, title
      }
    } = item;
    const publishedDate = (new Date(publishedAt)).toLocaleString();

    return(
      <Fragment>
        <h3>{title}</h3>
        <div className="col-8 col-sm-12 centered">
          <ResponsiveIFrame src={`https://www.youtube.com/embed/${id}`}/>
        </div>
        <div className="col-7 col-sm-12 centered">
          <span className="float-left">{formatNum(viewCount)} views</span>
          <span className="float-right">{formatNum(likeCount)} likes | {formatNum(dislikeCount)} dislikes</span>
          {
            tags === undefined
              ?
                ''
              :
              <Fragment>
                <br/>
                {_.take(tags, 10).map(t => <span key={t} className="chip">{t}</span>)}
              </Fragment>
          }
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
          <p>
            {showMore ? description : _.truncate(description, {length: 350})}
            {
              description.length < 350 ? '' :
                <Fragment>
                  <br/>
                  <a onClick={() => this.setState({showMore: !showMore})}>
                  {showMore ? 'Show Less' : 'Show More'}
                  </a>
                </Fragment>
            }
          </p>
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