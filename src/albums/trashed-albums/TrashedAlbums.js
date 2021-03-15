import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Header from '../../shared/components/header/Header'
import Footer from '../../shared/components/footer/Footer'
import AlbumsHeader from '../components/header/AlbumsHeader'
import AlbumSidebar from '../components/sidebar/AlbumsSidebar'
import Card from '../components/card/Card'
import './albums.css'




export class TrashedAlbums extends Component {

	state = {
		albumList: [
			{ albumid: 123451, title: "Album One", privacy: 'public', color_css_class: 'aflr_red' },
			{ albumid: 123452, title: "Album Two", privacy: 'onlyme', color_css_class: 'bgms_gray' },
			{ albumid: 123453, title: "Album Three", privacy: 'public', color_css_class: 'chnt_pink' },
			{ albumid: 123454, title: "Album Four", privacy: 'onlyme', color_css_class: 'diou_blue' },
			{ albumid: 123455, title: "Album Five", privacy: 'specific', color_css_class: 'ejpv_green' },
			{ albumid: 123456, title: "Album Six", privacy: 'unlisted', color_css_class: 'fkqw_blue2' },
			{ albumid: 123457, title: "Album Seven", privacy: 'public', color_css_class: 'glrx_yellow' },
			{ albumid: 123458, title: "Album Eight", privacy: 'unlisted', color_css_class: 'hmsy_light-blue' },
			{ albumid: 123459, title: "Album Nine", privacy: 'specific', color_css_class: 'joua_light-green' },
			{ albumid: 123460, title: "Album Ten", privacy: 'specific', color_css_class: 'intz_violet' }
		]
	}

	
	render() {
		return (
			<div>
				<Helmet>
					<title>Trashed Albums</title>
				</Helmet>
				<Header/>
				<div className="albums-container">
					<div className="album-left-area">
						<AlbumsHeader />
						<div className="album-container">
							<div className="album-card-container">
								{ this.state.albumList.map( (item) => {
								// console.log(item)
								return (<Card 
									a_data={item}
									key={item.albumid} />)
								}) }
							</div>
						</div>
					</div>
					<AlbumSidebar active_link="trashed" />
				</div>
				
				<Footer/>
			</div>
		)
	}
}

export default TrashedAlbums
