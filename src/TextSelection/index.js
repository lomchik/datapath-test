import React from 'react';


function isDescendant(parent, child) {
    if (!child) return;
    var node = child.parentNode;
    while (node != null) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

class TextSelection extends React.Component {

    constructor() {
        super();
        this.checkSelection = this.checkSelection.bind(this);
        document.addEventListener('click', this.checkSelection);
    }
    checkSelection(e) {
        var selection = window.getSelection();
        if (isDescendant(e.target, selection.baseNode) && selection.toString().length) {
            var oRange = selection.getRangeAt(0);
            this.props.onSelected(oRange.getBoundingClientRect(), oRange.toString());
        }
        else {
            this.props.onSelected(null);
        }
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.checkSelection);
    }
    render() {
        return <p onMouseUp={this.checkSelection}>{this.props.text}</p>
    }
}

export default TextSelection;