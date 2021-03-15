import React from 'react'

import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'

import { DisableRightClick } from '../../../assets/js/export-functions'

import './fileuploader.css'

export class FileUploader extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div className="file-upload-container" onContextMenu={ DisableRightClick }>
					{/* <p className="file-upload-title">Drag or Select Files</p> */}
					<div className="file-upload-block">
						<div className="file-upload-icon-cont">
							<i className="far fa-cloud-upload-alt fu-icon"></i>
						</div>
						<div className="file-upload-btn-cont">
							<input type="file" id="file-upload-inp" className="file-upload-inp" multiple onChange={ this.props.onChangeHandler } accept=".jpg,.jpeg,.png" />
							<Tooltip placement="bottom" TransitionComponent={ Zoom } arrow title="Only Images (jpg, jpeg, png)" enterDelay={100} leaveDelay={ 100 }>
								<label htmlFor="file-upload-inp" className="file-upload-btn"><i className="far fa-upload fupload-btn-icon"></i>Select Files</label>
							</Tooltip>
						</div>
					</div>
				</div>
            </React.Fragment>
        )
    }
}
 
export default FileUploader