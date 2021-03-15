import React, { Component } from 'react'
import Header from '../shared/components/header/Header'
import Footer from '../shared/components/footer/Footer'
import Helmet from 'react-helmet'
import c from '../config.json'
import { Link } from 'react-router-dom'
import logo from '../assets/images/site-image-no-square.png'
import Image1 from '../assets/images/homepage/upload file image.PNG'
import Image2 from '../assets/images/homepage/album page.PNG'
import Image3 from '../assets/images/homepage/album preview.PNG'
import DotDivider from '../shared/components/DotDivider/DotDivider'
import Ribbon from '../shared/components/Ribbon/Ribbon'
import { DisableDrag, DisableRightClick } from '../assets/js/export-functions'
import FeatureCard from './comps/feature-card/Card'


import './home.css'

export class Home extends Component {

    componentDidMount(){
        window.scrollTo(0, 0)
    }

    

    state = {

    }
    
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>Homepage | {c.MAIN_TITLE}</title>
                </Helmet>
                <Header logged={this.props.logged} updateLogin={ this.props.updateLogin } />
                <div className="home-main-top-1 notextselect" onContextMenu={ DisableRightClick }>
                    <div className="home-top-container">
                        <div className="home-top-img-block">
                            <img src={ logo } className="ht-img" alt="" onMouseDown={ DisableDrag } />
                        </div>
                        <div className="">
                            <span className="ht-text">{ c.MAIN_TITLE }</span>
                            <span className="ht-text2">A place where you save and share your memories.</span>
                        </div>
                    </div>
                </div>

                <section className="home-feature-section notextselect" onContextMenu={ DisableRightClick }>
                    <div className="h-feature-text-cont">
                        <h4 className="h-feature-h4">
                            Easy to Upload and Share memories
                        </h4>
                        <span className="h-feature-desc">
                            Different albums for your different memories. Uploading is easy and supports multiple file upload at a time. Files will get encrypted after upload. Share your memories with anyone in the world. 
                        </span>
                    </div>
                    <div className="h-feature-img-cont">
                        <div className="h-feature-img-block">
                            <img src={ Image1 } className="h-feature-img" alt="" onMouseDown={ DisableDrag } />
                        </div>
                    </div>
                </section>

                <section className="home-feature-section notextselect" onContextMenu={ DisableRightClick }>
                    <div className="h-feature-img-cont">
                        <div className="h-feature-img-cont">
                            <img src={ Image2 } className="h-feature-img" alt="" onMouseDown={ DisableDrag } />
                        </div>
                    </div>
                    <div className="h-feature-text-cont">
                        <h4 className="h-feature-h4">
                            Easy to Create and Manage albums
                        </h4>
                        <span className="h-feature-desc">
                            Craete and manage all your albums from a single page. No need to visit different pages for different work. All options are available in a single page. Customization is easy. Your album security is our first priority.
                        </span>
                    </div>
                </section>

                <section className="home-feature-section notextselect" onContextMenu={ DisableRightClick }>
                    <div className="h-feature-text-cont">
                        <h4 className="h-feature-h4">
                            Themes for your albums
                        </h4>
                        <span className="h-feature-desc">
                            Customize your album design with different themes. Choose your desired theme from the list. We provide many themes for different occasions like: 
                            <br /><br />
                            <ul className="home-ul">
                                <li>Classic Theme</li>
                                <li>Birthday Theme</li>
                                <li>Love Theme</li>
                                <li>Valentine Theme</li>
                                <li>Anniversary Theme</li>
                                <li>and more...</li>
                            </ul>
                        </span>
                    </div>
                    <div className="h-feature-img-cont">
                        <div className="h-feature-img-cont">
                            <img src={ Image3 } className="h-feature-img" alt="" onMouseDown={ DisableDrag } />
                        </div>
                    </div>
                </section>

                
                
                <div className="h-start-btn-cont notextselect" onContextMenu={ DisableRightClick }>
                    <Link to={ this.props.logged ? '/albums' : '/register' } className="home-start-btn">Let's get started</Link>
                </div>

                <div className="home-divider-cont" onContextMenu={ DisableRightClick }>                
                    <DotDivider />
                </div>

                <div className="home-divider-cont notextselect" onContextMenu={ DisableRightClick }>                
                    <Ribbon text="More Features" />
                </div>

                

                <section className="home-card-cont notextselect" onContextMenu={ DisableRightClick }>
                    <FeatureCard iconClass="fas fa-share-alt" title="Sharing" text="Sharing is important and we know the value of your memories. Share your memories with your friends and families. We provide 3 types of sharing. Public, via Link and You can also share your album with some specified persons." />
                    <FeatureCard iconClass="fas fa-key" title="Encrypted Files" text="We encrypt your all personal data and files. Our first priority is to protect user data and no one can access you data. Every user has their own different data encryption method." />
                    <FeatureCard iconClass="fas fa-lock" title="Lock Album" text="Lock your albums with passwords. Set different password on different albums. Protect album with password while sharing. Another user must have to enter the password to view your album." />
                    <FeatureCard iconClass="fas fa-user-secret" title="Custom Privacy" text='Custom privacy is a unique feature for albums. You can set different privacy settings on your albums. Choose from "Only Me", "Public" or "Unlisted". Try these options.' />
                    <FeatureCard iconClass="fas fa-download" title="Album Downloading" text='Whenever you want to download your album you can do this with just a single click. Your album will download on your device.' />
                </section>



                <Footer />
            </React.Fragment>
        )
    }
}

export default Home
