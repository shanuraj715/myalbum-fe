import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Header from '../../shared/components/header/Header'
import Footer from '../../shared/components/footer/Footer'
import AlbumsHeader from '../components/header/AlbumsHeader'
import AlbumSidebar from '../components/sidebar/AlbumsSidebar'
import Card from '../components/card/Card'
import './albums.css'




export class SharedAlbums extends Component {

	state = {
		albumList: [
			{ albumid: 123451, title: "Album One", privacy: 'public', css_color_class: 'aflr_red' },
			{ albumid: 123452, title: "Album Two", privacy: 'onlyme', css_color_class: 'bgms_gray' },
			{ albumid: 123453, title: "Album Three", privacy: 'public', css_color_class: 'chnt_pink' },
			{ albumid: 123454, title: "Album Four", privacy: 'onlyme', css_color_class: 'diou_blue' },
			{ albumid: 123455, title: "Album Five", privacy: 'specific', css_color_class: 'ejpv_green' },
			{ albumid: 123456, title: "Album Six", privacy: 'unlisted', css_color_class: 'fkqw_blue2' },
			{ albumid: 123457, title: "Album Seven", privacy: 'public', css_color_class: 'glrx_yellow' },
			{ albumid: 123458, title: "Album Eight", privacy: 'unlisted', css_color_class: 'hmsy_light-blue' },
			{ albumid: 123459, title: "Album Nine", privacy: 'specific', css_color_class: 'joua_light-green' },
			{ albumid: 123460, title: "Album Ten", privacy: 'specific', css_color_class: 'intz_violet' }
		]
	}


	render() {
		return (
			<div>
				<Helmet>
					<title>Shared Albums</title>
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
					<AlbumSidebar active_link="shared" />
				</div>
				
				<Footer/>
			</div>
		)
	}
}

export default SharedAlbums