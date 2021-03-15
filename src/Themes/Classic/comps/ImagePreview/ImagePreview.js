import React from 'react'
import logo from '../../../../assets/images/logo-254x254.png'

import ToolTip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'
import c from '../../../../config.json'
import './imagepreview.css'
import { DisableDrag, randomString } from '../../../../assets/js/export-functions'

export default class ImagePreview extends React.Component{
    state = {
        fileName: randomString(12) + ".jpg"
    }

    componentDidMount(){
        console.log( this.props.image )
    }

    closePrev = () => {
        let prev_box = document.getElementById('img_prev_box')
        prev_box.classList.add('fade-out')
        this.timeout = setTimeout(() => {
            this.props.closePrev()
        }, 200);
    }

    componentWillUnmount(){
        clearTimeout(this.timeout)
    }

    downloadImage = () => {
        fetch(this.props.image, {
            method: 'GET'
        })
        .then((response) => response.blob())
        .then((blob) => {
            // Create blob link to download
            const url = window.URL.createObjectURL(
                new Blob([blob]),
            );
            const link = document.createElement('a');
            link.href = url;
            console.log( "LOLO", url )
            link.setAttribute(
                'download',
                this.state.fileName,
            );

            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();

            // Clean up and remove the link
            link.parentNode.removeChild(link);
        });
    }

    render(){
        return(
            <React.Fragment>
                <div className="theme-image-preview-cont" id="img_prev_box" onMouseDown={ DisableDrag }>
                    <div className="theme-image-prev-block">
                        <img src={ this.props.image } className="theme-prev-image" alt="" />
                    </div>
                    <ToolTip TransitionComponent={ Zoom } arrow title="Download Image" enterDelay={ 100 } leaveDelay={ 100 }>
                        <div className="theme-img-prev-btn-cont">
                            <button className="img-down-btn" onClick={ this.downloadImage }><i className="far fa-download img-down-btn-icon"></i></button>
                        </div>
                    </ToolTip>
                    
                    <ToolTip TransitionComponent={ Zoom } arrow title={ c.MAIN_TITLE } enterDelay={ 100 } leaveDelay={ 100 }>
                        <img src={ logo } className="theme-prev-site-logo" alt="" />
                    </ToolTip>
                    <ToolTip TransitionComponent={ Zoom } arrow title="Close" enterDelay={ 100 } leaveDelay={ 100 }>
                        <span className="theme-img-prev-close-btn" onClick={ this.closePrev }><i className="far fa-times close-btn-icon"></i></span>
                    </ToolTip>
                </div>
                
            </React.Fragment>
        )
    }
}