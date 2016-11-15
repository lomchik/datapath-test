import React from 'react';
import './tooltip.less';


class Tooltip extends React.Component {
    getOffsetSum(elem) {
        var top=0, left=0
        while(elem) {
            top = top + parseFloat(elem.offsetTop)
            left = left + parseFloat(elem.offsetLeft)
            elem = elem.offsetParent
        }

        return {top: Math.round(top), left: Math.round(left)}
    }
    getRelativeParent(el) {
        var node = el.parentNode;
        while (node) {
            if (window.getComputedStyle(node).position == 'relative') {
                return node
            }
            node = node.parentNode;
        }
        return node;
    }
    componentDidMount() {
        var parent = this.getRelativeParent(this.refs.tooltip);
        if (parent) {
            this.parentOffset = this.getOffsetSum(parent);
        }
    }
    render() {
        var style = {top: this.props.top, left: this.props.left, opacity: this.props.show * 1};
        if (this.parentOffset) {
            style.top -= this.parentOffset.top;
            style.left -= this.parentOffset.left;
        }

        return (
            <div className="tooltip top" style={style} ref="tooltip">
                <div className="tooltip-arrow"></div>
                <div className="tooltip-inner">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Tooltip;