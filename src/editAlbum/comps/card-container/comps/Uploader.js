import React from 'react';
import c from '../../../../config.json'
import FadeLoader from 'react-spinners/FadeLoader'


export default class Uploader extends React.Component {

    componentDidMount() {
        this.saveToServer()
    }


    saveToServer = () => {
        // this.props.toast("Saving album Files", 'dark')
		const albumId = this.props.albumId
		const sessionId = this.props.sessionId
        // console.log( this.props.data )
        const data = {
            data: this.props.data
        }
		fetch( c.apiUrl + '/edit-album/files', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"sessionId": sessionId,
				"albumId": albumId
			},
            body: JSON.stringify(data)
		})
		.then( res => {
			if( res.ok ){
				return res.json()
			}
			else{
				throw new Error("Server Error")
			}
		})
		.then( json => {
			if( json.status ){
                this.props.toast("Files Saved Successfully01", 'dark')
                this.props.savingStatusToggler( false )

            }
            else{
                this.props.toast(json.error.message, 'error')
                this.props.savingStatusToggler( false )
                
            }
		})
		.catch( err => {
			this.props.toast("Unable to send data to server01", 'error')
            this.props.savingStatusToggler( false )
		})
	}

    changeSavingStatus = () => {
        this.props.savingStatusToggler( false )
    }

    render(){
        return(
            <React.Fragment>
                <div style={{position: "absolute", minWidth: "100%", minHeight: "100%", background: "rgba(0, 0, 0, 0.5)", zIndex: "100"}}>
                    <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)"}}>
                        <FadeLoader color="white" height="15px" width="6px" radius="5px" margin="2px" />
                    </div>
                </div>
            </React.Fragment>
        )
    }



}