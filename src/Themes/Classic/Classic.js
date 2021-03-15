import React from 'react'

import './classic.css'
import { DisableRightClick, DisableDrag } from '../../assets/js/export-functions'
import ImageCard from './comps/ImageCard/ImageCard'

import PixelDivider from '../../shared/themeComps/dividers/PixelDivider/PixelDivider'
import DotDivider from '../../shared/themeComps/dividers/DotDivider/DotDivider'
import c from '../../config.json'

import logo from '../../assets/images/logo-254x254.png'
import pageBehaviour from '../../pageBehaviour'

export default class Classic extends React.Component{

    componentDidMount(){
        this.appendInShowingFiles()
        window.addEventListener('scroll', () => {
			this.handleScroll()
		})
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', () => {
            this.handleScroll()
        })

        console.log( this.props.a_data.files )
    }

    state = {
        all_files: this.props.a_data.files,
        showing_files: []
    }

    handleScroll = () => {
        this.scrollTimeout = setTimeout( () => {
            if( document.body.scrollHeight - pageBehaviour.scrollY - window.innerHeight < 20 ){
                this.appendInShowingFiles()
                
            }
        }, 2500)
    }

    appendInShowingFiles = () => {
        let showedFilesCount = this.state.showing_files.length
        if( this.state.showing_files.length < this.state.all_files.length ){
            let loopTill = showedFilesCount + this.themeSettings.perClickShowImages
            loopTill = this.state.all_files.length - loopTill < 0 ? this.state.all_files.length : loopTill
            let data_to_append = []
            for( let i=0; i < loopTill; i++ ){
                data_to_append.push( this.state.all_files[i])
            }
            this.setState({
                showing_files: data_to_append
            }, () => {
                clearTimeout( this.scrollTimeout )
            })
        }
    }

    themeSettings = {
        "perClickShowImages": 16
    }

    previewImage = () => {
        
    }

    func = () => {
        
    }

    render(){
        
        return(
            <React.Fragment>
                <div className="classic-theme-container notextselect" onMouseDown={ DisableDrag } onContextMenu={ DisableRightClick }>
                    <section className="classic-title-section">
                        <h1 className="classic-title">{ this.props.a_data.title }</h1>
                        <div className="classic-theme-head-logo">
                            <img src={ logo } alt="" className="ct-hl-img" />
                        </div>
                    </section>
                    <div className="scallop-down"></div>
                    <section className="classic-desc-section">
                        <p className="classic-desc">{ this.props.a_data.description }</p>
                    </section>
                    <PixelDivider />
                    <section className="classic-image-container">
                        { this.state.showing_files.map( (item, index) => {
                            return <ImageCard image={ item } key={ index } />
                        })}
                        <DotDivider />
                    </section>
                    { this.state.all_files.length > this.state.showing_files.length ? 
                        <div className="classic-load-more-block">
                            <button className="classic-load-more-btn" onClick={ this.appendInShowingFiles }>
                                <i className='far fa-arrow-alt-down classic-load-more-icon'></i>Show More ({ this.state.showing_files.length + '/' + this.state.all_files.length})
                            </button>
                        </div>
                    : null }
                    <footer className="classic-footer">
                        <p className="classic-footer-text">Created By: shanuraj715 | { c.MAIN_TITLE }</p>
                    </footer>
                </div>
            </React.Fragment>
        )
    }
}