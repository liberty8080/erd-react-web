import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux"
import rootReducer from "./reducers";
import logger from "redux-logger";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import routers from "./routers";
import {BrowserRouter as Router} from "react-router-dom";

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk, logger)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            {/*<NavigationBar/>*/}
            {routers}
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
