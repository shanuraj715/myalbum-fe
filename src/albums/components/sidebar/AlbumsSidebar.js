import react from 'react'
import './albumsSidebar.css'
import {Link} from 'react-router-dom'


export class AlbumSidebar extends react.Component{

	state = {
		public_ip: 0,

		private_albums: 0,
		unlisted_albums: 0,
		specific_albums: 0,
		public_albums: 0,
		total_albums: 0
	}

	componentDidMount(){
		let private_albums = 0
		let public_albums = 0
		let specific_albums = 0
		let unlisted_albums = 0
		this.props.albums.map( item => {
			if( item.privacy === 'onlyme' ){
				private_albums++
			}
			else if( item.privacy === 'public' ){
				public_albums++
			}
			else if( item.privacy === 'specific' ){
				specific_albums++
			}
			else if( item.privacy === 'unlisted' ){
				unlisted_albums++
			}
			return true
		})
		this.setState({
			private_albums: private_albums,
			public_albums: public_albums,
			unlisted_albums: unlisted_albums,
			specific_albums: specific_albums,
			total_albums: specific_albums + unlisted_albums + public_albums + private_albums
		})
	}

	

	render(){
		return(
			<div className="album-sidebar">
				<div className="al-s-block">
					{/* <button className="al-s-add-album add-album-btn" title="Create new album"><i className="far fa-plus i-s-lr-16"></i>New</button> */}
					{/* <div className="al-s-menu-cont">
						<div className="al-s-main-row">
							<p className="">More</p>
							<button className="" id="as-more-btn"><i className="far fa-arrow-circle-down"></i></button>
						</div>
						<div className="">
							<button className=""><i className=""></i></button>
							<button className=""><i className=""></i></button>
							<button className=""><i className=""></i></button>
							<button className=""><i className=""></i></button>
						</div>
					</div> */}
					
				</div>


				<div className={`al-s-btn-row ${this.props.active_link === 'myalbums' ? 'album-sidebar-link-active' : null }`}>
					<Link className="al-s-btn-text" to='/albums'><i className="far fa-house-user i-s-lr-12"></i>My Albums</Link>
				</div>

				<div className={`al-s-btn-row ${this.props.active_link === 'shared' ? 'album-sidebar-link-active' : null }`}>
					<Link className="al-s-btn-text" to='/shared'><i className="far fa-user-friends i-s-lr-12"></i>Shared with me</Link>
				</div>

				<div className={`al-s-btn-row ${this.props.active_link === 'starred' ? 'album-sidebar-link-active' : null }`}>
					<Link className="al-s-btn-text" to='/starred'><i className="far fa-star i-s-lr-12"></i>Starred</Link>
				</div>

				<div className={`al-s-btn-row ${this.props.active_link === 'trashed' ? 'album-sidebar-link-active' : null }`}>
					<Link className="al-s-btn-text" to="/trashed"><i className="far fa-trash-alt i-s-lr-12"></i>Trashed</Link>
				</div>

				<div className="al-s-divider"></div>

				<div className="al-s-block">
					<div className="al-s-stats">
						<div className="al-s-stats-row">
							<span className="al-s-stats-left-text">Total Albums</span>
							<span className="al-s-stats-right-text">{ this.state.total_albums }</span>
						</div>


						<div className="al-s-stats-row">
							<span className="al-s-stats-left-text" title="Albums that can only accessible from your account.">Private</span>
							<span className="al-s-stats-right-text">{ this.state.private_albums }</span>
						</div>
						<div className="al-s-stats-row">
							<span className="al-s-stats-left-text" title="Albums that can access by the album link.">Unlisted</span>
							<span className="al-s-stats-right-text">{ this.state.unlisted_albums }</span>
						</div>
						<div className="al-s-stats-row">
							<span className="al-s-stats-left-text" title="Albums that is accessible from some specific users.">Specific</span>
							<span className="al-s-stats-right-text">{ this.state.specific_albums }</span>
						</div>
						<div className="al-s-stats-row">
							<span className="al-s-stats-left-text" title="Albums that will display in your profile. Everyone can access these albums.">Public</span>
							<span className="al-s-stats-right-text">{ this.state.public_albums }</span>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default AlbumSidebar