import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store/configureStore';

import NavBar from './components/NavBar';
import Landing from './components/Landing';
import AuthPage from './components/AuthPage';
import Settings from './components/Settings';
import About from './components/About';

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={NavBar}>
        <IndexRoute component={Landing} />
        <Route path="/login" component={AuthPage}/>
        <Route path="/settings" component={Settings}/>
        <Route path="/about" component={About}/>
      </Route>
      <Route path="*" component={NavBar}>
        <IndexRoute component={Landing} />
      </Route>
    </Router>
  </Provider>, 
  document.getElementById('app')
);