/**
 * @author Philip Van Raalte
 * @date 2017-12-11
 */
import React, {Component, Fragment} from 'react';
import _ from 'lodash';

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {errorCount: 0};
    // this.initOwlCarousel = _.debounce(this.initOwlCarousel, 100);
  }

  destroyCarousel() {
    try {
      $(`#${this.props.carouselID}`).owlCarousel('destroy');
    } catch(e){}
  }

  initOwlCarousel() {
    $(`#${this.props.carouselID}`).owlCarousel({
      items:1,
      merge:true,
      loop:true,
      margin:10,
      video:true,
      nav: true,
      lazyLoad:true,
      center:true,
      responsive:{
        480:{
          items: 2
        },
        640:{
          items: 4
        }
      }
    });
  }

  componentDidCatch(error, info) {
    // console.log(error, info);
    console.log("Error!");
    this.destroyCarousel();
    this.setState({errorCount: this.state.errorCount + 1});
    setTimeout(this.initOwlCarousel, 25);
  }

  componentWillUpdate(nextProps, nextState) {

    if(!_.isEmpty(this.props.items) && !_.isEmpty(nextProps.items)) {
      const filterLength = this.props.items.filter(i => !nextProps.items.find(nextI => i.etag === nextI.etag)).length;

      if(filterLength === nextProps.items.length) {
        this.destroyCarousel();
      }
    } else {
      this.destroyCarousel();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.initOwlCarousel();
  }

  renderItems() {
    const {items, carouselID} = this.props;

    if(!_.isArray(items)) {
      return;
    }

    if(items.length === 0) {
      return <div>No results found</div>;
    }

    // console.log(items);

    return (
      <div id={carouselID} className="owl-carousel owl-theme">
        {
          items.map(({etag, snippet: {title}, id: {videoId}}) =>
            <div key={etag} className="item-video" data-merge="2">
              <a className="owl-video" href={`https://www.youtube.com/watch?v=${videoId}`}/>
            </div>
          )
        }
      </div>
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