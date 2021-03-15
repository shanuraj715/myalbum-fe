import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import OutsideClickHandler from 'react-outside-click-handler'

import './imagecarousel.css'

export class ImageCarousel extends React.Component{


    onClickItem = () => {

    }

    onChange = (e) => {
        console.log(e)
    }

    onClickThumb = (e) => {
        console.log(e)
    }

    hideCarousel = () => {
        console.log('Clicked')
        this.props.hide()
    }

    render(){
        return(
            <React.Fragment>
                <div className="ic-cont">
                    <OutsideClickHandler onOutsideClick={ this.hideCarousel }>
                        <div className="ic-box">
                        <Carousel
                            infiniteLoop
                            selectedItem={ this.props.startFrom }
                            dynamicHeight={ true }
                            showArrows={true}
                            onChange={this.onChange}
                            onClickItem={this.onClickItem}
                            onClickThumb={this.onClickThumb}
                            >
                            { this.props.files.map( (item, index ) => {
                                return(<div className="carousel-image-max-height">
                                    <img src={ item.url } className="carousel-image" alt={ item.name } />
                                    {/* <p className="legend">Legend 1</p> */}
                                </div>)
                            } )}
                            
                        </Carousel>
                        </div>
                    </OutsideClickHandler>
                </div>
                
            </React.Fragment>
        )
    }
}

export default ImageCarousel