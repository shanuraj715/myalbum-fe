import React from 'react'
import Helmet from 'react-helmet'
import c from '../../config.json'
import { Link } from 'react-router-dom'

import './403Page.css'


export default class Page404 extends React.Component{

    render(){
        return(
            <div className="fourzerothree">
                <Helmet>
                    <title>Page Not Found | { c.MAIN_TITLE }</title>
                </Helmet>
                <div className="base io"> 
                    <h1 className="io">403</h1>
                    <h2>Access forbidden</h2>
                    <Link to="/" className="page403-home-btn">Back to home</Link>
                </div>
            </div>
        )
    }
}