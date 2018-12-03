import React, { Component } from 'react';
import './App.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import CreateRating from'./CreateRating';
import UpdateRating from './UpdateRating';
import DeleteRating from './DeleteRating'

class GetRatings extends Component {
  constructor(props){
    super(props)
    this.state={
    }
  }

  componentWillMount = () => {
    axios.get('http://localhost:8080/IGDB/api/game/getAllRatings').then(response => {
      this.setState({
        rating: response.data
      });
    });
  }

  createDeleteButton = (cells, rows) => {
    return <button id={rows.ratingID} className="btn btn-danger" onClick={() => this.deleteFunction(rows)}>Delete</button>;
    }
  createUpdateButton = (cells, rows) => {
    return <button id={rows.updateButton} className="btn btn-warning" onClick={() => this.updateFunction(rows)}>Update</button>;
    }

    deleteFunction = (rows) => {
      this.setState({deleteID: rows.ratingID,
        delete:true,
        update:false                    
      });
      //document.getElementById("delete").scrollIntoView({block: "start", inline: "start"});
      window.scrollTo(0,0)
    }

    updateFunction = (rows) => {
      this.setState({updateGameID: rows.gameID,
        updateID: rows.ratingID,
        delete:false,
        update:true
      });
      //document.getElementById("update").scrollIntoView({block: "start", inline: "start"});
      window.scrollTo(0, 0)
    }

  render() {
    return (
    <div>
      <CreateRating></CreateRating>
      {!this.state.CreateRating?<button className = "btn btn-info" onClick={() => this.props.history.push('/')} >Home</button>:null}
    <div className="GetRatings" id="getRatings">
    <div id="update">
      {this.state.update?<UpdateRating updateID={this.state.updateID} gameID={this.state.updateGameID}/>:null}
    </div>
    <div id="delete">
      {this.state.delete?<DeleteRating deleteID={this.state.deleteID} gameID={this.state.updateGameID}/>:null}
    </div>
      
      <BootstrapTable 
      data={this.state.rating}
      striped
      bordered
      search
      >
      <TableHeaderColumn Column width={'5%'} dataField="ratingID" isKey dataSort>Rating ID</TableHeaderColumn>
      <TableHeaderColumn Column width={'15'} dataField="name" >Name</TableHeaderColumn>
      <TableHeaderColumn Column width={'5%'} dataField="rating" >Rating</TableHeaderColumn>
      <TableHeaderColumn Column width={'50%'} dataField="comment" >Comment</TableHeaderColumn>
      <TableHeaderColumn Column width={'5%'} dataField="gameID" dataSort >Game ID</TableHeaderColumn>
      <TableHeaderColumn Column width={'10%'} dataField="updateRating"  dataFormat={this.createUpdateButton}>Update Rating</TableHeaderColumn>
      <TableHeaderColumn Column width={'10%'} dataField="deleteRating"  dataFormat={this.createDeleteButton}>Delete Rating</TableHeaderColumn>
    </BootstrapTable> 
  </div>
  </div>
  );
    
  }
}

export default GetRatings;
