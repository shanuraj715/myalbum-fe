import React from 'react'
import c from '../config.json'

import Header from '../shared/components/header/Header'
import Footer from '../shared/components/footer/Footer'
import { DisableRightClick } from '../assets/js/export-functions'
import Cookies from 'universal-cookie'
import Helmet from 'react-helmet'

import ImageCard from './comps/imageCard/ImageCard'
/* notification */
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'
import ScrollAnimation from 'react-animate-on-scroll'
import 'animate.css/animate.min.css'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'material-react-toastify'

import FileUploader from './comps/fileUploader/FileUploader'


import './uploadfiles.css'

const cookies = new Cookies()
export class UploadFiles extends React.Component{

	componentDidMount(){
		let albumId = window.location.href.split('/')
		albumId = albumId[albumId.length - 1] === '' ? albumId[albumId.length - 2] : albumId[albumId.length - 1]
		this.setState({
			albumId: albumId
		})
		window.scrollTo(0, 0)
		this.checkAlbumIdOnPageLoad()
	}

	state = { // manage state for this file.
		albumId: 0,
		selected_files: [], // when user selects any file from the input type file button. function will set the value in this state var.
		isUploading: false, // true if page is sending the files to the server. false if not sending or uploading
		uploading: { // state to get info about current uploading file. 
			fileName: "",
			position: 0

		},
		redirectTo: '',
		uploadCounter: {
			failed: [],
			passed: []
		}
	}

	checkAlbumIdOnPageLoad = () => {
		const albumId = this.state.albumId
		const sessionId = cookies.get('sessionId')
		if( sessionId ){
			fetch(c.apiUrl + '/album/' + albumId + '/' + sessionId, {
				headers: {"Content-Type": "application/json"},
				method: 'get'
			})
			.then( res => {
				if( res.ok ){
					return res.json()
				}
				else{
					throw new Error("Server returned an error")
				}
			})
			.then( json => {
				if( json.status ){
					if( !json.albumData.sharedWith || json.albumData.sharedWith.length === undefined ){
						this.setState({
							redirectTo: '/404'
						})
					}
				}
				else{
					this.setState({
						redirectTo: '/404'
					})
				}
			})
			.catch( err => {
				console.log( err )
			})

		}
		else{

		}
	}
   

	filesOnChange = e => {
		if( e.target.files.length === 0 ){
			// if( this.state.selected_files.length !== 0){
			// 	this.Notification( '', "All files are removed.", 'danger')
			// }
			// this.setState({
			// 	selected_files: []
			// })
		}
		else{
			let arr = this.state.selected_files
			let iteration_counter = 0
			for( const [key, value] of Object.entries(e.target.files)){
				let name = value.name
				let path = URL.createObjectURL( value )
				var arr1 = {
					key: key,
					name: name,
					path: path,
					uploadStatus: false,
					file: e.target.files[iteration_counter]
				}
				arr.push( arr1 )
				iteration_counter++
        	}
			this.setState({
				selected_files: arr
			}, () => {
				let items_count = this.state.selected_files.length + ' Item(s) selected for uploading.'
				this.Notification( '', items_count, 'default')
				e.target.value = [] // empty file input values.
				setTimeout( () => {
					window.scrollTo(0, 300) // scrolling to 300px down when user selects some images
				}, 800)
			})
		}
	}

	removeImage = ( key ) => {
		let files_array = this.state.selected_files
		files_array.splice(key, 1)
		this.setState({
			selected_files: files_array
		}, () => {
			if( this.state.selected_files.length !== 0){
				// let items_count = this.state.selected_files.length + ' Item(s) Remaining for uploading.'
				// this.Notification( '', items_count, 'warning')
			}
			else{
				this.Notification( '', "All files are removed.", 'danger')
			}
			files_array = []
			
      	})
      
   	}
   
	removeAllImages = () => {
		let totla_files = this.state.selected_files.length
		setTimeout(() => {
			this.setState({
			selected_files: []
			}, () => {
			window.scrollTo(0, 0)
			this.Notification('', 'Removed ' + totla_files + ' file(s)', 'success')
			})
		}, 200)
	}


	startUpload = () => {
		this.setState({
			uploading: {
				position: 0,
				fileName: ''
			},
			uploadCounter: {
				failed: [],
				passed: []
			}
		}, () => {
			this.uploadOneByOne(0)
		})
	}

	uploadOneByOne = ( position ) => {
		let albumId = window.location.href.split('/')
		albumId = albumId[albumId.length - 1] === '' ? albumId[albumId.length - 2] : albumId[albumId.length - 1]
		const sessionId = cookies.get('sessionId')

		const fileToUpload = this.state.selected_files[position]
		this.setState({
			isUploading: true,
			uploading: {
				fileName: fileToUpload.name,
				position: position + 1
			}
		})
		let formData = new FormData()
		formData.append('file', fileToUpload['file'])
		
		axios.post(c.apiUrl + '/album/upload-file/' + albumId, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				"sessionId": sessionId
			},
			onUploadProgress: progressEvent => {
				console.log(Math.round((progressEvent.loaded * 100) / progressEvent.total))
			}
		})
		.then( json => {
			if( json.data.status ){
				let passedUploadsState = this.state.uploadCounter.passed
				const dataToPush = {
					name: fileToUpload.name,
					path: fileToUpload.path
				}
				passedUploadsState.push( dataToPush )
				this.setState({
					uploadCounter: {
						passed: passedUploadsState,
						failed: this.state.uploadCounter.failed
					}
				})
			}
			else{

				let failedUploadsState = this.state.uploadCounter.failed
				const dataToPush = {
					name: fileToUpload.name,
					path: fileToUpload.path
				}
				failedUploadsState.push( dataToPush )
				this.setState({
					uploadCounter: {
						failed: failedUploadsState,
						passed: this.state.uploadCounter.passed
					}
				}, () => {
					toast.error(json.data.error.message, {
						position: "bottom-left",
						autoClose: 4000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: '',
					})
				})


				
			}
			if( this.state.selected_files.length > position + 1 ){
				this.uploadOneByOne( position + 1 )
			}
			else{
				this.setState({
					isUploading: false,
					selected_files: [],
					uploading: {
						fileName: '',
						position: 0
					}
				}, () => {
					toast.success(this.state.uploadCounter.passed.length + " files uploaded", {
						position: "bottom-left",
						autoClose: 4000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: '',
					})
					if( this.state.uploadCounter.failed.length !== 0 ){
						toast.error(this.state.uploadCounter.failed.length + " files not uploaded", {
							position: "bottom-left",
							autoClose: 4000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: '',
						})
					}
				})
			}
		})
		.catch( err => {
			console.log(err)
		})
		
	}









	render(){
      
		return(
			<React.Fragment>
				{ !this.props.logged ? <Redirect to="/login" /> : null }
				{ this.state.redirectTo !== '' ? <Redirect to={ this.state.redirectTo } /> : null}
				<Helmet>
					<title>Upload Files | {c.MAIN_TITLE}</title>
				</Helmet>
				<ReactNotification />
				<ToastContainer />
				<Header logged={ this.props.logged } updateLogin={this.props.updateLogin} />
				<div className="ua-back-btn-cont">
					<button className="ua-back-btn" onClick={ () => this.setState({ redirectTo: '/edit/' + this.state.albumId })}>
						<i className="far fa-arrow-left ua-back-btn-icon"></i>
						Back to Editing</button>
				</div>
            <FileUploader onChangeHandler={ this.filesOnChange } />

            { this.state.selected_files.length !== 0 ?
				<div className="fu-menu-cont">
               


				<span className="fu-uploading-file-text">{this.state.isUploading ? this.state.uploading.fileName : null }</span>
				<div className="fu-files-count">
					<span className="fu-files-uploaded">{ this.state.uploading.position }</span>/
					<span className="fu-total-files">{ this.state.selected_files.length }</span>
					<span className="fu-uploaded-text"> Uploaded</span>
				</div>
				<div className="fu-btns-cont">
					<button className="fu-upload-btn" disabled={ this.state.isUploading ? 'disabled' : null } onClick={ this.startUpload }>Upload All</button>
					<button className="fu-remove-all-btn" disabled={ this.state.isUploading ? 'disabled' : null } onClick={ this.removeAllImages }>Remove All</button>
				</div>
				</div>
            : null }

				<div className="fu-selected-files-prev-cont" onContextMenu={ DisableRightClick }>
					{ this.state.selected_files.map((item, index) => {
						return( 
							<ScrollAnimation animateIn='flipInY' animateOut='flipOutY' className="inline-block" key={ index }>
								<ImageCard key={ index } removeHandler={ this.removeImage } box_id={ index } file_name={ item.name } file_path={ item.path } />
							</ScrollAnimation>)
					})}
				</div>
				<Footer />
			</React.Fragment>
		)
	}

	Notification = ( title, text, type ) => {
		text = text === '' ? "Notification Text" : text
		type = type === '' ? 'success' : type
		store.addNotification({
			title: title,
			message: text,
			type: type,
			container: 'top-right',
			insert: 'top',
			animationIn: ['animate__animated animate__fadeInRight'],
			animationOut: ['animate__animated animate__fadeOut'],
			dismiss: {
				duration: 5000
			}
		})
   }
}

export default UploadFiles