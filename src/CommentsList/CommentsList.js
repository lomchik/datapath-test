import React from 'react';
import Comment from './Comment';

class CommentsList extends React.Component {

    constructor() {
        super();
    }

    render() {
        var CommentsNodes = this.props.comments.map(comment => <Comment  key={'comment' + comment._id} {...comment}/>);

        return <div className="row">
            <hr/>
            {CommentsNodes}
            {this.props.newComment &&
            <Comment key="commentNew" onDismiss={this.props.onDismiss} onSave={this.props.onSave}
                     editable="true" {...this.props.newComment}/>}
        </div>;
    }
}

export default CommentsList;