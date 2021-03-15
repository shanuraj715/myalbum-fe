import React from 'react'
import Header from '../../shared/components/header/Header'
import Footer from '../../shared/components/footer/Footer'
import Helmet from 'react-helmet'
import RCG from 'react-captcha-generator'
import MA_IMAGE from '../../assets/images/logo-512x512.png'
import c from '../../config.json'
import axios from 'axios'
import isLength from 'validator/lib/isLength'
import isEmail from 'validator/lib/isEmail'
/* notification */
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

import { ToastContainer, toast } from 'material-react-toastify'
import { DisableRightClick, DisableDrag } from '../../assets/js/export-functions'
import './reportbug.css'

export class ReportBug extends React.Component{

    componentDidMount(){
        window.scrollTo(0, 0)
    }

    constructor( props ){
        super( props )
        this.result = this.result.bind( this )
        this.verifyCaptcha = this.verifyCaptcha.bind( this )
    }

    state = {
        captcha: '',
        selectedFiles: ''
    }

    fileSelected = (e) => {
        let files = e.target.files[0]
        this.setState({
            selectedFiles: files
        })
    }

    render(){
        return(
            <React.Fragment>
                <Helmet>
                    <title>Report Bug | {c.MAIN_TITLE}</title>
                </Helmet>
                <div className="app-notification-container">
                    <ReactNotification />
                </div>
                <ToastContainer />
                <Header updateLogin={this.props.updateLogin} logged={ this.props.logged } />
                <div className="form-container" onContextMenu={ DisableRightClick}>
                    <div className="form-left-area">
                        <div className="form-img-cont">
                            <img src={ MA_IMAGE } alt="site_image" className="form-img" onMouseDown={ DisableDrag } />
                        </div>
                        <p className="form-left-text">Relied upon by more than 11 million developers worldwide, npm is committed to making JavaScript development elegant, productive, and safe. The free npm Registry has become the center of JavaScript code sharing, and with more than one million packages, the largest software registry in the world. Our other tools and services take the Registry, and the work you do around it, to the next level.</p>
                        <div className="form-divider"></div>
                    </div>
                    <div className="form-right-area">
                        <div className="report-bug-form-container">
                            <p className="form-title clr-red"><i className="far fa-bug form-title-icon"></i>Report Bug</p>
                            <div className="report-bug-form">
                                <div className="form-inp-box">
                                    <p className="form-inp-title"><i className="fas fa-angle-double-right frm-inp-icon"></i>Full Name</p>
                                    <input type="text" className="form-inp" id="rb-name" placeholder="" maxLength="32" />
                                </div>
                                <div className="form-inp-box">
                                    <p className="form-inp-title"><i className="fas fa-at frm-inp-icon"></i>Valid Email</p>
                                    <input type="email" className="form-inp" id="rb-email" placeholder="" maxLength="32" />
                                </div>
                                <div className="form-inp-box">
                                    <p className="form-inp-title"><i className="fas fa-comments frm-inp-icon"></i>Explain In Brief</p>
                                    <textarea className="form-txt-area" id="rb-message" placeholder="" maxLength="512"></textarea>
                                </div>
                                <div className="form-inp-box no-overflow">
                                    <p className="form-inp-title"><i className="fas fa-image frm-inp-icon"></i>Screenshot (Optional)</p>
                                    <input type="file" className="form-inp" id="rb-file" accept="image/*" onChange={ this.fileSelected } />
                                </div>

                                <div className="form-inp-box">
                                    <RCG result={ this.result } />
                                    <input type="text" className="captcha-input" maxLength="5" ref={ref => this.captchaEnter = ref} id="captcha-inp" />
                                </div>

                                <div className="form-btns-cont">
                                    <button className="form-blue-btn" onClick={ this.submitForm }>Report</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        )
    }

    submitFormData = ( name, email, message ) => {
        let selectedFile = this.state.selectedFiles
        let formData = new FormData()
        formData.append('file', selectedFile)

        /**
         * send post request to Server
         * to upload the file
         */
        axios.post(c.apiUrl + '/report-bug/file', formData, {
            headers: {"Content-Type": "multipart/form-data"},
        })
        .then( json => {
            if( json.data.status ){
                let data = {
                    name: name,
                    email: email,
                    message: message,
                    file_name: json.data.file_name
                }
                axios.post(c.apiUrl + '/report-bug', {
                    body: data
                },{
                    headers: {"Content-Type": "application/json"},
                })
                .then( json => {
                    if( json.data.status ){
                        toast.dark("Message sent.", {
                            position: "bottom-left",
                            autoClose: 6000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: '',
                        })
                    }
                    else{
                        toast.error(json.data.error.message, {
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
            else{
                toast.error( json.data.error.message , {
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
            toast.error("Unable to send request. Try again later1", {
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

    

    submitForm = async () => {
        let name = document.getElementById('rb-name').value
        let email = document.getElementById('rb-email').value
        let comments = document.getElementById('rb-message').value

        if( isLength( name, { min: 2, max: 32 } ) ) {
            if( isEmail( email ) ){
                if( isLength( comments, { min: 12, max: 512 } ) ){
                    if( this.verifyCaptcha() ){
                        
                        this.submitFormData( name, email, comments )
                        
                    }
                    else{
                        this.Notification( '', 'Invalid Captcha Code.', 'warning')
                    }
                }
                else{
                    this.Notification( '', 'Please enter a valid comment. 12 to 512 characters are allowed.' , 'warning' )
                }
            }
            else{
                this.Notification('', 'Please enter a valid email address', 'warning')
            }
        }
        else{
            this.Notification('', 'Name length should be in between 2 to 32 characters', 'warning')
        }
    }

    verifyCaptcha = () => {
        if( this.state.captcha === this.captchaEnter.value ){
            return true
        }
        else{
            return false
        }
    }

    result = ( text ) => {
        this.setState({ captcha: text })
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

export default ReportBug