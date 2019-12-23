require('./bootstrap');
require('./style.css');
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import Router from './Router/index';

const store = createStore(rootReducer, applyMiddleware(thunk));

render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById('example')
);