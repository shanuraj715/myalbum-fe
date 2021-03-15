import React from 'react'
import Helmet from 'react-helmet'
import c from '../../config.json'
import background from './p404.png'

import './404page.css'
import { Link } from 'react-router-dom'


export default class Page404 extends React.Component{

    
    componentDidMount(){
        var container = document.getElementById('err404-container')
        window.onmousemove = function(e){
            var x = - e.clientX/5
            var y = - e.clientY/5
            container.style.backgroundPositionX = x + 'px'
            container.style.backgroundPositionY = y + 'px'
        }
    }

    render(){
        return(
            <React.Fragment>
                <Helmet>
                    <title>Page Not Found | { c.MAIN_TITLE }</title>
                </Helmet>
                <div className="err404-main-cont notextselect">
                    <div className="" id="err404-container" style={{ backgroundImage: `url(${ background })`}}>
                        <div className="err404-content">
                            <h2>404</h2>
                            <h4>Oops! Page not found</h4>
                            <p>The page you were looking for doesn't exist. You may have mistyped the address or the page may have moved.</p>
                            <Link to="/">Back to home</Link>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}