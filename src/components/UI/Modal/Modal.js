import React, { Component } from 'react';
import classes from './Modal.css';

class Modal extends Component {

    shouldComponentUpdate (nextProps,nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    componentWillUpdate () {
        console.log("comp will update")
    }

    render () {

        return (
            <div style={{opacity: this.props.show ? '1' : '0'}} className={classes.Modal}>{this.props.children}</div>
        )
    }
};

export default Modal;
