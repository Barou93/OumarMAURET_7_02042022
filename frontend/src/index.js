import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './style/index.scss';
import { Provider } from 'react-redux';
import rootReducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { getUsers } from './actions/users.actions';
import { getPosts } from './actions/post.actions';


//Devtools kits
import { composeWithDevTools } from "redux-devtools-extension";


const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk))
)
store.dispatch(getUsers());
store.dispatch(getPosts());

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <React.StrictMode>

    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>
)
