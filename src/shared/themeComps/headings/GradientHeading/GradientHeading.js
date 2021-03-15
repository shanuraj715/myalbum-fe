import React from 'react'

import './gradientheading.css'

export default class GradientHeading extends React.Component{
    render(){
        return(
            <span class="gh-divider gh-gradient" contenteditable>{ this.props.text && this.props.text !== '' ? this.props.text : "props 'text' required" }</span>
        )
    }
}