import React from 'react'

import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'
import { DisableDrag } from '../../../assets/js/export-functions'

import './imagecard.css'


export class ImageCard extends React.Component{

    removeCard = () => {
        this.props.removeBtn( this.props.cardIndex )
    }

    cardOnClick = (e) => {
        
        if( e.ctrlKey ){
            // select card code
        }
        else{
            this.props.openCarousel( this.props.cardIndex )
        }
    }

    render(){
        return(
            <React.Fragment>
                <div className="ea-image-card">
                    <button className="ea-image-remove-btn" onClick={ this.removeCard }>
                        <i className="far fa-times ea-image-rem-icon"></i>
                    </button>
                    <Tooltip placement="bottom" TransitionComponent={ Zoom } arrow title={ this.props.img_data.name } enterDelay={1500} leaveDelay={200}>
                        <div className="ea-img-box" onClick={ this.cardOnClick }>
                            <img className="ea-img" src={ this.props.img_data.url } alt={ this.props.img_data.name } onMouseDown={ DisableDrag } />
                        </div>
                    </Tooltip>
                </div>
            </React.Fragment>
        )
    }

}

export default ImageCard