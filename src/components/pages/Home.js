/**
 * Home.js
 *
 * @author Philip Van Raalte
 * @date 2017-12-11
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {getSearchResults} from '../../actions/index';
import {Divider, Page} from '../SpectreCSS';
import SearchResults from '../SearchResults';

class Home extends Component {
  constructor(props) {
    super(props);

    this.onSearchQueryChange = this.onSearchQueryChange.bind(this);
    this.getSearchResults = () => {};

    this.state = {searchQuery: ''};
  }

  componentDidMount() {
    this.getSearchResults = _.debounce(this.props.getSearchResults, 230);
  }

  onSearchQueryChange(event) {
    const searchQuery = event.target.value;
    this.setState({searchQuery});
    this.getSearchResults(searchQuery);
  }

  render() {
    const {searchQuery} = this.state;
    const {search} = this.props;
    let items = search === undefined ? null : search.items;

    return(
      <Page className="centered text-center">
        <form>
          <div className="form-group">
            <label className="form-label h3" htmlFor="input-search">Search for YouTube Videos:</label>
            <input className="form-input" type="text" id="input-search" placeholder="Search" value={searchQuery}
               onChange={this.onSearchQueryChange}
            />
          </div>
        </form>
        <Divider/>
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