import React from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import c from '../../../config.json'
import './albumDeletePopup.css'

export class AlbumDeletePopup extends React.Component{
    state = {
        isVisible: true
    }

    hide = () => {
        this.setState({ isVisible: false }, () => {
            this.props.delete()
        })
    }

    render(){
        return(
            <OutsideClickHandler onOutsideClick={ () => {
                this.hide()
            }}>
                <div className="delete-album-container popup">
                    <div className="delete-album-box popup-padding">
                        <p className="popup-title"><i className="far fa-trash-alt popup-title-icon"></i>Delete Album</p>
                        <p className="da-warning-text">
                            <i className="fas fa-exclamation fai-space clr-red"></i>
                            You can restore your deleted albums within { c.trashDays } days from the trash page.<br /><br />&nbsp;&nbsp;&nbsp;<span className="clr-red">Do you really want to delete this album?</span>
                        </p>
                        <div className="popup-btns-block">
                            <button className="popup-blue-btn mr-4" onClick={ this.hide }>Cancel</button>
                            <button className="popup-red-btn" onClick={ this.doDeleteJob }>Delete</button>
                        </div>
                    </div>
                </div>
            </OutsideClickHandler>
        )
    }

    doDeleteJob = () => {
       console.log("Delete job called") 
    }
}

export default AlbumDeletePopup