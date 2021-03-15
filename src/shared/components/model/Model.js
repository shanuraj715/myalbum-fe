import React from 'react'

import './model.css'
// import OutsideClickHandler from 'react-outside-click-handler'

export default class Model extends React.Component{
    hide = () => {
        this.props.hideHandler()
    }
    render(){
        return(
            <div className="app-model-container notextselect">
                {/* <OutsideClickHandler onOutsideClick={ () => {
                    this.hide()
                }}> */}
                    <div className="app-model">
                        <p className="app-model-head">
                            <span className="app-model-head-text">{ this.props.title || "Model Title props 'title'"}</span>
                            <span className="app-model-close-icon" onClick={ this.hide }>
                                <i className="far fa-times"></i>
                            </span>
                        </p>
                        <div className="app-model-body">
                            <p className="app-model-message">
                                { this.props.message || "Model Message props 'message'"}
                            </p>
                        </div>
                        <div className="app-model-btn-container">
                            { this.props.ok ? <button className="app-model-btn app-model-btn-ok" onClick={ this.props.ok }>Ok</button> : null }
                            { this.props.cancel ? <button className="app-model-btn app-model-btn-close" onClick={ this.props.cancel }>Cancel</button> : null }
                            
                            
                        </div>
                    </div>
                {/* </OutsideClickHandler> */}
            </div>
        )
    }
}