import React, { Component } from 'react'
import 'react-notifications-component/dist/theme.css'
import {store} from 'react-notifications-component'
import 'animate.css'

export class SuccessNotification extends Component{
    render(){
        return (
            <div>
                { console.log("IJUYHGT") }
                { store.addNotification({
                    title: 'Success',
                    message: this.props.text,
                    type: 'success',
                    container: 'top-right',
                    insert: 'top',
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 5000
                    }
                })}
            </div>
        )
    }
}
