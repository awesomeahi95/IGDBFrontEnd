import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class DeleteGame extends Component {
  constructor(props){
    super(props);
    this.state={
      deleteGame: false
    }
  }

  activateFields = (event) =>{
    this.setState({deleteGame:true});
  }
  reloadPage = (event) => {
      window.location.reload()
  }

  deleteGame = (event) => {
    event.preventDefault();
    var data ={
      gameID: this.props.deleteID
    }
    axios.delete('http://localhost:8080/IGDB/api/game/deleteGame/' + this.props.deleteID, data, {headers:{ crossorigin:true}}).then((res) => 
    {window.location.reload()});

  } 
  render() {
      return(
        <div>
            Are you sure you want to delete {this.props.gameName}?
        <br/>
        <button className= "btn btn-danger" onClick={this.deleteGame}>Yes</button>
        <button className= "btn btn-warning" onClick={this.reloadPage}>No</button>
        </div>
    );
  }
}

export default DeleteGame;
