import React from 'react'

import {DisableDrag} from '../../../assets/js/export-functions'
import logo from '../../../assets/images/logo-254x254.png'
import './loader.css'

export class Loader extends React.Component{

    componentDidMount(){
        this.startTimer()
    }

    componentWillUnmount(){
        clearTimeout( this.timeout )
    }

    state = {
        show: 0
    }

    startTimer = () => {
        this.timeout = setTimeout( () => {
            this.setState({ show: 1 })
        }, 2200)
    }

    render() {
        return(
            <div className="cl-loader-container notextselect">
                { this.state.show === 0 ?
                <img src={ logo } className="al-loading-image" alt="loading-img" onMouseDown={ DisableDrag }/>
                : <p className="cl-loading-text pop-anim">Loading...</p>}
                <span className="cl-loading-bottom-text">Fetching data from the server.</span>
            </div>
        )
    }

}

export default Loader