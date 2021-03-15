
import React, { Component } from 'react'
import { Route, BrowserRouter, Switch } from "react-router-dom"
import c from './config.json'
// import { Online, Offline, Detector } from 'react-detect-offline'
import './App.css';
import Home from './home/Home'
import MyAlbums from './albums/myalbums/Albums'
import TrashedAlbums from './albums/trashed-albums/TrashedAlbums'
import StarredAlbums from './albums/starred-albums/StarredAlbums'
import SharedAlbums from './albums/shared-albums/SharedAlbums'
import EditAlbum from './editAlbum/EditAlbum'
import ViewAlbum from './album/Album'
import Cookies from 'universal-cookie'


import UploadFiles from './uploadFiles/UploadFiles'


/* forms */
import ContactUs from './form/contact-us/ContactUs'
import Login from './form/login/Login'
import Register from './form/register/Register'
import ActivateAccount from './activateAccount/ActivateAccount'
import VerifyAccount from './verify-account/Verify'
import UserAccountPage from './Account/Account'

import ReportBug from './form/report-bug/ReportBug'
import ReportUser from './form/report-user/ReportUser'
import RequestTheme from './form/request-theme/RequestTheme'



// import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'


/* Static Pages */

import PrivacyPolicy from './static-pages/PrivacyPolicy/PrivacyPolicy'
import About from './static-pages/About/About'
import Page404 from './static-pages/404Page/Page404'


import UpdateLog from './additional-pages/update-log/UpdateLog'

import Loading from './shared/components/ring-loader/RingLoader'


import pageBehaviour from './pageBehaviour'




export class App extends Component {

	state = {
		connectionAvailable: true,
		isLogged: false,
		checkingForLogin: true
	}

	componentDidMount(){
		this.getUserCredFromServer(this.getSessionKey())
		this.addEventListnersToApp()
	}

	connectionLost = () => {
		console.log("Connection Lost")
		this.setState({ connectionAvailable: false }, () => {
			this.Notification( '', "Connection Lost", 'danger')
		})
	}

	connectionSet = () => {
		console.log("Connection established")
		this.setState({ connectionAvailable: true }, () => {
			this.Notification( '', 'Connection Established', 'success')
		})
	}
	

	addEventListnersToApp = () => {
		window.addEventListener('scroll', () => {
			pageBehaviour.scrollX = window.scrollX
			pageBehaviour.scrollY = window.scrollY
		})

		window.addEventListener('mousemove', (e) => {
			pageBehaviour.cursorPosX = e.clientX
			pageBehaviour.cursorPosY = e.clientY
		})

		window.addEventListener('resize', () => {
			pageBehaviour.pageWidth = window.innerWidth
			pageBehaviour.pageHeight = window.innerHeight
		})
	}

	getUserCredFromServer = ( sessionKey ) => {
		if( sessionKey !== undefined || sessionKey !== null ){
			fetch(c.apiUrl + '/get-session-data', {
				method: 'post',
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({ sessionKey })
			})
			.then( res => {
				if( res.ok ){
					return res.json()
				}
			})
			.then( json => {
				if( json.status ){
					
					this.updateLogin( true )
				}
				else{
					this.updateLogin( false )
				}
				
				this.setState({
					checkingForLogin: false
				})
			})
			.catch( err => {
				console.log( err )
			})
		}
	}

	updateLogin = ( value ) => {
		this.setState({
			isLogged: value
		})
	}

	getSessionKey = () => {
		const cookies = new Cookies()
		let sessionKey = cookies.get('sessionId')
		return sessionKey === undefined ? undefined : sessionKey
	}


	render() {
		return (
			!this.state.checkingForLogin ?
			<BrowserRouter>
				
				<Switch>
						<Route path='/' exact render={() => <Home logged={ this.state.isLogged } loginCred={this.state.loginCred} updateLogin={this.updateLogin} />} />
						<Route path='/login' exact render={() => <Login logged={this.state.isLogged} updateLogin={this.updateLogin} />} />
						<Route path='/register' exact render={() => <Register logged={this.state.isLogged} updateLogin={this.updateLogin} />} />
						<Route path='/activate/:key' exact render={ () => <ActivateAccount logged={ this.state.isLogged } updateLogin={this.updateLogin} />} />
						<Route path="/profile/:username" exact render={ () => <UserAccountPage logged={this.state.isLogged} updateLogin={this.updateLogin} />} />


						<Route path='/albums' exact render={() => <MyAlbums logged={this.state.isLogged} updateLogin={this.updateLogin} />} />
						<Route path='/shared' exact render={() => <SharedAlbums logged={this.state.isLogged} updateLogin={this.updateLogin} />} />
						<Route path='/starred' exact render={() => <StarredAlbums logged={this.state.isLogged} updateLogin={this.updateLogin} />} />
						<Route path='/trashed' exact render={() => <TrashedAlbums logged={this.state.isLogged} updateLogin={this.updateLogin} />} />



						<Route path="/edit/:albumid" exact render={ () => <EditAlbum logged={this.state.isLogged} updateLogin={this.updateLogin} />} />
						<Route path="/upload/:albumid" exact render={ () => <UploadFiles logged={this.state.isLogged} updateLogin={this.updateLogin} />} />
						<Route path="/album/:albumid" exact render={ () => <ViewAlbum logged={this.state.isLogged} updateLogin={this.updateLogin} />} />
					
						<Route path="/contact-us" exact render={ () => <ContactUs logged={ this.state.isLogged } updateLogin={this.updateLogin} />} />
						<Route path="/request-theme" exact render={ () => <RequestTheme logged={ this.state.isLogged } updateLogin={this.updateLogin} />} />
						<Route path="/report-bug" exact render={ () => <ReportBug logged={ this.state.isLogged } />} updateLogin={this.updateLogin} />
						<Route path="/report-user" exact render={ () => <ReportUser logged={ this.state.isLogged } updateLogin={this.updateLogin} />} />

						<Route path="/privacy-policy" exact render={ () => <PrivacyPolicy logged={ this.state.isLogged } updateLogin={this.updateLogin} /> } />
						

						<Route path="/update-log" exact render={ () => <UpdateLog logged={ this.state.isLogged } updateLogin={this.updateLogin} />} />
						<Route path="/about" exact render={ () => <About logged={ this.state.isLogged } updateLogin={this.updateLogin} />} /> 
						
						<Route path="/verify-account" exact render={ () => <VerifyAccount logged={ this.state.isLogged } />} />
						<Route path="/" render={ () => <Page404 />} />				
				
				</Switch>
			</BrowserRouter>
			: <Loading />
		)
	}

	Notification = ( title, text, type ) => {
		text = text !== '' ? text : 'Text'
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

export default App
