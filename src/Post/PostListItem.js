import React from 'react';
import { Link } from 'react-router';

class PostsListItem extends React.Component {
    render() {
        return (
            <div className="post-item">
                <h1><Link to={`/post/${this.props._id}`}>{this.props.title}</Link></h1>
                <p>{this.props.short}</p>
            </div>
        )
    }
}


export default PostsListItem;