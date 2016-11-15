import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute, hashHistory } from 'react-router';
import App from './App';
import {Post, PostsList} from './Post';

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={PostsList} />
            <Route path="post/:postId" component={Post}/>
        </Route>
    </Router>
), document.getElementById('root'))