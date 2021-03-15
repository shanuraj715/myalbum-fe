import React from 'react'

import ReactLoading from 'react-loading'
import './loading.css'


export class Loading extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div className="loader-ts-cont">
                    <ReactLoading
                        width={ this.props.width > 0 ? this.props.width : 100 }
                        height={ this.props.width > 0 ? this.props.width : 100 }
                        color={ this.props.color ? this.props.color : '#227093'}
                        className="loader-inline-block"
                        type={ this.props.type ? this.props.type : 'spinningBubbles' }
                        delay={ 200 }
                        />
                    <p className="loader-loading-text">{ this.props.text || "Loading..." }</p>
                </div>
            </React.Fragment>
        )
    }
}

export default Loading