import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'
import { Link, Redirect } from 'react-router-dom'

import { DisableRightClick } from '../../../assets/js/export-functions'

import './header.css'

export class Header extends React.Component{

    state = {
        RedirectTo: ''
    }

    componentDidMount(){

    }

    save = () => {
        this.props.saveHandler()
    }

    reset = () => {
        this.props.resetData()
    }

    render(){
        return(
            <React.Fragment>
                { this.state.RedirectTo !== '' ? <Redirect to={ this.state.RedirectTo } /> : null }
                <div className="ea-head" onContextMenu={ DisableRightClick }>
					<p className="ea-head-text notextselect">Editing { this.props.album_name }</p>
                    <Tooltip TransitionComponent={ Zoom } arrow title="Revert all changes." enterDelay={1000} leaveDelay={200} >
                        <button className="ea-reset-btn" onClick={ () => this.setState({ RedirectTo: '/upload/' + this.props.aid }) }>
                            <i className="far fa-upload ea-hbtn-icon"></i>Upload Files
                        </button>
                    </Tooltip>
                    <Tooltip TransitionComponent={ Zoom } arrow title="Revert all changes." enterDelay={1000} leaveDelay={200} >
                        <button className="ea-reset-btn" onClick={ this.reset }>
                        <i className="far fa-sync-alt ea-hbtn-icon"></i>Reset
                        </button>
                    </Tooltip>
                    <Tooltip TransitionComponent={ Zoom } arrow title="Save changes for this album." enterDelay={1000} leaveDelay={200}>
                        <button className="ea-save-btn" onClick={ this.save }>
                            <i className="far fa-check ea-hbtn-icon"></i>Save
                        </button>
                    </Tooltip>
                    <Tooltip TransitionComponent={ Zoom } arrow title="Cancel and go back to previous page." enterDelay={1000} leaveDelay={200}>
                        <Link to={ "/albums/" }>
                            <button className="ea-cancel-btn">
                            <i className="far fa-times ea-hbtn-icon"></i>Cancel
                            </button>
                        </Link>
                    </Tooltip>
                </div>
            </React.Fragment>
        )
    }

}

export default Header