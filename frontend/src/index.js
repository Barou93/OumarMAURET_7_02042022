import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './style/index.scss';
import { Provider } from 'react-redux';
import rootReducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')

)




