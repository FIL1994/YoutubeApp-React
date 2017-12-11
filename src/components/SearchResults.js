/**
 * @author Philip Van Raalte
 * @date 2017-12-11
 */
import React, {Component, Fragment} from 'react';
import _ from 'lodash';

class SearchResults extends Component {
  renderItems() {
    const {items} = this.props;
    if(_.isEmpty(items)) {
      return;
    }
    console.log(items);
    return items.map(({etag, snippet: {title}}) => (
      <div key={etag}>{title}</div>
    ));
  }

  render() {
    return(
      <Fragment>
        <h5>Search Results</h5>
        <ul>
          {this.renderItems()}
        </ul>
      </Fragment>
    );
  }
}

export default SearchResults;