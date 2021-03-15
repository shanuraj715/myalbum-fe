import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import c from '../../config.json'
import bgimage from '../../assets/images/background-image3.jpg'
import logo from '../../assets/images/logo-254x254.png'
import { Link, Redirect } from 'react-router-dom'
import './register.css'
import RCG from 'react-captcha-generator'

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import {store} from 'react-notifications-component'
import 'animate.css'
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'

import { ToastContainer, toast } from 'material-react-toastify'
import 'material-react-toastify/dist/ReactToastify.css';

import Loader from '../../shared/components/doingApiRequest-loader/Loader'



export class Register extends Component {

	componentDidMount(){
		window.scrollTo(0, 0)
	}

	constructor( props ){
		super(props)
		this.state = {
			captcha: '',
			captchaStatus: false,
			registrationSuccess: false,
			isSendingRequest: false
		}
		this.result = this.result.bind(this)
		this.verifyCaptcha = this.verifyCaptcha.bind(this)
	}

	componentWillUnmount(){

	}

	modelHide = () => {
		this.setState({registrationSuccess: false})
	}

	modelOkButtonHandler = () => {
		this.setState({registrationSuccess: false}, () => {
			// window.open('/', '_self')
		})
	}

	render() {
		return (
			<div className="registration">
				{ this.props.logged ? <Redirect to="/albums" /> : null }
				<Helmet>
					<title>Create Account on { c.MAIN_TITLE }</title>
				</Helmet>
				<ReactNotification/>
				<ToastContainer />
				<div className="reg-bg-img" style={{ backgroundImage: `url(${bgimage})`}}></div>
				<div className="reg-bg-clr"></div>
				<div className="reg-form">
					<div className="reg-header">
						<div className="reg-header-image">
							<img src={logo} alt="" />
						</div>
					</div>
					<div className="reg-form-container">
						<p className="reg-acc-text">Create Account</p>
						<div className="reg-inp-block">
							<div className="reg-inp-b1">
								<span className="reg-inp-text"><i className="fas fa-angle-double-right rifai"></i>First Name</span>
								<input type="text" className="reg-inp-txt" id="fname" />
							</div>
							<div className="reg-inp-b2">
								<span className="reg-inp-text"><i className="fas fa-angle-double-right rifai"></i>Last Name</span>
								<input type="text" className="reg-inp-txt" id="lname" placeholder="Optional" />
							</div>
						</div>
						<div className="reg-inp-block">
							<div className="reg-inp-b1">
								<span className="reg-inp-text"><i className="fas fa-user rifai"></i>Username</span>
								<input type="text" className="reg-inp-txt" id="username" />
							</div>
							<div className="reg-inp-b2">
								<span className="reg-inp-text"><i className="fas fa-at rifai"></i>Valid Email</span>
								<input type="email" className="reg-inp-txt" id="email" />
							</div>
						</div>
						<div className="reg-inp-block">
							<div className="reg-inp-b1">
								<span className="reg-inp-text"><i className="fas fa-lock rifai"></i>Password</span>
								<input type="password" className="reg-inp-txt" id="password" />
							</div>
							<div className="reg-inp-b2">
								<span className="reg-inp-text"><i className="fas fa-lock rifai"></i>Confirm Password</span>
								<input type="password" className="reg-inp-txt" id="repass" />
							</div>
						</div>
						<div className="captcha" id="captcha">
							<div className="captcha-image">
								<RCG result={this.result} />
							</div>
							{/* <i className="fas fa-redo-alt captcha-reload-icon"></i> */}
							<input type="text" className="captcha-input" id="captcha-input" ref={ref=> this.captchaEnter = ref} placeholder="Enter captcha text" />
							{/* <button className="captcha-verify" onClick={this.handleClick}>Verify</button> */}
						</div>
						<div className="reg-s-btn-cont">
							<button className="reg-submit-btn" onClick={this.submitForm}>Create Account</button>
						</div>
						<Link className="reg-login-btn" to="/login"><i className="fas fa-sign-in-alt reg-login-btn-icon"></i>Login</Link>
					</div>
				</div>
				<Link className="reg-home-btn" to="/"><i className="fas fa-home reg-fa-home-icon"></i>Go to Home</Link>
				{ this.state.isSendingRequest ? <Loader /> : null }
			</div>
		)
	}



	submitForm = () => {
		let fname = document.getElementById('fname').value
		let lname = document.getElementById('lname').value
		let username = document.getElementById('username').value
		let email = document.getElementById('email').value
		let pass = document.getElementById('password').value
		let pass2 = document.getElementById('repass').value
		let captcha_status = this.verifyCaptcha()
		if( this.validateForm( fname, lname, username, email, pass, pass2, captcha_status ) ){
			if( captcha_status ){
				this.sendData( fname, lname, username, email, pass )
			}
			else{
				this.Notification('', 'Invalid captcha code.', 'danger')
				return false;
			}
		}
		
	}

	sendData = (fname, lname, username, email, pass) => {
		this.setState({isSendingRequest: true})
		fetch(c.apiUrl + '/register/', {
			method: 'post',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({fname, lname, username, email, pass}),
		})
		.then( res => {
			if(res.ok)
				return res.json() ;
			else{
				this.setState({ isSendingRequest: false })
				throw new Error(this.Notification('',  `Something went wrong`, 'danger'))
			}
		})
		.then ( data => {
			this.setState({ isSendingRequest: false })
			console.log( data )
			if( data.status ){
				toast.dark("Success. Check your email", {
					position: "bottom-left",
					autoClose: 6000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: '',
				})
				setTimeout( () => {
					window.open(c.MAIN_URL, '_self')
				}, 6000)
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
		.catch(err => {
			toast.error("Unable to send request. Try again later", {
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

	validateForm = (fname, lname, username, email, pass, pass2, captcha_status) => {
		if( isLength(fname, {min: c.Reg.MinFnameLen, max: c.Reg.MaxFnameLen}) ){
			if( isLength(lname, { min: 0,max: c.Reg.MaxLnameLen}) ){
				if( isLength(username, { min: c.Reg.MinUsernameLen, max: c.Reg.MaxUsernameLen}) ){
					if( isEmail(email) ){
						if( isLength(pass, { min: c.Reg.MinPassLen, max: c.Reg.MaxPassLen}) ){
							if( pass === pass2 ){
								return true
							}
							else{
								this.Notification('', 'Password does not match', 'danger')
								return false;
							}
						}
						else{
							this.Notification('', `Password length must in between ${c.Reg.MinPassLen} and ${c.Reg.MaxPassLen} characters`, 'warning')
							return false;
						}
					}
					else{
						this.Notification('', `Wrong or Invalid email address`, 'danger')
					}
				}
				else{
					this.Notification('',  `Username length must in between ${c.Reg.MinUsernameLen} and ${c.Reg.MaxUsernameLen} characters`, 'warning')
					return false;
				}
			}
			else{
				this.Notification('',  `Last Name length must be smaller than ${c.Reg.MaxLnameLen} characters`, 'warning')
				return false;
			}
		}
		else{
			this.Notification('',  `First Name length must in between ${c.Reg.MinFnameLen} and ${c.Reg.MaxFnameLen} characters`, 'warning')
			return false;
		}
	}

	verifyCaptcha(e) {
		// e.preventDefault();
		if( this.state.captcha === this.captchaEnter.value ){
			this.setState({
				captchaStatus: true
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

	Notification = ( title, text, type ) => {
		text = text === '' ? "Text" : text
		type = type === '' ? "success" : type
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

export default Register
