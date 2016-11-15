import React from 'react';
import CommentsList from '../CommentsList';
import TextSelection from '../TextSelection';
import Tooltip from  '../Tooltip';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        };
        this.showTextTooltip = this.showTextTooltip.bind(this);
        this.createComment = this.createComment.bind(this);
        this.dismiss = this.dismiss.bind(this);
        this.saveComment = this.saveComment.bind(this);
    }

    dismiss() {
        this.setState({newComment: null});
    }

    showTextTooltip(box, text) {
        if (!box) {
            this.setState({tooltip: false})
        }
        else {
            this.setState({
                tooltip: {
                    show: true,
                    text: text,
                    top: box.top,
                    left: box.left + box.width/2
                }
            });
        }
    }

    componentDidMount() {
        fetch('/api/post/'+this.props.params.postId)
            .then(response => response.json())
            .then(json => this.setState(json));
        this.loadComments();
    }

    loadComments() {
        fetch('/api/comments/'+this.props.params.postId)
            .then(response => response.json())
            .then(json => this.setState({comments: json}));
    }

    createComment() {
        this.setState({
            newComment: {
                postId: this.state._id,
                quote: this.state.tooltip.text
            }
        });
    }

    saveComment(comment) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        fetch("/api/comments/new",
            {
                method: "POST",
                body: JSON.stringify( comment ),
                headers: myHeaders
            })
            .then(res => { return res.json(); })
            .then(data => {
                if (data._id) {
                    this.setState({newComment: null});
                    this.loadComments();
                }
            })
    }
    render() {
        document.title = this.state.title;
        return (
            <div className="post-item">
                <h1>{this.state.title}</h1>

                <TextSelection text={this.state.content} onSelected={this.showTextTooltip}/>

                {this.state.tooltip &&

                <Tooltip {...this.state.tooltip}>
                    <i className="glyphicon glyphicon-comment" onClick={this.createComment}></i>
                </Tooltip>

                }

                <CommentsList postId={this.props.params.postId} comments={this.state.comments} newComment={this.state.newComment} onSave={this.saveComment}
                              onDismiss={this.dismiss}/>

            </div>
        )
    }
}


export default Post;