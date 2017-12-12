/**
 * @author Philip Van Raalte
 * @date 2017-12-11
 */
import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Home from './pages/Home';
import Video from './pages/Video';

class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <div id="site" className="site">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/video/:id" component={Video}/>
            <Redirect to="/"/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;