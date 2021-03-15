import React from 'react'

import Header from '../../shared/components/header/Header'
import Footer from '../../shared/components/footer/Footer'

import Helmet from 'react-helmet'


/* notification */
import ReactNotification, { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

import './requesttheme.css'

export class RequestTheme extends React.Component{

    componentDidMount(){
        window.scrollTo(0, 0)
    }

    state = {

    }

    render(){
        return(
            <React.Fragment>
                <div className="app-notification-container">
                    <ReactNotification />
                </div>
                <Helmet>

                </Helmet>
                <Header updateLogin={this.props.updateLogin} logged={ this.props.logged } />

                <Footer />
            </React.Fragment>
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

export default RequestTheme