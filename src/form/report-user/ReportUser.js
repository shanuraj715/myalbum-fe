import React from 'react'

import Header from '../../shared/components/header/Header'
import Footer from '../../shared/components/footer/Footer'

import Helmet from 'react-helmet'

import MA_IMAGE from '../../assets/images/site-image-no-square.png'

import RCG from 'react-captcha-generator'
import isLentgh from 'validator/lib/isLength'
import isEmail from 'validator/lib/isEmail'

import c from '../../config.json'
/* notification */
import ReactNotification, { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

import './reportuser.css'

import { DisableRightClick, DisableDrag} from '../../assets/js/export-functions'

export class ReportUser extends React.Component{

    componentDidMount(){
        window.scrollTo(0, 0)
    }

    constructor( props ){
        super( props )
        this.captcha_result = this.captcha_result.bind( this )
        this.verifyCaptcha = this.verifyCaptcha.bind( this )
    }

    state = {
        captcha: ''
    }

    render(){
        return(
            <React.Fragment>
                <div className="app-notification-container">
                    <ReactNotification />
                </div>
                <Helmet>
                    <title>Report User Account | {c.MAIN_TITLE}</title>
                </Helmet>
                <Header updateLogin={this.props.updateLogin} logged={ this.props.logged } />
                <div className="form-container" onContextMenu={ DisableRightClick }>
                    <div className="form-left-area">
                        <div className="form-img-cont">
                            <img className="form-img" src={ MA_IMAGE } alt="" onMouseDown={ DisableDrag } />
                        </div>
                        <p className="form-left-text">Write something about this page. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.</p>
                        <div className="form-divider"></div>
                    </div>
                    <div className="form-right-area">
                        <div className="report-user-form-container">
                            <p className="form-title">Report User</p>
                            <div className="report-user-form">
                                <div className="form-inp-box">
                                    <p className="form-inp-title"><i className="fas fa-angle-double-right frm-inp-icon"></i>Your Name</p>
                                    <input className="form-inp" type="text" placeholder="" id="ru-name" />
                                </div>
                                
                                <div className="form-inp-box">
                                    <p className="form-inp-title"><i className="fas fa-at frm-inp-icon"></i>Your Email</p>
                                    <input className="form-inp" type="email" placeholder="" id="ru-email" />
                                </div>
                                
                                <div className="form-inp-box">
                                    <p className="form-inp-title"><i className="fas fa-user frm-inp-icon"></i>Whom do you want to report?</p>
                                    <input className="form-inp" type="text" placeholder="Username or Email address" id="ru-to-report" />
                                </div>
                                
								<div className="form-inp-box">
									<p className="form-inp-title"><i className="fas fa-comments frm-inp-icon"></i>Reason for Reporting</p>
									<textarea className="form-txt-area" maxLength='512' type="email" id="ru-message" placeholder="Please enter a valid reason for reporting."></textarea>
								</div>
                                
								<div className="form-captcha-box">
									<RCG result={ this.captcha_result } />
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

    submitForm = () => {
        let name = document.getElementById('ru-name').value
        let email = document.getElementById('ru-email').value
        let username = document.getElementById('ru-to-report').value
        let message = document.getElementById('ru-message').value

        if( isLentgh( name, { min: 2, max: 32 }) ){
            if( isLentgh( username, { min: 6, max: 64 } ) ){
                if( isEmail( email ) ){
                    if( isLentgh( message, { min: 12, max: 512 } ) ){
                        if( this.verifyCaptcha() ){
                            console.log("API Query here")
                        }
                        else{
                            this.Notification('', 'Captcha code incorrect.', 'warning')
                            document.getElementById('captcha-inp').value = ''
                        }
                    }
                    else{
                        this.Notification('', 'Message length should be in between 12 to 512 characters.', 'warning')
                    }
                }
                else{
                    this.Notification('', 'Invalid Email Address. Please enter correct email address', 'warning')
                }
            }
            else{
                this.Notification('', 'Please type correct username or email address of the user.', 'warning')
            }
        }
        else{
            this.Notification('', 'Your name length should be in between 2 to 32 characters.', 'warning')
        }

    }

    captcha_result = ( text ) => {
        this.setState({
            captcha: text
        })
    }

    verifyCaptcha = () => {
        if( this.state.captcha === this.captchaEnter.value ){
            return true
        }
        else{
            return false
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
            animationOut: ['animate__animated animate__fadeOut'],
            dismiss: {
                duration: 4000
            }
        })
    }

}

export default ReportUser