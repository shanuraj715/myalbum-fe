import React from 'react'
import OutsideClickHandler from 'react-outside-click-handler'

import c from '../../../config.json'
/* react notification */
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

/* loader */
import FadeLoader from 'react-spinners/FadeLoader'

import { isLength } from 'validator'

import './albumRenamePopup.css'

export class AlbumRenamePopup extends React.Component{
    state = {
        isVisible: true,
        doingRenameProcess: false
    }

    hide = () => {
        this.setState({ isVisible: false}, () => {
            this.props.rename()
        })
    }

    render(){
        return(
            <OutsideClickHandler onOutsideClick={ () => {
                this.hide()
            }}>
                { this.state.isVisible ? 
                    <div className="rename-album-container popup">
                        <div className="rename-album-box popup-padding">
                            <p className="popup-title"><i className="far fa-edit popup-title-icon"></i>Rename Album</p>
                            { !this.state.doingRenameProcess ? 
                            <div className="rename-album-form-cont">
                                <span className="ra-form-inp-text">Enter Album Name</span>
                                <input type="text" className="popup-inp-box" placeholder={ this.props.albumid } maxLength={ c.maxAlbumNameLen } id='rename-inp-box' />
                                <div className="popup-btns-block">
                                    <button className="popup-done-btn" onClick={ this.doRenameJob }>Done</button>
                                </div>
                            </div>
                            : <div class="rename-doing-process">
                                <div className="rename-doing-spinner">
                                    <FadeLoader color="teal" height="15" width="6" radius="5" margin="2" />
                                </div>
                                <p className="rename-doing-text">Renaming... Please wait.</p>
                            </div> }
                        </div>
                    </div>
                : null }
                
                <div className="app-notification-container">
                    <ReactNotification />
                </div>
            </OutsideClickHandler>
        )
    }

    doRenameJob = () => {
        let an = document.getElementById('rename-inp-box').value
        if( isLength( an, { min: 1, max: c.maxAlbumNameLen} ) ){
            this.setState({
                doingRenameProcess: true
            }, () => {
                // api queries
                setTimeout( () => {
                    this.setState({ doingRenameProcess: false }, () => {
                        this.hide()
                    })
                }, 1500)
            })
        }
        else{
            this.Notification('', 'Invalid Album Name', 'warning')
        }
    }

    Notification = ( title, text, type ) => {
        text = text !== '' ? text : '.'
        type = type !== '' ? type : 'success'
        store.addNotification({
            title: title,
            message: text,
            type: type,
            container: 'top-right',
            insert: 'top',
            animationIn: ['animate__animated animate__fadeInRight'],
            animationOut: ['animate__animated animate__fadeOut'],
            dismiss: {
                duration: 4000
            }
        })
    }
}

export default AlbumRenamePopup