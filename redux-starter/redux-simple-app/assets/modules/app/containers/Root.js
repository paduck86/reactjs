import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import App from './App';
import Home from './Home';
import Widgets from './Widgets';
import Users from './Users';

const store = configureStore();

export default class Root extends Component {
  render() {
      return (
          <Provider store={store}>
              <Router history={browserHistory}>
                  <Route component={App}>
                      <Route path="/" component={Home} />
                      <Route path="/widgets" component={Widgets} />
                      <Route path="/users" component={Users} />
                  </Route>
              </Router>
          </Provider>
      );
  }
}
