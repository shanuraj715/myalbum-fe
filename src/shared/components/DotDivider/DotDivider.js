import React from 'react'

import './dotdivider.css'

export default class DotDivider extends React.Component{
    render(){
        return(
            <div className="dot-div-cont">
                <div className="divider div-transparent div-dot"></div>
            </div>
        )
    }
}