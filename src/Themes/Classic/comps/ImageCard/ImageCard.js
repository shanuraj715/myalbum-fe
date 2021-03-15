import React from 'react'


import ImagePreview from '../../comps/ImagePreview/ImagePreview'

import './imagecard.css'

export default class ImageCard extends React.Component{

    state = {
        prevImage: false,
        image: ''
    }

    closePrev = () => {
        this.setState({
            prevImage: false,
            image: ''
        })
    }

    previewImage = () => {
        this.setState({ prevImage: true, image: this.props.image })
    }

    render(){
        return(
            <React.Fragment>
                <div className="classic-image-card" onClick={ this.previewImage }>
                    <img src={ this.props.image } alt="project" className="classic-image" />
                </div>
                { this.state.prevImage ? <ImagePreview image={ this.state.image } closePrev={ this.closePrev } /> : null }
            </React.Fragment>
        )
    }

}