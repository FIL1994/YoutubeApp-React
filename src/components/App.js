/**
 * @author Philip Van Raalte
 * @date 2017-12-11
 */
import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import HeaderNav from "./HeaderNav";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Channel from "./pages/Channel";
import MostPopular from "./pages/MostPopular";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div id="site" className="site">
          <HeaderNav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/most_popular" component={MostPopular} />
            <Route path="/video/:id" component={Video} />
            <Route path="/channel/:id" component={Channel} />
            <Redirect to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
