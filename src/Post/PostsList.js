import React from 'react';
import PostListItem from './PostListItem';
import 'whatwg-fetch';

class PostsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }
    componentDidMount() {
        fetch('/api/posts')
            .then(response => response.json())
            .then(json => this.setState({posts: json}));
    }
    render() {
        return (
            <div>
                {this.state.posts.map(post => <PostListItem key={'post' + post._id} {...post}/>)}
            </div>
        );
    }
}

export default PostsList;