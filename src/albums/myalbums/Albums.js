import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Header from '../../shared/components/header/Header'
import Footer from '../../shared/components/footer/Footer'
import AlbumsHeader from '../components/header/AlbumsHeader'
import AlbumSidebar from '../components/sidebar/AlbumsSidebar'
import Card from '../components/card/Card'
import { Redirect } from 'react-router-dom'
import ReactNotification, { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import ShareAlbumPopup from '../../shared/components/sharealbumpopup/ShareAlbumPopup'
import AlbumLink from '../../shared/components/albumlink__popup/AlbumLink'
import Starred from '../components/markStarred/Starred'
import RenameAlbum from '../components/rename-popup/AlbumRenamePopup'
import AlbumDelete from '../components/delete-popup/AlbumDeletePopup'
import c from '../../config.json'
import 'animate.css'
import './albums.css'

import Cookies from 'universal-cookie'

import axios from 'axios'

const cookies = new Cookies()


export class Albums extends Component {

	state = {
		albumList: [],
		popups: {
			sharing: false,
			getAlbumLink: false,
			renameAlbum: false,
			changeColor: false,
			viewDetails: false,
			deleteAlbum: false,
			popupForAlbum: 0
		},
		sidebar_key: 0,
		redirectTo: ''
	}


	componentDidMount(){
		this.getDataFromServer()
	}


	getDataFromServer = () =>{
		let sessionId = cookies.get('sessionId')
		
		let endpoint = c.apiUrl + '/albums/albums/' + sessionId
		axios.get(endpoint)
		.then( response => {
			console.log( response.data )
			if( response.data.status ){
				this.setState({
					albumList: response.data.list,
					sidebar_key: Math.random()
				})
			}
			else{

			}
			
			

		}).catch( e => {

		})
	}

	updateStarredState = () => {
		// used 
		this.setState({popups: { starred: false }})
	}

	disableRightClick = (e) => {
		e.preventDefault()
	}

	searchAlbums = ( album_list) => {
		this.setState({albumList: album_list}, () => {
			// console.log( this.state.albumList)
		})
	}

	createNotification = (title, text, type) => {
		this.notification(title, text, type)
	}

	showSharingPop = ( albumid ) => {
		this.setState( prevState => ({
			popups:{
				sharing: !prevState.popups.sharing,
				popupForAlbum: albumid
			}
		}), () => {
				// console.log(this.state.popups.sharing)
			}
		)
	}

	getAlbumLink = ( albumid ) => {
		this.setState( prevState => ({
			popups:{
				getAlbumLink: !prevState.popups.getAlbumLink,
				popupForAlbum: albumid
			}
		}), () => {
			// console.log( this.state.popups.getAlbumLink )
		})
	}

	markStarred = ( albumid ) => {
		Starred( albumid )
	}

	renameAlbum = ( albumid ) => {
		this.setState( prevState => ({
			popups:{
				renameAlbum: !prevState.popups.renameAlbum,
				popupForAlbum: albumid
			}
		}), () => {
			// console.log( this.state.popups.renameAlbum )
		})
	}

   changeColor = () => {

   }

   viewDetails = () => {

   }

	deleteAlbum = ( albumid ) => {
		this.setState(prevState => ({
			popups: {
				deleteAlbum: !prevState.popups.deleteAlbum,
				popupForAlbum: albumid
			}
		}), () => {
			// console.log("Delete Opens from albums.js")
		})
	}

	render() {
		return (
			<div>
				{ !this.props.logged ? <Redirect to='/' /> : null }
				{ this.state.redirectTo !== '' ? <Redirect to="/" /> : null }
				<Helmet>
					<title>My Albums</title>
				</Helmet>
				<div className="app-notification-container">
                    <ReactNotification />
                </div>
				<Header logged={ this.props.logged } updateLogin={this.props.updateLogin} />
				<div className="albums-container">
					<AlbumSidebar key={ this.state.sidebar_key } active_link="myalbums" albums={ this.state.albumList } />
					<div className="album-left-area" onContextMenu={this.disableRightClick}>
						<AlbumsHeader reloadData={ this.getDataFromServer } notify={this.createNotification} search={ this.searchAlbums } albums={ this.state.albumList } />
						<div className="album-container">
							<div className="album-card-container">
							{ this.state.albumList.map( (item) => {
								return (<Card 
									a_data={item}
									key={item.albumid}
									notify={ this.createNotification }
									sharing={ this.showSharingPop }
									getlink={ this.getAlbumLink }
									starred={ this.markStarred }
									rename={ this.renameAlbum }
									changeColor={ this.changeColor }
									viewDetails={ this.viewDetails }
									deleteAlbum={ this.deleteAlbum } />)
								}) }
							</div>
						</div>
					</div>
				</div>
				{ this.state.popups.sharing ?
					<ShareAlbumPopup
						albumid={ this.state.popups.popupForAlbum }
						sharing={this.showSharingPop}
						/>
					: null }
				{ this.state.popups.getAlbumLink ? 
					<AlbumLink
						albumid={ this.state.popups.popupForAlbum }
						open={ this.getAlbumLink } />
				: null }
				{ this.state.popups.renameAlbum ?
					<RenameAlbum
						albumid={ this.state.popups.popupForAlbum }
						rename={ this.renameAlbum }
						notify={ this.createNotification } />
				: null }
				{ this.state.popups.changeColor ? null : null }
				{ this.state.popups.viewDetails ? null : null }
				{ this.state.popups.deleteAlbum ?
					<AlbumDelete
						delete={ this.deleteAlbum }
					/>
				: null }
				<Footer/>
			</div>
		)
	}

	notification = (title, text, type) => {
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

export default Albums
