import React from 'react'
import Header from '../shared/components/header/Header'
import Footer from '../shared/components/footer/Footer'
import { ToastContainer, toast } from 'material-react-toastify'
import Helmet from 'react-helmet'
import c from '../config.json'
import isEmail from 'validator/lib/isEmail'

import './verify.css'

export default class Verify extends React.Component{

    state = {
        inputValue: "",
        sendBtnText: "Send Link"
    }

    changeHandler = (e) => {
        this.setState({
            inputValue: e.target.value 
        })
    }

    sendActivationLink = () => {
        const email = this.state.inputValue
        if( isEmail(email) ){
            fetch( c.apiUrl + '/verify', {
                method: 'post',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ email })
            })
            .then( res => {
                if( res.ok ){
                    return res.json()
                }
                else{
                    throw new Error("Server returned an error")
                }
            })
            .then( json => {
                if( json.status ){
                    console.log( json )
                }
                else{
                    console.log( json )
                }
            })
            .catch( err => {
                toast.dark("Success. Check your email", {
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
    }

    render(){
        return(
            <React.Fragment>
                <Helmet>
                    <title>Verify Account | { c.MAIN_TITLE }</title>
                </Helmet>
                <ToastContainer />
                <Header logged={ this.props.logged } updateLogin={this.props.updateLogin} />
                <div className="va-container">
                    <div className="va-head-cont">
                        <h1 className="va-h1">Verify Account</h1>
                        <p className="va-p">An activation link will send to your email address to verify your account. Link will valid for 30 minutes.</p>
                    </div>
                    <div className="va-inp-cont">
                        <div className="va-inp-block">
                            <input type="email" placeholder="Enter your email address" className="va-inp-text" onChange={ this.changeHandler } value={ this.state.inputValue } />
                            <button className="va-submit-button" onClick={ this.sendActivationLink }>{ this.state.sendBtnText }</button>
                        </div>
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}