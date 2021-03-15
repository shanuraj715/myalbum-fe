import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import { withStyles } from "@material-ui/core/styles"
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'

import { DisableDrag } from '../../../assets/js/export-functions'

import './imagecard.css'

const BorderLinearProgress = withStyles((theme) => ({
	root: {
		height: 6,
		borderRadius: 5,
	},
	colorPrimary: {
		backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
	},
	bar: {
		borderRadius: 5,
		backgroundColor: 'var(--blue)',
	},
  }))(LinearProgress);

export class ImageCard extends React.Component{

	state = {
		progressPosition: 0
	}

	componentDidMount(){
		this.updateProgress()
	}

	updateProgress = () => {
		this.setState({
			progressPosition: Math.ceil(Math.random()*10 * Math.random()*10)
		})
	}

	removeImage = () => {
		this.props.removeHandler( this.props.box_id)
	}

	render(){
		return(
			<React.Fragment>
				<div className="file-upload-image-box pop_anim" key={ this.props.file_name } onMouseDown={ DisableDrag }>
					<Tooltip placement="bottom" TransitionComponent={ Zoom } arrow title="Remove" enterDelay={ 400 } leaveDelay={100}>
						<button className="fu-image-card-close-btn" onClick={ this.removeImage }>
							<i className="fas fa-times fu-icbi"></i>
						</button>
					</Tooltip>
					<Tooltip placement="top" TransitionComponent={ Zoom } arrow title={ this.props.file_name } enterDelay={ 400 } leaveDelay={100}>
						<div className="file-upload-box">
							<img className="fu-image" alt={ this.props.file_name } src={ this.props.file_path }  />
						</div>
					</Tooltip>
					{/* <div className="fu-image-progress">
						<BorderLinearProgress variant="determinate" value={ this.state.progressPosition } />
					</div> */}
				</div>
					
				
			</React.Fragment>            
		)
	}

}

export default ImageCard