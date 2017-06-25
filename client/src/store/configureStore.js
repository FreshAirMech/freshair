import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import mySaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  rootReducer, 
  applyMiddleware(
    sagaMiddleware,
    thunkMiddleware,
    routerMiddleware(browserHistory), 
    // createLogger()
  )
);

sagaMiddleware.run(mySaga);



