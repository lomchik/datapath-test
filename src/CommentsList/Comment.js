import React from 'react';
import './comment.less';

class Comment extends React.Component {
    constructor() {
        super();
        this.saveHandler = this.saveHandler.bind(this);
        this.state = {}
    }
    saveHandler(e) {
        this.props.onSave({
            postId: this.props.postId,
            quote: this.props.quote,
            text: this.refs.text.value
        });
    }
    render() {

        return (
            <div className="row comment">
                <div className="col-sm-2">
                    <div className="thumbnail">
                        <img className="img-responsive user-photo" src="img/avatar_2x.png"/>
                    </div>
                </div>

                <div className="col-sm-10">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                                <strong>myusername</strong>
                        </div>
                    <div className="panel-body">
                        <blockquote>{this.props.quote}</blockquote>
                        {!this.props.editable
                            ? <div>{this.props.text}</div>
                            : <textarea ref="text" name="body" autoFocus></textarea>
                        }
                    </div>
                    {this.props.editable &&
                    <div className="panel-footer clearfix">
                        <button className="btn btn-sm btn-primary pull-right" onClick={this.saveHandler}>Save</button>
                        <button className="btn btn-sm btn-link pull-right" onClick={this.props.onDismiss}>Dismiss</button>
                    </div>
                    }
                </div>
            </div>
        </div>
        );
    }
}

export default Comment;
