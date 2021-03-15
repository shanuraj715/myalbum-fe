import React from 'react'

import './albumsettings.css'
import c from '../../../config.json'
import ShareAlbumPopup from '../../../shared/components/sharealbumpopup/ShareAlbumPopup'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Loading from '../../../shared/components/loading/Loading'
import Cookies from 'universal-cookie'
import Uploader from './comps/Uploader'

import { ToastContainer, toast } from 'material-react-toastify'
import 'material-react-toastify/dist/ReactToastify.css';

import { getThemeName, getAlbumPrivacy } from '../../../assets/js/export-functions'

const cookie = new Cookies()


export class AlbumSettings extends React.Component{


	state = {
		sessionId: cookie.get('sessionId') || null,
		isLoading: true,
		albumid: this.props.aid,

		albumName: 'Album Name',
		albumTitle: 'Album Title',
		albumDesc: 'Album Description Upto 512 Characters.',
		selectedTheme: 'Classic',
		selectedPrivacy: "Only Me",
		selectedColor: "diou_blue",
		isSharedPopupVisible: false,
		sharedWith: [],
		RedirectTo: ''
	}

	changeSavingStatus = ( bool ) => {
		this.props.updateSaveStatus( bool )
	}

	componentDidMount(){
		
		this.getSettings()
		
	}

	dataToUpload = () => {
		const data = { 
			name: this.state.albumName,
			title: this.state.albumTitle,
			description: this.state.albumDesc,
			theme: getThemeName( this.state.selectedTheme, 'f2b' ),
			privacy: getAlbumPrivacy( this.state.selectedPrivacy, 'f2b' ),
			colorClass: this.state.selectedColor
		}
		// console.log( this.state.sharedWith )

		return data
	}

	getSettings = () => {
		axios.get( c.apiUrl + '/edit-album/settings/' + this.props.aid, {
			headers: {
				"Content-Type": 'application/json',
				"sessionId": this.state.sessionId
			}
		} )
		.then( res => {
			let privacy = res.data.settings.privacy
			this.setState({
				albumName: res.data.settings.name,
				albumTitle: res.data.settings.title,
				albumDesc: res.data.settings.description,
				selectedTheme: getThemeName(res.data.settings.theme, 'b2f'),
				selectedPrivacy: getAlbumPrivacy( privacy, "b2f" ),
				selectedColor: res.data.settings.colorClasses,
				sharedWith: res.data.settings.sharedWith,

				isLoading: false
			})
		})
		.catch( error => {

		})
	}

	showToast = (message, type) => {
		if( type === 'dark' ){
			toast.dark(message, {
                position: "bottom-left",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: '',
            })
		}
		if( type === 'error' ){
			toast.error(message, {
                position: "bottom-left",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: '',
            })
		}
	}
	

	render(){
		return(
			<React.Fragment>
				{ this.state.RedirectTo !== '' ? <Redirect to={ this.state.RedirectTo } /> : null }
				{ this.state.isSharedPopupVisible ? <ShareAlbumPopup
				sharing={ () => { this.setState({ isSharedPopupVisible: false })}}
				albumid={ this.props.aid }
				/>
				: null }

				
				<div className="ea-settings-cont">


				{ this.props.saveState ? <Uploader
					data={ this.dataToUpload() }
					sessionId={ this.state.sessionId }
					albumId={ this.state.albumid }
					savingStatusToggler={ this.changeSavingStatus }
					toast={ this.showToast }
				/> : null }

					<ToastContainer />
					{ this.state.isLoading ? <Loading /> :
					<React.Fragment>
					<div className="ea-settings-one">
						<div className="ea-inp-cont">
							<span className="ea-inp-text">Album Name</span>
							<input
								className="ea-inp-box ea-width-70 font-ubuntu clr-red"
								type="text"
								value={ this.state.albumName }
								placeholder="Enter album name"
								maxLength={ c.maxAlbumNameLen }
								onChange={ (e) => { this.setState( { albumName: e.target.value } ) } }
								/>
						</div>
						<div className="ea-inp-cont">
							<span className="ea-inp-text">Album Title</span>
							<input
								className="ea-inp-box ea-width-70"
								type="text"
								value={ this.state.albumTitle }
								placeholder="Enter album title"
								maxLength={ c.maxAlbumNameLen }
								onChange={ (e) => { this.setState( { albumTitle: e.target.value } ) } }
								/>
						</div>
						<div className="ea-inp-cont">
							<span className="ea-inp-text">Album Theme</span>
							<button className="ea-theme-drop-btn ea-inp-box ea-width-70">
								<span className="ea-drop-sel-span">{ this.state.selectedTheme }</span>
								<span className="ea-drop-sel-icon">
									<i className="far fa-angle-down fa-lg"></i>
								</span>
								<div className="ea-drop-opt-cont">
									{ c.themes.map( ( item, index ) => {
										return( <button key={ index } onMouseDown={ () => {this.setState({ selectedTheme: item })} } className="ea-drop-opt-btn">{ item }</button> )
									})}
								</div>
							</button>
						</div>
					</div>
					<div className="ea-settings-two">
						<div className="ea-inp-cont">
							<span className="ea-inp-text">Album Description</span>
							<textarea
								className="ea-txt-box ea-width-85"
								value={ this.state.albumDesc }
								type="text"
								placeholder="Description of this album. Upto 512 characters."
								maxLength="512"
								onChange={ (e) => { this.setState( { albumDesc: e.target.value } ) } }></textarea>
						</div>
						<div className="ea-inp-cont">
							<span className="ea-inp-text">Album Tile Color</span>
							<button className={ `ea-theme-drop-btn ea-inp-box ea-width-70 ${ this.state.selectedColor }`}>
								<span className="ea-drop-sel-span">Select Color</span>
								<span className="ea-drop-sel-icon">
									<i className="far fa-angle-down fa-lg"></i>
								</span>
								<div className="ea-drop-opt-cont">
									<button
										onMouseDown={ () => {this.setState({ selectedColor: "transparent" })} }
										className="ea-drop-opt-clr-btn transparent">Default
									</button>
									{ c.cardColorsClasses.map( (item, index ) => {
										return(
											<button
												key={ index }
												onMouseDown={ () => {this.setState({ selectedColor: item })} }
												className={ `ea-drop-opt-clr-btn ${ item }`}>&nbsp;
											</button>
										)
									})}
								</div>
							</button>
						</div>	
					</div>

					<div className="ea-settings-three">
						<div className="ea-inp-cont">
							<span className="ea-inp-text">Privacy and Sharing</span>
							<button className="ea-theme-drop-btn ea-inp-box ea-width-70">
								<span className="ea-drop-sel-span">{ this.state.selectedPrivacy }</span>
								<span className="ea-drop-sel-icon">
									<i className="far fa-angle-down fa-lg"></i>
								</span>
								<div className="ea-drop-opt-cont">
									<button onMouseDown={ () => {this.setState({ selectedPrivacy: 'Only me' })} } className="ea-drop-opt-btn">Only me</button>
								
									<button onMouseDown={ () => {this.setState({ selectedPrivacy: 'Public' })} } className="ea-drop-opt-btn">Public</button>
								
									<button onMouseDown={ () => {this.setState({ selectedPrivacy: 'Unlisted' })} } className="ea-drop-opt-btn">Unlisted</button>
								
									<button onMouseDown={ () => {this.setState({ selectedPrivacy: 'Specific Users' })} } className="ea-drop-opt-btn">Specific Users</button>
								</div>
							</button>
						</div>
						{ this.state.selectedPrivacy === 'Specific Users' ? 
						<div className="ea-inp-cont">
							<span className="ea-inp-text">Manage People</span>
							<button className="ea-theme-drop-btn ea-inp-box ea-width-70" onClick={ () => { this.setState({ isSharedPopupVisible: true })}}>
								<span className="ea-drop-sel-span">Sharing Options</span>
								<span className="ea-drop-sel-icon">
									<i className="far fa-angle-right fa-lg"></i>
								</span>
							</button>
						</div>
						: null }
						<div className="ea-inp-cont">
							<span className="ea-inp-text">&nbsp;</span>
							<div className="ea-btns-cont">
								<button className="ea-theme-drop-btn ea-inp-box margin-5 ea-blue-btn" onClick={ () => this.setState({ RedirectTo: '/upload/' + this.props.aid }) }>Upload Files</button>
								{/* <button className="ea-theme-drop-btn ea-inp-box margin-5 ea-blue-btn">Preview</button> */}
							</div>
						</div>
					</div>
					</React.Fragment>
					}
				</div>
			</React.Fragment>
		)
	}
}


export default AlbumSettings