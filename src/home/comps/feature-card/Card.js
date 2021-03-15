import React from 'react'


import './card.css'

export default class Card extends React.Component{

    render(){
        return(
            <div className="home-card">
                <div className="home-card-icon-cont">
                    <i className={ this.props.iconClass + ' h-card-icon' }></i>
                    <p className="home-card-title">{ this.props.title }</p>
                </div>
                
                <span className="h-card-text">
                    { this.props.text }
                </span>
            </div>
        )
    }

}