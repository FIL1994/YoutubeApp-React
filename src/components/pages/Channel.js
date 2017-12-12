/**
 * @author Philip Van Raalte
 * @date 2017-12-12
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Page} from '../SpectreCSS';

import {getChannel} from '../../actions/index';

class Channel extends Component {
  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.getChannel(id);
  }

  render() {
    console.log("Channel", this.props.channel);

    return(
      <Page className="centered text-center">
        <h1>Channel</h1>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    channel: state.channel
  };
}

export default connect(mapStateToProps, {getChannel})(Channel);