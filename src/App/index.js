import React from 'react';
import './app.less';
import { Router, Route, Link, browserHistory, IndexRoute, hashHistory } from 'react-router';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container">
                <div className="page-header text-center">
                    <h1><Link to="/">My Awesome B-b-b-blog</Link></h1>
                </div>
                <div className="row">
                    <div className="col-sm-8">
                        {this.props.children}
                    </div>
                    <div className="col-sm-4">
                        here can be your Ad
                    </div>
                </div>
            </div>
        );
    }
}

export default App;