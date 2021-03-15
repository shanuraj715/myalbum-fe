import React from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { Link } from 'react-router-dom'

import './cardRightMenu.css'



/* Notification */

import ReactNotification, {store} from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

export class CardRightMenu extends React.Component{

    state = {
        cardShow: true,
    }

    hideRMenu = () => {
        this.setState({ cardShow: false }, () => {
            this.props.hideRightMenu()
            return true
        })
    }

    openSharingWindow = () => {
        this.hideRMenu()
        this.props.sharing( this.props.albumid )
    }

    openGetLink = () => {
        this.hideRMenu()
        this.props.getlink( this.props.albumid )
    }

    markStarred = () => {
        this.hideRMenu()
        this.props.starred( this.props.albumid )
    }

    openRename = () => {
        this.hideRMenu()
        this.props.rename( this.props.albumid )
    }

    openChangeColor = () => {

    }

    viewDetails = () => {

    }

    openDelete = () => {
        this.hideRMenu()
        this.props.delete( this.props.albumid )
    }


    render(){
        const style = {
            top: this.props.position.y + 5,
            left: this.props.position.x + 5
        }
        
        return(
            <OutsideClickHandler onOutsideClick={ () => {
                this.hideRMenu()
            }}>
                <div className={`card-option-container popup ${!this.state.cardShow ? '' : 'open-anim'}`} id="card-right-menu" style={style}>
                    <Link to={`/album/${this.props.albumid}`} className="card-right-opt-btn blue-text"><i className="far fa-eye card-right-opt-icon"></i>Preview</Link>
                    <Link to={`/edit/${this.props.albumid}`} className="card-right-opt-btn"><i className="far fa-edit card-right-opt-icon"></i>Edit</Link>
                    <div className="card-right-opt-divider"></div>
                    <button className="card-right-opt-btn" onClick={ this.openSharingWindow }><i className="far fa-user-plus card-right-opt-icon"></i>Share</button>
                    <button className="card-right-opt-btn" onClick={ this.openGetLink }><i className="far fa-link card-right-opt-icon"></i>Get Link</button>
                    <button className="card-right-opt-btn" onClick={ this.markStarred }><i className="far fa-star card-right-opt-icon"></i>Add to Starred</button>
                    <button className="card-right-opt-btn" onClick={ () => {} }><i className="far fa-download card-right-opt-icon"></i>Download</button>
                    <button className="card-right-opt-btn" onClick={ this.openRename }><i className="far fa-pencil-alt card-right-opt-icon"></i>Rename</button>
                    <button className="card-right-opt-btn" onClick={ this.openChangeColor }><i className="far fa-palette card-right-opt-icon"></i>Change color</button>
                    <button className="card-right-opt-btn" onClick={ () => {} }><i className="far fa-lock card-right-opt-icon"></i>Password Protect</button>
                    <button className="card-right-opt-btn" onClick={ this.viewDetails }><i className="far fa-info-circle card-right-opt-icon"></i>View Details</button>
                    <div className="card-right-opt-divider"></div>
                    <button className="card-right-opt-btn red-text" onClick={ this.openDelete }><i className="far fa-trash-alt card-right-opt-icon"></i>Delete</button>
                </div>
                <ReactNotification />
            </OutsideClickHandler>
        )
    }

    Notifcation = (title, text, type) => {
		text = text === '' ? "text" : text
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

export default CardRightMenu