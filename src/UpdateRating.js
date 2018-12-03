import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class UpdateRating extends Component {
  constructor(props){
    super(props);
    this.state={
      updateGame: false
    }
  }

  activateFields = (event) =>{
    this.setState({updateRating:true});
  }
  reloadPage = (event) => {
      window.location.reload()
  }

  updateRating = (event) => {
    event.preventDefault();
    var data ={
      ratingID: this.props.updateID,
      name:document.getElementById('name').value,
      rating:document.getElementById('rating').value,
      comment:document.getElementById('comment').value,
      gameID:document.getElementById('gameID').value,
    }
    axios.put('http://localhost:8080/IGDB/api/game/updateRating/' + this.props.updateID, data, {headers:{ crossorigin:true}}).then(Response => 
    {window.location.reload()});                     
  } 

  render() {
      return(
        <div>
            Updating
            <br/>
            Game ID = {this.props.gameID}
        <br/>
        <input id="name" className ="form-control" type = "text" placeholder = "Your Name" style={{width:'400px'}} />
        {/* Enter your name */}
        <br/>
        <input id = "rating" className ="form-control" type = "text" placeholder = "Rating Score" style={{width:'150px'}} />
        {/* Enter your rating */}
        <br/>
        <input id = "comment" className ="form-control" type = "text" placeholder = "Comments" style={{width:'250px'}} />
        {/* Enter comment */}
        <br/>
        <input id ="gameID" className ="form-control" type ="text" placeholder = "Game ID" style={{width:'250px'}} />
        {/* Enter Game ID */}
        <br/> 
        <button className= "btn btn-info" onClick={this.updateRating}>Submit</button>
        <button className= "btn btn-warning" onClick={this.reloadPage}>Back</button>
        </div>
    );
  }
}

export default UpdateRating;
