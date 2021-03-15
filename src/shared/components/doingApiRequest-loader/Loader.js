import React from 'react'

import RingLoader from 'react-spinners/RingLoader'
import './loader.css'

export default class Loader extends React.Component{
    render(){
        return(
            <div className="api-request-loader-cont">
                <div className="api-req-loader-img">
                    <RingLoader color="#fff" loading={ true } size="100px" />
                </div>
            </div>
        )
    }
}