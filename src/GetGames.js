import React, { Component } from 'react';
import './App.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteGame from './DeleteGame';
import UpdateGame from './UpdateGame';
import CreateGame from './CreateGame';
import {
} from 'react-router-dom'

class GetGames extends Component {
  constructor(props){
    super(props)
    this.state={
      loaded: false,
    }
  }

  componentWillMount = () => {
    axios.get('http://localhost:8080/IGDB/api/game/getAllGames').then(response => {
      this.setState({
        loaded: true,
        view:false,
        games: response.data,
        rating: response.data.ratings
      });
    });
  }
  createRatingsButton = (cells, rows) => {
    return <button id={rows.gameID} className="btn btn-info" onClick={() => { this.props.history.push('/getAllRatings') }}>View/Add</button>;
    }
  createDeleteButton = (cells, rows) => {
    return <button id={rows.gameID} className="btn btn-danger" onClick={() => this.deleteFunction(rows)}>Delete</button>;
    }
  createUpdateButton = (cells, rows) => {
    return <button id={rows.updateButton} className="btn btn-warning" onClick={() => this.updateFunction(rows)}>Update</button>;
    }

  deleteFunction = (rows) => {
    console.log(rows.gameID);
    this.setState({deleteID: rows.gameID,
      gameName: rows.gameName,
      delete:true,
      update:false                    
    });
    //document.getElementById("delete").scrollIntoView({block: "start", inline: "start"});
    window.scrollTo(0,0)
  }
  updateFunction = (rows) => {
    console.log(rows.gameID);
    this.setState({updateID: rows.gameID,
      gameName: rows.gameName,
      delete:false,
      update:true
    });
    //document.getElementById("update").scrollIntoView({block: "start", inline: "start"});
    window.scrollTo(0, 0)
  }
  
  render() {
    const loaded = this.state.loaded;
    return (
      <div>
        <CreateGame></CreateGame>
    <div className="GetGames" id="getGames">
    <div id="update">
      {this.state.update?<UpdateGame updateID={this.state.updateID} gameName={this.state.gameName}/>:null}
    </div>
    <div id="delete">
      {this.state.delete?<DeleteGame deleteID={this.state.deleteID} gameName={this.state.gameName}/>:null}
    </div>
      {loaded ?
      <BootstrapTable
      data={this.state.games}
      striped
      bordered
      search
      >
      <TableHeaderColumn Column width={'5%'} dataField="gameID" isKey dataSort>ID</TableHeaderColumn>
      <TableHeaderColumn Column width={'25%'}dataField="gameName" dataSort >Name</TableHeaderColumn>
      <TableHeaderColumn Column width={'5'} dataField="yearOfRelease" >Year Released</TableHeaderColumn>
      <TableHeaderColumn Column width={'10%'} dataField="genre" >Genre</TableHeaderColumn>
      <TableHeaderColumn Column width={'10%'} dataField="developer" >Developer</TableHeaderColumn>
      <TableHeaderColumn Column width={'10%'} dataField="publisher"  >Publisher</TableHeaderColumn>
      <TableHeaderColumn Column width={'5%'} dataField="ageRating"  >Age Rating</TableHeaderColumn>
      <TableHeaderColumn Column width={'10%'} dataField="viewRating" dataFormat={this.createRatingsButton}>Ratings/Comments</TableHeaderColumn>
      <TableHeaderColumn Column width={'10%'} dataField="updateGame"  dataFormat={this.createUpdateButton}>Update Game</TableHeaderColumn>
      <TableHeaderColumn Column width={'10%'} dataField="deleteGame"  dataFormat={this.createDeleteButton}>Delete Game</TableHeaderColumn>
    </BootstrapTable>: <div><br/><CircularProgress/><br/></div>}
  </div>
  </div>
  );
  }
}

export default GetGames;
