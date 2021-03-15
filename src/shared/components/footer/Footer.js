import React, { Component } from 'react'
import './footer.css'
import {Link} from 'react-router-dom'

export class Footer extends Component {
    render() {
        return (
            <div className="main-footer">
                <div className="footer1">
                    <span className="footer-heading">Company</span>
                    <div className="footer-data-block">
                        <span className="footer-link"><i className="far fa-address-card footer-icon"></i><Link to="/about">About</Link></span>
                        <span className="footer-link"><i className="far fa-at footer-icon"></i><Link to="/contact-us">Contact</Link></span>
                        <span className="footer-link"><i className="far fa-balance-scale footer-icon"></i><Link to="/tnc">Terms & Conditions</Link></span>
                        <span className="footer-link"><i className="far fa-user-secret footer-icon"></i><Link to="/privacy-policy">Privacy Policy</Link></span>
                    </div>
                </div>
                <div className="footer2">
                    <span className="footer-heading">Help</span>
                    <div className="footer-data-block">
                        <span className="footer-link"><i className="far fa-question footer-icon"></i><Link to="/help">Need Help</Link></span>
                        <span className="footer-link"><i className="far fa-bug footer-icon"></i><Link to="/report-bug">Report Bug</Link></span>
                        <span className="footer-link"><i className="far fa-user-lock footer-icon"></i><Link to="/report-user">Report User Account</Link></span>
                        <span className="footer-link"><i className="far fa-palette footer-icon"></i><Link to="/request-theme">Request A Theme</Link></span>
                    </div>
                </div>
                <div className="footer3">
                    <span className="footer-heading">More</span>
                    <div className="footer-data-block">
                        {/* <span className="footer-link"><i className="far fa-clipboard-list footer-icon"></i><Link to="/update-log">Updates Log</Link></span> */}
                        <span className="footer-link"><i className="far fa-exclamation-circle footer-icon"></i>Version: 1.0</span>
                        <span className="footer-link">Project started on 27 Oct 2020</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer
