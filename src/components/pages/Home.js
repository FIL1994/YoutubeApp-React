/**
 * Home.js
 *
 * @author Philip Van Raalte
 * @date 2017-12-11
 */
import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';

import {getSearchResults} from '../../actions/index';
import {Divider, Page} from '../SpectreCSS';
import SearchResults from '../SearchResults';

class Home extends Component {
  componentDidMount() {
    this.props.getSearchResults("search one");
  }

  render() {
    const {search} = this.props;
    let items = search === undefined ? null : search.items;

    return(
      <Page className="centered text-center">
        <h1>YouTube App React</h1>
        <Divider size={10}/>
        <SearchResults items={items}/>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    search: state.search
  };
}

export default connect(mapStateToProps, {getSearchResults})(Home);