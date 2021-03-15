import React from 'react'

import Header from '../../shared/components/header/Header'
import Footer from '../../shared/components/footer/Footer'

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

import Helmet from 'react-helmet'


import './updatelog.css'

export class UpdateLog extends React.Component{
    
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
}

export default UpdateLog