import React from 'react'
import './activateaccount.css'
import Helmet from 'react-helmet'
import Header from '../shared/components/header/Header'
import Footer from '../shared/components/footer/Footer'
import c from '../config.json'
import Loading from '../shared/components/loading/Loading'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'material-react-toastify'

export default class ActivateAccount extends React.Component{

    state = {
        doingRequest: true,
        status: ''
    }

    componentDidMount(){
        const key = window.location.href.split('/')[window.location.href.split('/').length - 1] || window.location.href.split('/')[window.location.href.split('/').length - 2]
        
        fetch(c.apiUrl + '/activate/account/' + key, {
            method: 'get',
            headers: {"Content-Type": 'application/json'}
        })
        .then( res => {
            if( res.ok ){
                return res.json()
            }
            else{
                toast.dark("Error", {
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
        .then( json => {
            console.log( json )
            if( json.status ){
                this.setState({
                    doingRequest: false,
                    status: true
                })
            }
            else{
                this.setState({
                    doingRequest: false,
                    status: false
                })
            }
        })
        .catch( err => {
            toast.error("Server error. Check your internet", {
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

    render(){
        return(
            <React.Fragment>
                { this.props.logged ? <Redirect to="/albums" /> : null }
                <Helmet>
                    <title>Activate Account | {c.MAIN_TITLE}</title>
                </Helmet>
                <ToastContainer />
                <Header />
                <div className="acc-active-page-container">
                    { this.state.doingRequest ? 
                    <div className="aa-loading-cont">
                        <Loading text="Validating Activation token." />
                    </div>
                    : null }
                    { this.state.status === true ? 
                    <div className="aa-success-cont">
                        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>
                        <p className="aa-text-cont">
                            <span>Account Verified Successfully.</span>
                            <span>Now you can login to your account.</span>
                        </p>
                        <div className="aa-btn-cont">
                            <Link to="/login">
                                <button className="aa-login-btn">Login</button>
                            </Link>
                        </div>
                    </div>
                    : null }
                    { this.state.status === false ? 
                    <div className="aa-failed-container">
                        <div className="aa-icon-cont">
                            <span className="aa-cross-icon">
                                <i className="far fa-times-circle"></i>
                            </span>
                        </div>
                        <p className="aa-text-cont">
                            <span>Invalid or Expired Activation Token.</span>
                        </p>
                    </div>
                    : null }
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}