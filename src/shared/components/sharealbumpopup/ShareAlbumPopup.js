import React from 'react'
import OutsideClickHandler from 'react-outside-click-handler'

import './sharealbumpopup.css'


/* material UI */

import Chip from '@material-ui/core/Chip'



export class ShareAlbumPopup extends React.Component{

	state = {
      isVisible: true,
      searchedFriends: [
         {
            userid: 123451,
            username: 'shanuraj715',
            email: 'shanuraj715@gmail.com'
         },
         {
            userid: 123452,
            username: 'shanuraj716',
            email: 'shanuraj716@gmail.com'
         },
         {
            userid: 123453,
            username: 'shanuraj717',
            email: 'shanuraj717@gmail.com'
         },
         {
            userid: 123454,
            username: 'shanuraj718',
            email: 'shanuraj718@gmail.com'
         },
         {
            userid: 123455,
            username: 'shanuraj719',
            email: 'shanuraj719@gmail.com'
         }
      ],
      sharedWith: []
	}

	hide = () => {
		this.setState({
			isVisible: false
		})
		this.props.sharing()
   }
   
   disableRightClick = e => {
      e.preventDefault();
   }

   searchFriends = () => {

   }

   shareToUser = (e) => {
      let btn_index = e.target.getAttribute('item_index')
      let users = this.state.sharedWith
      let friendsList = this.state.searchedFriends
      let data_to_copy = friendsList[btn_index]
      if( !users.includes( data_to_copy ) ){
         users.push( data_to_copy )
         friendsList.splice( btn_index, 1)
         this.setState({ sharedWith: users, searchFriends: friendsList })
         console.log( users )
      }
   }

   removeAccessFromUser = (e) => {
      // let album_id = this.props.album_id
      // let userid = e.currentTarget.getAttribute('uid')
      // console.log( e.currentTarget.getAttribute('uid') )
   }

   doDoneBtnActions = () => {
      this.hide()
   }

   handleDelete = (e) => {
      let card_index = e.currentTarget.parentNode.getAttribute('item_index')
      let sharedWith = this.state.sharedWith
      sharedWith.splice( card_index, 1)
      this.setState({
         sharedWith: sharedWith
      })
   }

	render(){

      
		return(
         <div className="popup-bg">
			<OutsideClickHandler onOutsideClick={ () => {
				this.hide()
			}}>
				{ this.state.isVisible ? 
				<div className="share-album-container popup" onContextMenu={ this.disableRightClick }>
					<div className="share-album-box">
						<p className="share-album-title"><i className="far fa-share-alt sa-head-icon"></i>Sharing options for { this.props.albumid }</p>
						<div className="share-album-form">
                     <div className="share-album-inp-cont">
                        <input type="text" className="share-album-inp-bx" placeholder="Enter Username or Email address" />
                        <i className="far fa-search sa-srch-btn"></i>
                     </div>
                     { this.state.searchedFriends.length !== 0 ? 
                        <div className="sa-friends-list-cont" id="sa-friend-list-cont">
                           { this.state.searchedFriends.map( (item, index) => (
                              <button key={ index } className="sa-friend-row" onClick={ this.shareToUser } uid={ item.userid } item_index={ index }>{ item.username } ({ item.email })</button>)
                              )}
                        </div>
                     : null }
                     
						</div>
                  { this.state.sharedWith.length !== 0 ? 
                     <div className="share-album-shared-people">
                        <p className="sa-plist-head">Shared With</p>
                        <div className="sa-plist-cont">
                           { this.state.sharedWith.map( (item, index) => (
                              <Chip className="sa-pname" title={ item.email} uid={ item.userid } item_index={ index } label={ item.username } onDelete={this.handleDelete} color="primary" variant="outlined" size='small' />
                           ))}
                           </div>
                     </div>
                  : <p className="sa-not-shared-text">Not shared to anyone</p> }
                  <div className="sa-done-btn">
                     <button className="sa-done" onClick={ this.doDoneBtnActions }>Done</button>
                  </div>
					</div>
				</div>
            : null }
			</OutsideClickHandler>
         </div>
      )
      
   }

   
}

export default ShareAlbumPopup