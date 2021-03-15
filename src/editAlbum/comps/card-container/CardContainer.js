import React from 'react'

import Loading from '../../../shared/components/loading/Loading'
import c from '../../../config.json'
import axios from 'axios'

import ImageCarousel from '../carousel/ImageCarousel'

import ImageCard from '../imagecard/ImageCard'
import ScrollAnimation from 'react-animate-on-scroll'
import 'animate.css/animate.min.css'
import Cookies from 'universal-cookie'

import { ToastContainer, toast } from 'material-react-toastify'
import 'material-react-toastify/dist/ReactToastify.css';

import Uploader from './comps/Uploader'

import './cardcontainer.css'

const cookie = new Cookies()

export class CardContainer extends React.Component{
    state = {
        sessionId: cookie.get('sessionId'),
        albumid: this.props.aid,
        isLoading: true,
        carouselVisible: false,
        startCarouselFrom: 0,
        files: []
    }

    componentDidMount(){
        this.getFiles()
    }

    /**
     * to create and return an object of arrays of files.
     * this object will send to the server
     */
    filesData = () => {
        let dataToReturn = []
        this.state.files.map( (item ) => {
            dataToReturn.push( item.enc_name )
            return true
        })
        return dataToReturn
    }

    /**
     * send data to Server
     */

    sendData = () => {
        
    }

    /**
     * hide the carousel
     * sent to Carousel component as props.
     * carousel component will call this function to hide
     */

    hideCarousel = () => {
        this.setState( {
            carouselVisible: false
        })
    }
    
    /**
     * to show the image carousel component
     * sent to Image card component as props.
     * Image card component will use this function to show the carousel component
     */

    openCarousel = (from) => {
        this.setState({
            startCarouselFrom: from,
            carouselVisible: true
        })
    }

    /**
     * updatefillist will update the file value from the state object
     * this function will be called after when this component will
     * fetch the file data from the server
     */

    updateFileList = ( data ) => {
        this.setState({
          files: data
        }, () => {
        //   console.log( this.state.files )
        })
    }

    /**
     * Used to remove one by one image
     * sent to Image Card as props
     * card will use this function to remove any particular image from the state.files as array
     * receive the image index as position
     * position must be in numeric min 0 max { upto max images - 1 }
     */

    removeImageHandler = ( key ) => {
        let data = this.state.files
        data.splice( key, 1 )
        this.setState({
          files: data
        })
    }

    /**
     * used to remove all images from the state.files
     * this function will empty the state.files array
     */

    removeAllImages = () => {
        this.setState({
            files: []
        })
    }

    /**
     * get files from the Server
     * called when component mounted { componentDidMount() }
     * and also can be called to referesh the files list from the server
     */

    getFiles = () => {
        axios.get( c.apiUrl + '/edit-album/files/' + this.props.aid, {
            headers: {
                'Content-Type': 'application/json',
                "sessionId": cookie.get("sessionId")
            }
        } )
        .then( res => {
            // console.log( res.data )
            this.setState({
                isLoading: false
            }, () => {
                this.updateFileList( res.data.files )
            })
        })
        .catch( error => {

        })
    }

    changeSavingStatus = ( bool ) => {
		this.props.updateSaveStatus( bool )
	}


    imageCards = () => {
        return(
          this.state.files.map( ( item, index ) => {
            return( 
                <ScrollAnimation animateIn='flipInY' animateOut='flipOutY' className="inline-block" key={ index }>
                    <ImageCard openCarousel={ this.openCarousel } img_data={ item } cardIndex={ index } removeBtn={ this.removeImageHandler } />
                </ScrollAnimation>
            )
          })
        )
    }

    showToast = (message, type) => {
		if( type === 'dark' ){
			toast.dark(message, {
                position: "bottom-left",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: '',
            })
		}
		if( type === 'error' ){
			toast.error(message, {
                position: "bottom-left",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: '',
            })
		}
	}

    render(){
        return(
            <React.Fragment>
                <div className="card-container">
                { this.props.saveState ? <Uploader
                    data={ this.filesData() }
					sessionId={ this.state.sessionId }
					albumId={ this.state.albumid }
					savingStatusToggler={ this.changeSavingStatus }
					toast={ this.showToast }
                /> : null }
                    <ToastContainer />
                    <div className="ea-files-head">
                        <p className="ea-files-ht"><i className="far fa-images ea-files-hi"></i>{ this.state.files.length } Files in this Album</p>
                        {/* <p className="ea-files-count-text">{ this.props.files.length } File(s)</p> */}
                        { this.state.files.length !== 0 ? 
                            <button className="ea-files-delete-btn" onClick={ this.removeAllImages }>
                                <i className="far fa-trash-alt ea-btn-icon"></i>Delete All
                            </button>
                        : null }
                    </div>
                    <div>
                        { this.state.isLoading ? <Loading /> : this.imageCards() }
                    </div>
                    { this.state.carouselVisible && !this.state.isLoading ? <ImageCarousel files={ this.state.files } hide={ this.hideCarousel } startFrom={ this.state.startCarouselFrom } /> : null }
                </div>
            </React.Fragment>
        )
    }
}

export default CardContainer