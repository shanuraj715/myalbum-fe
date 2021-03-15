import React from 'react'

import Header from '../../shared/components/header/Header'
import Footer from '../../shared/components/footer/Footer'
import RCG from 'react-captcha-generator'

import { Redirect } from 'react-router-dom'
import MA_IMAGE from '../../assets/images/site-image-no-square.png'

import { DisableRightClick, DisableDrag } from '../../assets/js/export-functions'

import { isLength, isEmail } from 'validator'
import c from '../../config.json'

/* notification */
import ReactNotification, { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'
import { ToastContainer, toast } from 'material-react-toastify'

import './contactus.css'
import { Helmet } from 'react-helmet'



export class ContactUs extends React.Component{

	componentDidMount(){
		window.scrollTo(0, 0)
		this.setState({
			redirect: false
		})
	}


	state = {
		captcha_text: '',
		redirect: false
	}

	constructor( props ){
		super( props )
		this.result = this.result.bind( this )
		this.verifyCaptcha = this.verifyCaptcha.bind( this )
	}

	render(){
		return(
			<React.Fragment>
				<Helmet>
					<title>Contact Us | {c.MAIN_TITLE}</title>
				</Helmet>
				<ToastContainer />
				<div className="app-notofication-container">
					<ReactNotification />
				</div>
				<Header updateLogin={this.props.updateLogin} logged={ this.props.logged } />
				{ this.state.redirect ? <Redirect to='/' /> : null }
				<div className="form-container notextselect" onContextMenu={ DisableRightClick }>
					<div className="form-left-area">
						<div className="form-img-cont">
							<img src={ MA_IMAGE } className="form-img" alt="contact-us" onMouseDown={ DisableDrag } />
						</div>
						<p className="form-left-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
						<div className="form-divider"></div>
						<div className="cf-email-cont">
							<p className="cf-email-cont-title">You can directly contact us on the below Email id's.</p>
							<span className="cf-email-list">shanuraj715@gmail.com</span>
							<span className="cf-email-list">support@techfacts007.in</span>
						</div>
					</div>
					<div className="form-right-area">
						<div className="contact-form-container">
							<p className="form-title">Contact Us</p>
							<div className="contact-form">
								<div className="form-inp-box">
									<p className="form-inp-title"><i className="fas fa-angle-double-right frm-inp-icon"></i>Full Name</p>
									<input className="form-inp" type="text" placeholder="" id="cf-name" />
								</div>
								<div className="form-inp-box">
									<p className="form-inp-title"><i className="fas fa-at frm-inp-icon"></i>Email Address</p>
									<input className="form-inp" type="email" placeholder="" id="cf-email" />
								</div>
								<div className="form-inp-box">
									<p className="form-inp-title"><i className="fas fa-comments frm-inp-icon"></i>Message</p>
									<textarea className="form-txt-area" type="email" placeholder="" id="cf-message"></textarea>
								</div>
								<div className="form-captcha-box">
									<RCG result={ this.result } />
									<input type="text" maxLength='5' className="form-captcha-inp" ref={ref=> this.captchaEnter = ref} id="captcha-inp" />
								</div>
								
								<div className="form-btns-cont">
									<button className="form-blue-btn" onClick={ this.submitForm }>Submit</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</React.Fragment>
		)
	}

	result = ( text ) => {
		this.setState({
			captcha_text: text 
		})
	}

	verifyCaptcha = () => {
		if( this.state.captcha_text === this.captchaEnter.value ){
			return true
		}
		else{
			return false
		}
	}

	submitForm = () => {
		let name = document.getElementById("cf-name").value
		let email = document.getElementById("cf-email").value
		let message = document.getElementById("cf-message").value

		if( isLength( name, { min: 4, max: 32 } ) ){
			if( isEmail( email ) ){
			if( isLength( message, { min: 15, max: 512 } ) ){
				if( this.verifyCaptcha() ){
					fetch( c.apiUrl + '/contact_us/', {
						method: 'post',
						headers: {'Content-Type' : 'application/json'},
						body: JSON.stringify({name, email, message})
					})
					.then( res => {
						return res.json()
					})
					.then( res => {
						if( res.status ){
							toast.dark("Message Sent.", {
								position: "bottom-left",
								autoClose: 6000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: '',
							})
							this.redirectTimeout = setTimeout( () => {
								this.setState({
									redirect: true
								})
							}, 6000)
						}
						else{
							toast.error(res.error.message, {
								position: "bottom-left",
								autoClose: 6000,
								hideProgressBar: true,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: '',
							})
						}
					})
					.catch( err => {
						toast.error("Unable to communicate with server.", {
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
					document.getElementById('captcha-inp').value = ''
					this.Notification( '', 'Invalid or Wrong captcha code', 'warning' )
				}
			}
			else{
				this.Notification( '', 'Message length should be in between 15 to 512 characters.', 'warning' )
			}
			}
			else{
			this.Notification('', 'Invalid or Wrong email address', 'warning')
			}
		}
		else{
			this.Notification('', 'Name length should be in between 4 to 32 characters.', 'warning')
		}
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
			animationOut: ['animate__animated animate_fadeOut'],
			dismiss: {
			duration: 4000
			}
		})
	}
}

export default ContactUs