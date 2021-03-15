import React from 'react'
import Helmet from 'react-helmet'
import Header from '../../shared/components/header/Header'
import Footer from '../../shared/components/footer/Footer'
import AdminImage from '../../assets/images/admin.jpg'
import c from '../../config.json'
import SocialButtonsContainer from 'react-social-media-buttons'
import { Link } from 'react-router-dom'

import './about.css'

export default class About extends React.Component{

  componentDidMount(){
    window.scrollTo(0, 0)
  }

    render(){
        return(
            <React.Fragment>
                <Helmet> 
                    <title>About Us | { c.MAIN_TITLE }</title>
                </Helmet>
                <Header updateLogin={this.props.updateLogin} logged={ this.props.logged } />
                <div className="page-container notextselect">
                    <h1 className="page-h1">About { c.MAIN_TITLE }</h1>
                    <div className="page-divider"></div>
                    <div className="page-data-container">
                      <h5 className="page-txt1 bold">
                        <Link to="/" className="page-anchor">{ c.MAIN_TITLE }</Link> is a service to provide users a best place to store their image files. Theme based design and encrypted files are our top priority.
                      </h5>
                      <h5 className="page-txt1">
                          We are are currently developing our services and we also provide a report bug form for the users to report any type of bug.
                          
                      </h5>
                      <ul className="page-ul">
                            <li className="page-li">A service which helps users to manage their image files on cloud.</li>
                            <li className="page-li">Any one can register and upload their photos on the server.</li>
                            <li className="page-li">Encrypted files on secure servers.</li>
                            <li className="page-li">File security is the main motive.</li>
                            <li className="page-li">Categorize image in albums.</li>
                            <li className="page-li">Different themes for different albums.</li>
                        </ul>

                      <h2 className="page-h2">About Developer</h2>
                      <div className="page-divider"></div>
                      <div className="page-flex-2-sec about-page-dev-data-cont">
                        <div className="app-profile-card align-center">
                          <div className="app-profile-card-image-cont">
                            <img src={ AdminImage } alt="" className="app-profile-card-image" />
                          </div>
                          <span className="app-card-user-name">Shanu Raj</span>
                        </div>

                        <div className="page-flex-2-right-cont">
                          <span className="page-txt2 about-dev-text-padd">Mr. Shanu Raj loves programming and he is a full stack web developer. He created many web sites and web applications. He is the founder of 
                          <Link to="/" className="page-anchor"> { c.MAIN_TITLE }</Link>, a company that provides image storage service to their users.</span>
                          <br />
                          <span className="page-txt2 about-dev-text-padd">He has done his BCA from GGSIPU (Guru Gobind Singh Indraprastha University), Delhi - India and currently pursuing his MCA from the same university.</span>
                          <br />
                          <span className="about-dev-text-padd">
                            <SocialButtonsContainer className="page-text-right"
                              links={['https://www.facebook.com/shanuraj715','https://www.instagram.com/shanu_the_web_dev','https://github.com/shanuraj715','mailto:shanuraj715@gmail.com']}
                              buttonStyle={{width: '40px', height: '40px', margin: '0px 10px', backgroundColor: '#e83e8c', borderRadius: '50%'}}
                              iconStyle={{color: '#ffffff'}}
                              openNewTab={true}
                            />
                          </span>
                        </div>
                      </div> 
                      

                    </div>
                </div>
                <Footer />
            </React.Fragment>
        )
    }

}