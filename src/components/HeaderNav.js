/**
 * @author Philip Van Raalte
 * @date 2017-12-13
 */
import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';

class HeaderNav extends Component {
  isLinkActive(match) {
    if(!match) {
      return false;
    }
    return !(match.url === "/" && !match.isExact);
  }

  render() {
    return(
      <header className="navbar bg-dark">
        <section className="navbar-section">
          <h5 className="pt-2 px-2">YouTube App - React</h5>
        </section>
        <section className="navbar-section">
          <NavLink to="/" className="btn btn-lg" activeClassName="btn-primary" isActive={this.isLinkActive}>
            Home
          </NavLink>
          <NavLink to="/most_popular" className="btn btn-lg" activeClassName="btn-primary" isActive={this.isLinkActive}>
            Most Popular
          </NavLink>
        </section>
      </header>
    );
  }
}

export default withRouter(HeaderNav);