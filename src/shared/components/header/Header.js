import React, { Component } from 'react'
import c from '../../../config.json'
import './header.css'
import headerLogo from '../../../assets/images/logo-254x254.png'
import config from '../../../config.json'
import { Link } from 'react-router-dom'
import UserImage from '../../../assets/images/default-user-image.png'
import OutsideClickHandler from 'react-outside-click-handler'
import Cookies from 'universal-cookie'
import { ToastContainer, toast } from 'material-react-toastify'


const cookies = new Cookies()

export class Header extends Component {

	state = {
		userOptionExpanded: false,
		userFirstName: '',
		userLastName: '',
		username: ''
	}

	toggleUserOptions = () => {
		this.setState(prevState => ({
			userOptionExpanded: !prevState.userOptionExpanded
		}))
	}

	componentDidMount = () => {
		let sessionId = cookies.get('sessionId')
		if( sessionId !== undefined ){
			fetch(c.apiUrl + '/user/sessionId/' + sessionId, {
				method: 'get',
				headers: {"Content-Type": "application/json"}
			})
			.then( res => {
				if( res.ok ){
					return res.json()
				}
				else{
					throw new Error("Error Occured.")
				}
			})
			.then( json => {
				if( json.status ){
					this.setState({
						userFirstName: json.user.firstName.charAt(0).toUpperCase() + json.user.firstName.slice(1),
						userLastName: json.user.lastName.charAt(0).toUpperCase() + json.user.lastName.slice(1),
						username: json.user.username
					})
				}
				else{

				}
			})
			.catch( err => {

			})
		}
	}

	render() {
		return (
			<div className="header">
				<ToastContainer />
				<div className="main-header">
					<div className="header-area notextselect">
						<Link to="/">
							<div className="header-logo" id="header-logo">
								<img className="header-logo-image" src={headerLogo} alt="" />
								<span className="header-logo-text">{config.MAIN_TITLE}</span>
							</div>
						</Link>
						<div className="nav-btn-container">
							<span className="nav_btn" id="show-nav-btn"><i className="fas fa-bars"></i></span>
							<span className="close-nav-btn" id="hide-nav-btn"><i className="fas fa-times"></i></span>
						</div>
						<div className="header-nav" visibility="">
							<nav className="navigation">
								<ul className="nav-ul">
									{ this.props.logged ?
										<li className="nav-li" data="top-profiles">
											<Link to="/albums"><i className="fas fa-images nav-icon"></i>My Albums</Link>
										</li>
									: null }
									<li className="nav-li" data="top-profiles">
										<Link to="/"><i className="fas fa-users nav-icon"></i>Top Profiles</Link>
									</li>
									<li className="nav-li" data="contact-us">
										<Link to="/contact-us"><i className="fas fa-at nav-icon"></i>Contact Us</Link>
									</li>
									{ !this.props.logged ? 
										<div className="nav_login_block">
											<li className="nav-li">
												<Link to="/login"><i className="fas fa-sign-in-alt nav-icon"></i>Login</Link>
											</li>
											<li className="nav-li">
												<Link to="/register"><i className="fas fa-user-plus nav-icon"></i>Sign Up</Link>
											</li>
										</div> :
										<div className="nav_login_block nav-user-btn">
										<li className="nav-li" onClick={ this.toggleUserOptions }>
											<span className="nav_user_logo"><i className="fas fa-user"></i></span>
										</li>
										{ this.state.userOptionExpanded ? 
										<OutsideClickHandler onOutsideClick={() => {
											this.toggleUserOptions()
										}}>
											<div className="nav_user-account-drop">
												<div className="nav-user-profile-block">
													<div className="nav-user-img-block">
														<img src={ UserImage } className="n-u-img" alt="" />
													</div>
													<div className="n-u-text">
														<span className="n-u-name">{ this.state.userFirstName + ' ' + this.state.userLastName }</span>
														<span className="n-u-username">{ this.state.username }</span>
													</div>
												</div>
								
												<div className="nav-user-drop-divider"></div>
								
												<Link className="nav-user-link" to="/albums"><span><i className="far fa-images"></i></span>Albums</Link>
												<Link className="nav-user-link" to="/"><span><i className="far fa-star"></i></span>Starred</Link>
												<Link className="nav-user-link" to="/"><span><i className="far fa-trash-alt"></i></span>Trashed</Link>
								
												<div className="nav-user-drop-divider"></div>
								
												<span className="nav-user-cat-head-text">Settings</span>
												<Link className="nav-user-link" to="/"><span><i className="far fa-user-cog"></i></span>Privacy</Link>
												<Link className="nav-user-link" to={`/profile/${ this.state.username }`} ><span><i className="far fa-cogs"></i></span>Profile</Link>
								
												<div className="nav-user-drop-divider"></div>
												<span className="nav-user-link" id="logout-btn" onClick={ this.logOut }><span><i className="far fa-sign-out-alt"></i></span>Log Out</span>
								
											</div>
										</OutsideClickHandler>
										: null }
									</div> }
								</ul>
							</nav>
						</div>
					</div>
				</div>
				<div className="header-area-cover"></div>
			</div>
		)
	}

	logOut = () => {
		const sessionId = cookies.get('sessionId')
		console.log( sessionId )
		if( sessionId ){
			fetch(c.apiUrl + '/login/logout/' + sessionId, {
				method: 'get',
				headers: {"Content-Type": 'application/json'}
			})
			.then( res => {
				console.log("po")
				if( res.ok ){
					return res.json()
				}
				else{
					throw new Error("Unable to logout. Server sent unknown error code")
				}
			})
			.then( json => {
				console.log( json )
				if( json.status ){
					cookies.remove('sessionId')
					this.props.updateLogin( false )
				}
				else{
					toast.error(json.error.message, {
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
		}
	}
}

export default Header
