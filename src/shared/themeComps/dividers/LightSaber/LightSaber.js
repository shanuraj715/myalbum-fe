import React from 'react'

import './lightsaber.css'

export default class LightSaber extends React.Component{
    render(){
        return(
            <span class="light-saber-divider light-saber-line light-saber-glow" contenteditable>{ this.props.text && this.props.text !== '' ? this.props.text : "props 'text' required" }</span>
        )
    }
}