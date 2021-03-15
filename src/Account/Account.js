import React from 'react'
import Helmet from 'react-helmet'
import Header from '../shared/components/header/Header'
import Footer from '../shared/components/footer/Footer'
import c from '../config.json'
import { Redirect, Link } from 'react-router-dom'
import UserImage from '../assets/images/default-user-image.png'
import DotDivider from '../shared/components/DotDivider/DotDivider'
import { DisableDrag, DisableRightClick } from '../assets/js/export-functions'

import './account.css'

export default class Account extends React.Component{

	state = {
    albums: [
      {
        albumId: 'asdfghikjldjdfhdgfh',
        albumName: "Album 1"
      },
      {
        albumId: 'asdfghikjldjdfhdgfh',
        albumName: "Album 2"
      },
      {
        albumId: 'asdfghikjldjdfhdgfh',
        albumName: "Album 3"
      },
      {
        albumId: 'asdfghikjldjdfhdgfh',
        albumName: "Album 4"
      },
      {
        albumId: 'asdfghikjldjdfhdgfh',
        albumName: "Album 5"
      },
      {
        albumId: 'asdfghikjldjdfhdgfh',
        albumName: "Album 6"
      }
    ]
	}

	render(){
		return(
			<React.Fragment>
				{/* { !this.props.logged ? <Redirect to="/" /> : null } */}
				<Helmet>
					<title>shanuraj715 | { c.MAIN_TITLE }</title>
				</Helmet>
				<Header updateLogin={this.props.updateLogin} logged={ this.props.logged } />

				<div className="profile-page-cont notextselect">
					<div className="profile-left">
            <div className="profile-data-box">
              <div className="profile-cover-img-container">
                <img src="" className="cover-image" alt="" onMouseDown={ DisableDrag }/>
                <button className="cover-image-edit-button"><i className="far fa-pencil"></i></button>
                <div className="img-box">
                  <img src={ UserImage} className="user-image" alt="" onMouseDown={ DisableDrag }/>
                  <span className="user-image-edit-btn"><i className="far fa-pencil"></i></span>
                </div>
              </div>
              <div className="user-profile-details">
                <p className="profile-user-name">
                  <span className="">Shanu Raj</span></p>
                <p className="profile-username">shanuraj715</p>
                <span className="user-bio">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.</span>
              </div>
            </div>

            <div className="user-more-cont notextselect">
              <div className="user-more-row">
                <span className="user-more-opt bold">Gender</span>
                <span className="user-more-opt">Male</span>
              </div>
              <div className="user-more-row">
                <span className="user-more-opt bold">Date of Birth</span>
                <span className="user-more-opt">18 June 1999</span>
              </div>
              <div className="user-more-row">
                <span className="user-more-opt bold">Hobbies</span>
                <div className="ua-hobbies-cont">
                  <span className="ua-hobby">Games</span>
                  <span className="ua-hobby">Music</span>
                  <span className="ua-hobby">Books</span>
                  <span className="ua-hobby">Action Games</span>
                </div>
              </div>

              <div className="user-more-row">
                <span className="user-more-opt bold">Social Profiles</span>
                <div className="usp-cont">
                  <Link to="/" target="_blank">
                    <span className="usp-link usp-link-facebook"><i className="fab fa-facebook-f"></i></span>
                  </Link>
                  <Link to="/" target="_blank">
                  <span className="usp-link usp-link-twitter"><i className="fab fa-twitter"></i></span>
                  </Link>
                  <Link to="/" target="_blank">
                  <span className="usp-link usp-link-instagram"><i className="fab fa-instagram"></i></span>
                  </Link>
                  <Link to="/" target="_blank">
                  <span className="usp-link usp-link-whatsapp"><i className="fab fa-whatsapp"></i></span>
                  </Link>
                  <Link to="/" target="_blank">
                  <span className="usp-link usp-link-mobile"><i className="fas fa-mobile-alt"></i></span>
                  </Link>
                  <Link to="/" target="_blank">
                  <span className="usp-link usp-link-email"><i className="fas fa-at"></i></span>
                  </Link>
                  <Link to="/" target="_blank">
                  <span className="usp-link usp-link-linkedin"><i className="fab fa-linkedin-in"></i></span>
                  </Link>
                  <Link to="/" target="_blank">
                  <span className="usp-link usp-link-github"><i className="fab fa-github"></i></span>
                  </Link>
                  <Link to="/" target="_blank">
                  <span className="usp-link usp-link-youtube"><i className="fab fa-youtube"></i></span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="profile-btn-container">
              <button className="profile-bio-edit-btn">Edit Bio</button>
              <button className="profile-settings-btn">Settings</button>
            </div>



            <DotDivider />
            <div className="profile-ua-data-cont">
              <div className="ua-albums-tb-cont">
                <button className="ua-al-tb">Total (5)</button>
                <button className="ua-al-tb">Only Me (5)</button>
                <button className="ua-al-tb">Public (5)</button>
                <button className="ua-al-tb">Unlisted (5)</button>
                <button className="ua-al-tb">Specific (5)</button>
              </div>
              <div className="up-al-cont" onContextMenu={ DisableRightClick }>
                { this.state.albums.map( (item, index) => {
                  return(
                    <div className="up-al-card" key={ index }>
                      <p className="">{item.albumName}</p>
                    </div>
                  )
                })}
              </div>
            </div>
					</div>
				</div>

				<Footer />
			</React.Fragment>
		)
	}

}