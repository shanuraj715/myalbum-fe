import React from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import PropagateLoader from 'react-spinners/PropagateLoader'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component'
import 'animate.css'

import './albumlink.css'

export class AlbumLink extends React.Component{

    state = {
        isGettingLink: false,
        link: 'https://projects.techfacts007.in/nhpc'
    }

    componentDidMount(){
        
    }

    disableRightClick = event => {
        console.log(navigator.clipboard.writeText("Shanu"))
        event.preventDefault()
    }

    copyToClipboard = () => {
        let text_to_copy = document.getElementById('gl-link-text').innerHTML
        navigator.clipboard.writeText(text_to_copy).then( this.notification( 'Copied', 'Access link successfully copied', 'success' ))
    }

    hide = () => {
        this.props.open()
        
    }

        

    render(){
        
        
        return(
            <OutsideClickHandler onOutsideClick={ () => {
                // console.log("Get link outside clicked")
                
                this.hide()
            }} >
                <div className="app-notification-container">
                    <ReactNotification />
                </div>
                <div className="get-album-link-container" onContextMenu={ this.disableRightClick }>
					<div className="get-album-link-box">
						<p className="get-al-title"><i className="far fa-link get-al-pop-hic"></i>Get Access Link</p>
                        { this.state.isGettingLink ?
                            <div className="get-al-link-area">
                                {/* <i className="far fa-spinner fa-spin get-link-spinner"></i> */}
                                <span className="gl-loader"><PropagateLoader size='8' color="teal" /></span>
                                
                                <span class="get-link-getting">
                                    Getting public access link for this album
                                </span>
                            </div>
                        : null }
                        { this.state.link !== '' && !this.state.isGettingLink ?
                            <React.Fragment>
                                <p className="gl-link-warning">
                                    <i className="fas fa-exclamation gl-link-warning-icon"></i>
                                    Because you are generating a access link for this album. The privacy settings will change to unlisted.
                                </p>
                                <div className="gl-link-block">
                                    <span className="gl-link-text" id="gl-link-text">{this.state.link}</span>
                                    <button className="gl-link-copy-btn" title="Copy Link" onClick={ this.copyToClipboard }>
                                        <i className="far fa-copy gl-link-copy-btn-icon"></i>
                                    </button>
                                </div>
                            </React.Fragment>
                        : null }
                        <div className="get-link-done-btn">
                            <button className="get-link-done" onClick={ this.hide }>Done</button>
                        </div>
					</div>
				</div>
            </OutsideClickHandler>
        )
        
    }

    notification = ( title, text, type ) => {
        text = text === '' ? 'text' : text
        type = type === '' ? 'success' : type
        store.addNotification({
            title: title,
            message: text,
            type: type,
            container: 'top-right',
            insert: 'top',
            animationIn: ["animate__animated animate__fadeInRight"],
            animationOut: ["animate__animated animate__fadeOut"],
            dismiss: {
                duration: 4000
            }
        })
    }
}

export default AlbumLink