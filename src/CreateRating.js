import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class CreateRating extends Component {
  constructor(props){
    super(props);
    this.state={
      createRating: false
    }
  }

  activateFields = (event) =>{
    this.setState({createRating:true});
    this.setState({reloadPage:true});
  }
  reloadPage = (event) => {
    window.location.reload()
}


  createRating = (event) => {
    event.preventDefault();
    var data ={
      gameID:document.getElementById('gameID').value,
      name:document.getElementById('name').value,
      rating:document.getElementById('rating').value,
      comment:document.getElementById('comment').value,
    }
    axios.post('http://localhost:8080/IGDB/api/game/createRating',data, {headers:{ crossorigin:true}}).then((res) => 
    {window.location.reload()});
                             
  } 
  render() {
      return(
        <div>
        {this.state.createRating?
        <div>
        <input id ="gameID" className ="form-control" type ="text" placeholder = "Game ID" style={{width:'250px'}} />
        {/* Enter ID of game */}
        <br/>
        <input id="name" className ="form-control" type = "text" placeholder = "My Name" style={{width:'400px'}} />
        {/* Enter your name */}
        <br/>
        <input id = "rating" className ="form-control" type = "text" placeholder = "Rating Score" style={{width:'150px'}} />
        {/* Enter your rating score for game */}
        <br/>
        <input id = "comment" className ="form-control" type = "text" placeholder = "Comment" style={{width:'250px'}} />
        {/* Enter comment */}
        <br/>
        <button className= "btn btn-success" onClick={this.createRating}>Submit</button>
        <button className= "btn btn-warning" onClick={this.reloadPage}>Back</button>
        </div>:<button className= "btn btn-success" onClick={this.activateFields}>Add Rating</button>}
        </div>
    );
  }
}

export default CreateRating;
