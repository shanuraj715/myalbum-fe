import React, { Component } from 'react'
import isInt from 'validator/lib/isInt'
import c from '../config.json'


import AlbumLoader from './comps/loader/Loader'
import Helmet from 'react-helmet'

import Cookies from 'universal-cookie'
import Err403 from '../static-pages/403Page/Page403'
import { getThemeName } from '../assets/js/export-functions'


/* Themes */
import Anniversary from '../Themes/Anniversary/Anniversary'
import Birthday from '../Themes/Birthday/Birthday'
import Christmas from '../Themes/Christmas/Christmas'
import Classic from '../Themes/Classic/Classic'
import ClassicAnniversary from '../Themes/ClassicAnniversary/ClassicAnniversary'
import ClassicBirthday from '../Themes/ClassicBirthday/ClassicBirthday'
import ClassicLove from '../Themes/ClassicLove/ClassicLove'
import ClassicTwo from '../Themes/ClassicTwo/ClassicTwo'
import Love from '../Themes/Love/Love'
import NewYear from '../Themes/NewYear/NewYear'



import './album.css'


const cookie = new Cookies()

export class Album extends Component {

	componentDidMount(){
		window.scrollTo(0, 0)

		let path = window.location.href
		path = path.split('/')
		this.setState({
			aid: path[path.length - 1] !== '' ? path[path.length - 1] : path[path.length - 2]
		}, () => {
			setTimeout(() =>{
				this.getData()
			}, 4000)
		})

		
	}

	

	state = {
		aid: 0,
		theme: "classic",
		isLoading: true,
		albumData: {
			title: "",
			description: '',
			files: []
		},
		isValidAlbum: true
	}

	getData = () => {
		const sessionId = cookie.get("sessionId")
		console.log( c.apiUrl + '/album/' + this.state.aid + '/' + sessionId )
		fetch(c.apiUrl + '/album/' + this.state.aid + '/' + sessionId)
		.then( res => {
			if( res.ok ){
				return res.json()
			}
			else{
				throw new Error("Server returned an error.")
			}
		})
		.then( json => {
			console.log( json )
			if( json.status ){
				const albumTitle = json.albumData.albumTitle === undefined || json.albumData.albumTitle === "" ? json.albumData.albumName : json.albumData.albumTitle
				this.setState({
					isLoading: false,
					theme: getThemeName( json.theme, 'b2f'),
					albumData: {
						title: albumTitle,
						description: json.albumData.albumDescription,
						files: json.albumData.files
					},
					isValidAlbum: true
				})
			}
			else{
				this.setState({
					isLoading: false,
					isValidAlbum: false
				})
			}
			
		})
		.catch( error => {
			console.log( error )
		})
		
	}

	theme = () => {

		switch( this.state.theme ){
			case "Classic": 
				return <Classic a_data={ this.state.albumData } />
			case "Classic Two": 
				return <ClassicTwo a_data={ this.state.albumData } />
			case "Love": 
				return <Love a_data={ this.state.albumData } />
			case "Classic Love": 
				return <ClassicLove a_data={ this.state.albumData } />
			case "Anniversary": 
				return <Anniversary a_data={ this.state.albumData } />
			case "Classic Anniversary": 
				return <ClassicAnniversary a_data={ this.state.albumData } />
			case "Birthday": 
				return <Birthday a_data={ this.state.albumData } />
			case "Classic Birthday": 
				return <ClassicBirthday a_data={ this.state.albumData } />
			case "Christmas": 
				return <Christmas a_data={ this.state.albumData } />
			case "New Year": 
				return <NewYear a_data={ this.state.albumData } />
			default:
				return <Classic a_data={ this.state.albumData } />
		}
	}

	render() {
		return (
			<React.Fragment>
				<Helmet>
					<title>{ this.state.albumData.title  + this.state.albumData.title !== '' ? this.state.albumData.title + " | " + c.MAIN_TITLE : 'Loading...' }</title>
				</Helmet>
				{ this.state.isLoading ? <AlbumLoader /> : !this.state.isValidAlbum ? <Err403 /> : this.theme() }
			</React.Fragment>
		)
	}
}

export default Album
