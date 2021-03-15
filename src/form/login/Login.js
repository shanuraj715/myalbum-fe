import React, { Component } from 'react'
import Helmet from 'react-helmet'
import c from '../../config.json'
import bgimage from '../../assets/images/background-image3.jpg'
import logo from '../../assets/images/logo-254x254.png'
import './login.css'
import { Link, Redirect } from 'react-router-dom'
import RCG from 'react-captcha-generator'

import { DisableRightClick, DisableDrag } from '../../assets/js/export-functions'

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import {store} from 'react-notifications-component'
import 'animate.css'

import { ToastContainer, toast } from 'material-react-toastify'

import isLength from 'validator/lib/isLength'

export class Login extends Component {

	componentDidMount(){
		window.scrollTo(0, 0)
	}

	state = {
		captcha: '',
		captchaStatus: false,
		redirectTo: ''
	}

	constructor( props ){
		super(props)
		
		// this.check = this.check.bind(this)
		this.result = this.result.bind(this)
		this.verifyCaptcha = this.verifyCaptcha.bind(this)
	}


	render() {
	
		return (
		<div className="login" onContextMenu={ DisableRightClick }>
			{ this.props.logged ? <Redirect to="/albums" /> : null }
			<Helmet>
				<title>Login to {c.MAIN_TITLE}</title>
			</Helmet>
			<ReactNotification />
			<ToastContainer />
			<div className="login-container notextselect">
				<div className="background" style={{ backgroundImage: `url(${bgimage})`}}></div>
				<div className="background-blue"></div>
				<div className="login-form">
				<div className="login-header">
					<div className="login-header-image">
						<Link to="/">
						<img src={ logo } alt="" onMouseDown={ DisableDrag }/>
						</Link>
					</div>
				</div>
				<div className="login-form-box">
					<p className="login-acc-text">Login</p>
					<div className="input-box">
						<p className="input-text"><i className="fas fa-user ltfai"></i>Username or Email</p>
						<input className="login-inp-username" id="username" type="text" />
					</div>
					<div className="input-box">
						<p className="input-text"><i className="fas fa-lock ltfai"></i>Password</p>
						<input className="login-inp-password" id="password" type="password" />
					</div>
					<div className="captcha" id="captcha">
						<div className="captcha-image">
							<RCG result={this.result} />
						</div>
						<input type="text" className="captcha-input" id="captcha-input" ref={ref=> this.captchaEnter = ref} placeholder="Enter captcha text" />
					</div>
					<div className="submit-btn-block">
						<button className="login-submit-btn" onClick={this.submitLogin}>Login</button>
					</div>
					<Link className="create-acc-link" to="/register"><i className="fas fa-plus ltfai"></i>Create Account</Link>
				</div>
				</div>
				<Link to="/" className="home-link"><i className="fas fa-home login-home-icon"></i>Go to Home</Link>
			</div>
			{ this.state.redirectTo !== '' ? <Redirect to={ this.state.redirectTo} /> : null}
		</div>
		)
	}

	submitLogin = () => {
		let username = document.getElementById('username').value
		let password = document.getElementById('password').value
		let captcha_status = this.verifyCaptcha()
		
		if( this.verifyLogin( username, password ) ){
			if( captcha_status ){
				fetch(c.apiUrl + '/login', {
					method: 'post',
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({ username, password })
				})
				.then( res => {
					if( res.ok ){
						return res.json()
					}
				})
				.then( json => {
					if( json.status ){
						const sessionId = json.session.sessionKey
						var d = new Date();
						d.setTime(d.getTime() + json.session.validFor);
						var expires = "expires="+ d.toUTCString();
						document.cookie = "sessionId=" + sessionId + ";" + expires
						this.props.updateLogin( true )
					}
					else{
						if( json.status.code === 404 ){
							toast.error(json.error.message, {
								position: "bottom-left",
								autoClose: 6000,
								hideProgressBar: true,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: '',
							})
						}
						else if( json.error.code === 500 ){
							toast.error(json.error.message, {
								position: "bottom-left",
								autoClose: 6000,
								hideProgressBar: true,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: '',
							})
						}
						else if( json.error.code === 401 ){
							this.setState({
								redirectTo: '/verify-account'
							})
						}
						else if( json.error.code === 403 ){
							toast.error(json.error.message, {
								position: "bottom-left",
								autoClose: 6000,
								hideProgressBar: true,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: '',
							})
						}
						else{
							toast.error(json.error.message, {
								position: "bottom-left",
								autoClose: 6000,
								hideProgressBar: true,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: '',
							})
						}
					}
				})
				.catch( err => {
					toast.error("Unable to send request", {
						position: "bottom-left",
						autoClose: 6000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: '',
					})
				})
			}
			else{
				this.Notification('', 'Invalid Captcha Code', 'danger')
			}
		}
	}

	verifyLogin = ( username, password ) => {
		if( isLength(username, {min: c.Reg.MinUsernameLen, max: c.Reg.MaxUsernameLen}) ){
			if( isLength(password, {min: c.Reg.MinPassLen, max: c.Reg.MaxPassLen}) ){
				return true
			}
			else{
				this.Notification('', `Password length must in between ${c.Reg.MinPassLen} and ${c.Reg.MaxPassLen} characters`, 'warning')
				return false
			}
		}
		else{
			this.Notification('', `Username length must in between ${c.Reg.MinUsernameLen} and ${c.Reg.MaxUsernameLen} characters`, 'warning')
			return false
		}
	}

	verifyCaptcha(e) {
		if( this.state.captcha === this.captchaEnter.value ){
			this.setState({
				captchaStatus: true
			}, () => {
				
			})
			return true
		}
		else{
			document.getElementById('captcha-input').value = ''
			return false
		}
	}
	
	result(text) {
		this.setState({
		  captcha: text
		})
	}

	Notification = (title, text, type) => {
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

export default Login
