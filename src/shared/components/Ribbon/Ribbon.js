import React from 'react'

import './ribbon.css'

export default class Ribbon extends React.Component{
    render(){
        return(
            <span class="ribbon-divider ribbon-donotcross" contenteditable>{ this.props.text && this.props.text !== '' ? this.props.text : "props 'text' required" }</span>
        )
    }
}