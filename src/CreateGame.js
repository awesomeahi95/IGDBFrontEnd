import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class CreateGame extends Component {
  constructor(props){
    super(props);
    this.state={
      createGame: false
    }
  }

  activateFields = (event) =>{
    this.setState({createGame:true});
    this.setState({reloadPage:true});
  }
  reloadPage = (event) => {
      window.location.reload()
  }

  createGame = (event) => {
    event.preventDefault();
    var data ={
      gameName:document.getElementById('gameName').value,
      yearOfRelease:document.getElementById('yearOfRelease').value,
      genre:document.getElementById('genre').value,
      developer:document.getElementById('developer').value,
      publisher:document.getElementById('publisher').value,
      ageRating:document.getElementById('ageRating').value,
    }
    axios.post('http://localhost:8080/IGDB/api/game/createGame',data, {headers:{ crossorigin:true}}).then((res) => 
    {window.location.reload()});
                             
  } 
  render() {
      return(
        <div>
        {this.state.createGame?
        <div>
        <input id="gameName" className ="form-control" type = "text" placeholder = "Name of Game" style={{width:'400px'}} />
        {/* Enter name of game */}
        <br/>
        <input id = "yearOfRelease" className ="form-control" type = "text" placeholder = "Year Released" style={{width:'150px'}} />
        {/* Enter year of release of game */}
        <br/>
        <input id = "genre" className ="form-control" type = "text" placeholder = "Genre" style={{width:'250px'}} />
        {/* Enter genre of game */}
        <br/>
        <input id ="developer" className ="form-control" type ="text" placeholder = "Developer" style={{width:'250px'}} />
        {/* Enter developer name of game */}
        <br/>
        <input id ="publisher" className ="form-control" type ="text" placeholder = "Publisher" style={{width:'250px'}} />
        {/* Enter publisher name of game */}
        <br/>
        <input id ="ageRating" className ="form-control" type ="text" placeholder = "Age Rating" style={{width:'150px'}} />
        {/* Enter age rating of game */}
        <br/>
        <button className= "btn btn-success" onClick={this.createGame}>Submit</button>
        <button className= "btn btn-warning" onClick={this.reloadPage}>Back</button>
        </div>:<button className= "btn btn-success" onClick={this.activateFields}>Add Game</button>}
        </div>
    );
  }
}

export default CreateGame;
