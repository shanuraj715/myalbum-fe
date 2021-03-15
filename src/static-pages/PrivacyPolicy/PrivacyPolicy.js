import React, { Component } from 'react'
import Header from '../../shared/components/header/Header'
import Footer from '../../shared/components/footer/Footer'
import Helmet from 'react-helmet'
import c from '../../config.json'


import './privacypolicy.css'

export class PrivacyPolicy extends Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>Privacy Policy | { c.MAIN_TITLE }</title>
                </Helmet>
                <Header updateLogin={this.props.updateLogin} logged={ this.props.logged } />
                <div className="page-container notextselect">
                    <h1 className="page-h1">{ c.MAIN_TITLE } Privacy Policy</h1>
                    <p className="page-p-head">Effective date: 28 January 2021</p>
                    <div className="page-divider"></div>
                    <div className="page-data-container">
                        <span className="page-txt1">
                            This page informs you of our policies regarding the collection, use, 
                            and disclosure of personal data when you use our Service and the choices you have associated with that data.
                        </span>
                        <span className="page-txt1">
                            We use your data to provide and improve the Service. 
                            By using the Service, you agree to the collection and use of information in accordance with this policy.
                            Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, 
                            accessible from { c.MAIN_URL }
                        </span>
                        

                        <h2 className="page-h2">Information Collection And Use</h2>
                        <span className="page-txt1">
                            We collect several different types of information for various purposes to provide and improve our Service to you.
                        </span>
                        <span className="page-txt2 page-txt-red">
                            Types of Data Collected
                        </span>
                        <span className="page-txt1 bold">
                            Personal Data
                        </span>
                        <span className="page-txt1">
                            We may collect your Full Name, Phone Number, Email Address, Cookies and Usage Data.
                        </span>
                        <span className="page-txt1 bold">
                            Usage Data
                        </span>
                        <span className="page-txt1">
                            We may also collect information on how the Service is accessed and used (“Usage Data”). 
                            This Usage Data may include information such as your computer’s Internet Protocol address (e.g. IP address), 
                            browser type, browser version, the pages of our Service that you visit, the time and date of your visit, 
                            the time spent on those pages, unique device identifiers and other diagnostic data.
                        </span>
                        <span className="page-txt1 bold">
                            Tracking and Cookies Data
                        </span>
                        <span className="page-txt1">
                            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.
                        </span>

                        <h2 className="page-h2">Use of Data</h2>
                        <span className="page-txt1">
                            We use the collected data for various purposes.
                        </span>
                        <ul className="page-ul">
                            <li className="page-li">To provide and maintain the Service.</li>
                            <li className="page-li">To provide customer care support.</li>
                            <li className="page-li">To provide analysis or valuable information so that we can improve the Service.</li>
                            <li className="page-li">To monitor the usage of the Service</li>
                            <li className="page-li">To detect, prevent and address technical issues.</li>
                        </ul>
                        

                        <h2 className="page-h2">Service Providers</h2>
                        <span className="page-txt1 bold">
                            Analytics
                        </span>
                        <span className="page-txt1">
                            Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. 
                            Google uses the data collected to track and monitor the use of our Service. 
                            This data is shared with other Google services. 
                            Google may use the collected data to contextualize and personalize the ads of its own advertising network.
                        </span>
                        <span className="page-txt1">
                            For more information on the privacy practices of Google, 
                            please visit the Google Privacy &amp; Terms web page: <a title="Open in new tab" className="page-anchor bold" href="https://policies.google.com/privacy?hl=en" rel="noreferrer" target="_blank">https://policies.google.com/privacy?hl=en</a>
                        </span>

                        <h2 className="page-h2">Contact Information</h2>
                        { c.SUPPORT_EMAIL.map( (item, index) => {
                            return(<span className="page-txt1 page-contact-txt bold" key={ index }>{ item }</span>)
                        })}

                    </div>
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}


export default PrivacyPolicy