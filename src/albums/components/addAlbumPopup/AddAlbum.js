import react from 'react'
import { Redirect } from 'react-router-dom'
import OutsideClickHandler from 'react-outside-click-handler'
import c from '../../../config.json'
import {isLength} from 'validator'
import { getCookies } from '../../../assets/js/export-functions'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component'
import 'animate.css'

import { ToastContainer, toast } from 'material-react-toastify'

import PropagateLoader from 'react-spinners/PropagateLoader'

import './addAlbum.css'

export class AddAlbum extends react.Component{

	state = {
		isSendingRequest: false,
		created: false,
		redirectTo: '/'
	}


	render(){
		
		return(
			
			<OutsideClickHandler onOutsideClick={ () => {
				this.props.toggler( false )
			}}>
				<div className="app-notification-conatiner">
					<ReactNotification />
					<ToastContainer />
				</div>
				<div className="add-album-container popup">
					<div className="add-album-box">
						<p className="add-album-title">Create New Album</p>
						<div className="add-album-form">
							<span className="add-album-form-text">Enter Album Name</span>
							<input
								type="text"
								className="add-album-inpbx"
								maxLength={ c.maxAlbumNameLen }
								id="add-album-new-name"
								pattern="[a-zA-Z0-9]+[a-zA-Z0-9 ]+" />
							<div className="add-album-sub-btn-block">
								<div className="add-album-spinner">
									{ this.state.isSendingRequest ? <PropagateLoader size="10px" color="teal" className="jj" /> : null }
								</div>
								<button className="add-album-sub-btn" onClick={ this.validateForm }>Create Album</button>
							</div>
						</div>
					</div>
					{ this.state.created ? <Redirect to={ this.state.redirectTo } />: null }
				</div>
			</OutsideClickHandler>
			
		)
	}

	sendRequest = ( album_name ) => {
		this.setState({
			isSendingRequest: true
		}, () => {
			fetch( c.apiUrl + '/albums/' + getCookies().sessionId, {
				method: 'post',
				headers: {
					'Content-Type' : 'application/json'
				},
				body: JSON.stringify({albumName: album_name})
			})
			.then( res => {
				if( res.ok ){
					return res.json()
				}
				else{
					this.setState({ isSendingRequest: false})
					throw new Error(this.notification('', 'Something went wrong', 'danger'))
				}
			})
			.then( data => {
				this.setState({ isSendingRequest: false})
				if( data.status ){
					// this.setState({
					// 	redirectTo: '/edit/' + data.albumId,
					// 	created: true
					// })
					this.props.toggler()
					this.props.reloadAlbumData() 
				}
				else{
					toast.error(data.error.message, {
						position: "bottom-left",
						autoClose: 4000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: '',
					})
				}
			})
			.catch( err => {
				toast.error(err, {
					position: "bottom-left",
					autoClose: 4000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: '',
				})
			})
		})
		// return true for successful insertion in database
	}

	validateForm = () => {
		let album_name = document.getElementById('add-album-new-name').value
		if( isLength( album_name, { min: 1, max: c.maxAlbumNameLen} ) ){
			let allowed_chars = /^[0-9a-zA-Z ]+$/
			if( album_name.match(allowed_chars) ){
				this.sendRequest( album_name )
			}
			else{
				this.notification( '', 'Album name must have in Alphanumeric.', 'danger' )
			}
		}
		else{
			this.notification( '', 'Album name must have minimum 1 to ' + c.maxAlbumNameLen + ' characters', 'warning' )
		}
	}

	notification = ( title, text, type ) => {
		text = text === '' ? "text" : text
		type = type === '' ? 'success' : type
		store.addNotification({
			title: title,
			message: text,
			type: type,
			container: 'top-right',
			insert: 'top',
			animationIn: ['animate__animated animate__fadeInRight'],
			animationOut: ['animate__animated animate__faceOut'],
			dismiss: {
				duration: 4000
			}
		})
	}
}

export default AddAlbum