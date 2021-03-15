import React from 'react'

import './textdivider.css'

export default class TextDivider extends React.Component{
    render(){
        return(
            <span class="text-divider text-divider-line text-divider-one-line" contenteditable>{ this.props.text && this.props.text !== '' ? this.props.text : "props 'text' required" }</span>
        )
    }
}