import React, { Component } from 'react'
import c from '../config.json'
import Header from './comps/header/Header'
import Helmet from 'react-helmet'
import { Redirect } from 'react-router-dom'
import AlbumSettings from './comps/albumSettings/AlbumSettings'
import CardContainer from './comps/card-container/CardContainer'
import { DisableRightClick } from '../assets/js/export-functions'


import './editAlbum.css'


export class EditAlbum extends Component {

	state = {
		isLoading: true,
		aid: 0,
		a_name: 'New Album',
		files: [],
		settings:{
			
		},
		cardRerenderKey: 0,
		settingsKey: 1,
		saveSettings: false,
		saveFiles: false

	}
	
	componentDidMount(){
		
		window.scrollTo(0, 0)


		/* getting album id from the url */
		let path = window.location.href
		path = path.split('/')
		this.setState({
			aid: path[path.length - 1] !== '' ? path[path.length - 1] : path[path.length - 2]
		}, () => {
			// console.log( this.state.aid )
		})

		
	}

	reset = () => {
		let key = Math.random()*100
		this.setState({ cardRerenderKey: 'ck' + key, settingsKey: 'sk' + key })
	}

	updateSettingsSaveStatus = ( bool ) => {
		this.setState({
			saveSettings: bool 
		})
	}

	updateFilesSaveStatus = ( bool ) => {
		this.setState({
			saveFiles: bool
		})
	}



	render() {
		return (
			<React.Fragment>
				{ !this.props.logged ? <Redirect to="/" /> : null }

				<Helmet>
					<title>Edit { this.state.a_name } | {c.MAIN_TITLE}</title>
				</Helmet>
				<Header aid={ this.state.aid } album_name={ this.state.a_name } resetData={ this.reset } saveHandler={ () => { this.setState({ saveSettings: true, saveFiles: true })}} />
				<div className="ea-container text-center notextselect" onContextMenu={ DisableRightClick }>
					
					<div className="ea-top-margin-provider"></div>

					{ this.state.aid !== 0 ?
					<AlbumSettings
						aid={ this.state.aid }
						key={ this.state.settingsKey }
						saveState ={ this.state.saveSettings }
						updateSaveStatus={ this.updateSettingsSaveStatus }
					/>
					: null }
					{ this.state.aid !== 0 ? 
					<CardContainer
						aid={ this.state.aid }
						key={ this.state.cardRerenderKey }
						saveState={ this.state.saveFiles }
						updateSaveStatus={ this.updateFilesSaveStatus }
					/>
						: null }
				</div>
			</React.Fragment>
		)
	}
}

export default EditAlbum
