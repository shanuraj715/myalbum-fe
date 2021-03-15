import react from 'react'
import AddAlbum from '../addAlbumPopup/AddAlbum'

import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'

import './albumHeader.css'


export class AlbumsHeader extends react.Component{


	state = {
		addingAlbum: false,
		albumList: [],
		sorted_album: []
	}

	componentDidMount(){
		this.setState({ albumList: this.props.albums }, () => {
			// console.log( this.props.albums)
		})
	}

	addAlbumState = ( state ) => { // state = true to show and false to hide the add album popup window
		this.setState({ addingAlbum: state })
	}

	

	render(){
		return(
			<div className="filter-albums-container">
				<div className="filter-album-opt-left">
					<div className="create-album-btn-container">
						<Tooltip TransitionComponent={ Zoom } title="Create a new album.">
							<button className="create-album-btn add-album-btn" onClick={ this.addAlbumState }><i className="far fa-plus i-m-lr-6"></i>Create</button>
						</Tooltip>
					</div>

					<div className="album-sort-container">
						<span className="album-nav-text">Sort by </span>
						<span className="album-sorted-by-text" id="album-sort-drop-btn">Date<i className="far fa-chevron-down al-sort-icon"></i>



							<div className="album-sort-dropdown">
								<span className="album-sort-drop-li" data-value="date" id="album-sort-list-btn"><i className="far fa-calendar-alt al-sort-icon"></i>Date</span>
								<span className="album-sort-drop-li" data-value="a2z" id="album-sort-list-btn"><i className="far fa-sort-alpha-down al-sort-icon"></i>Name (Ascending)</span>
								<span className="album-sort-drop-li" data-value="z2a" id="album-sort-list-btn"><i className="far fa-sort-alpha-down-alt al-sort-icon"></i>Name (Descending)</span>

							</div>
						</span>
					</div>
				</div>

				<div className="album-search-block">
					<input className="search-album-input" type="text" name="search-album" maxLength="32" placeholder="Search Album" onKeyUp={ this.search } id="search-input" />
					{/* <button className="search-album-btn"><i className="far fa-search"></i></button> */}
				</div>
				{ this.state.addingAlbum ? <AddAlbum reloadAlbumData={ this.props.reloadData } toggler={ this.addAlbumState } /> :null }
			</div>
		)
	}

	search = () => {
		
	}
}

export default AlbumsHeader