import React from 'react'
import { Link } from 'react-router-dom'
import CardRightMenu from '../cardOptions/CardRightMenu'

import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'

import './card.css'



export class Card extends React.Component{

	state = {
		rightMenuVisibility: false,
		albumid: 0,
		rightMenuPos: {
			x: 0,
			y: 0
		}
	}

	componentDidMount(){
		this.setState({
			albumid: this.props.a_data.albumid
		}, () => {
			// console.log(this.state.albumid)
		})
	}

	albumRightClick = ( event ) => {
		event.preventDefault()
		// console.log("Right Click")

		this.setState({
			rightMenuVisibility: true,
			albumid: this.props.a_data.albumid,
			rightMenuPos: {
				x: window.innerWidth - event.nativeEvent.clientX < 260 ? window.innerWidth - 270 : event.nativeEvent.clientX,
				y: event.nativeEvent.clientY + window.scrollY
			}
		})
		
		// console.log( event.nativeEvent.clientX)
	}

	hideRightMenu = () => {
		this.setState({
			rightMenuVisibility: false,
			albumid: 0
		})
	}

	cardPrivacyIcons = ( privacy ) => {
		if( privacy === 'onlyme' ){
			return (
					<i className="fas fa-lock album-card-privacy-icon"></i>
			)
		}
		else if( privacy === 'public' ){
			return (
					<i className="fas fa-globe-asia album-card-privacy-icon"></i>
			)
		}
		else if( privacy === 'specific' ){
			return (
					<i className="fas fa-users album-card-privacy-icon"></i>
			)
		}
		else if( privacy === 'unlisted' ){
			return (
					<i className="fas fa-link album-card-privacy-icon"></i>
			)
		}
		else{
			return (
					<i className="fas fa-question album-card-privacy-icon"></i>
			)
		}
	}

	getToolTipText = ( privacy ) => {
		// let privacy = this.props.a_data.privacy
		// let created_date

		if( privacy === 'onlyme' ){
			return (
					"Private Album."
			)
		}
		else if( privacy === 'public' ){
			return (
					"Public Album."
			)
		}
		else if( privacy === 'specific' ){
			return (
					"Allowed users can access."
			)
		}
		else if( privacy === 'unlisted' ){
			return (
					"Everyone can access with the album link."
			)
		}
		else{
			return (
					"Unknown album privacy."
			)
		}
	}

	render(){
		return(
			<React.Fragment>
				<Link to={ `/album/${this.props.a_data.albumid}` }>
					<Tooltip TransitionComponent={ Zoom } title={ this.getToolTipText( this.props.a_data.privacy) } enterDelay={ 1000 } leaveDelay={100}>
						<div className={`album-card ${this.props.a_data.css_color_class}`} onContextMenu={ this.albumRightClick } aid="123456">
							
							<div className="album-card-info">
								{ this.cardPrivacyIcons( this.props.a_data.privacy ) }
								<span className="album-title">{ this.props.a_data.title }</span>
								<button className="album-card-info-btn">
									<i className="far fa-ellipsis-v album-card-more-icon"></i>
								</button>
							</div>
						</div>
						</Tooltip>
				</Link>
				{ this.state.rightMenuVisibility ?
					<div className="card_right-menu-cont">
						<CardRightMenu
							albumid={this.state.albumid}
							hideRightMenu={this.hideRightMenu}
							position={this.state.rightMenuPos}
							sharing={ this.props.sharing }
							getlink={ this.props.getlink }
							starred={ this.props.starred }
							rename={ this.props.rename }
							viewDetails={ this.props.viewDetails }
							changeColor={ this.props.changeColor }
							delete={ this.props.deleteAlbum}
						/>
					</div>
				: null }
				
			</React.Fragment>
		)
	}

	
}

export default Card