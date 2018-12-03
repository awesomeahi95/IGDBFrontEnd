import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class DeleteRating extends Component {
  constructor(props){
    super(props);
    this.state={
      deleteRating: false
    }
  }

  activateFields = (event) =>{
    this.setState({deleteRating:true});
  }
  reloadPage = (event) => {
      window.location.reload()
  }

  deleteRating = (event) => {
    event.preventDefault();
    var data ={
      ratingID: this.props.deleteID
    }
    axios.delete('http://localhost:8080/IGDB/api/game/deleteRating/' + this.props.deleteID, data, {headers:{ crossorigin:true}}).then((res) => 
    {window.location.reload()});

  } 
  render() {
      return(
        <div>
            Are you sure you want to delete this rating/comment?
        <br/>
        <button className= "btn btn-danger" onClick={this.deleteRating}>Yes</button>
        <button className= "btn btn-warning" onClick={this.reloadPage}>No</button>
        </div>
    );
  }
}

export default DeleteRating;
