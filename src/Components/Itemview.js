import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

import axios from 'axios';
import './Itemview.css';
import Navigation from './Navigation';
import {Redirect} from 'react-router-dom';


export class Itemview extends Component{
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
          head: ['Id','Name', 'Action'],
           data: [],
           redirect: false,
        }
        this.details=this.details.bind(this);
      }
  
      componentDidMount() {
          // GET request using axios with set headers
          const headers = {
              'Content-Type': 'application/json',
              'Authorization': 'Contacts ' + localStorage.getItem('accessToken.value'),
          };
          axios.get('http://localhost:8080/item', { headers })
              .then(response => {
                  this.setState({data: response.data});
                  console.log(this.state.data);
              });
      }

      details(itemId){
          alert(itemId);
        this.setState({itemId,redirect: true});
      }
  
      renderTableData() {
        if(this.state.redirect){
            return(<Redirect to={'/itemdetails'} />)
          }
          return this.state.data.map((data, index) => {
              const { itemId, name} = data //destructuring
              return (
                  <tr key={index}>
                      <td>{itemId}</td>
                      <td>{name}</td>
                      <td><button className="btn-primary" onClick={this.details.bind(this,itemId)} >Details</button></td>
                  </tr>
              )
          })
      }
  
      renderTableHeader() {
          console.log(this.state.head)
          return this.state.head.map((key, index) => {
              return <th key={index}>{key.toUpperCase()}</th>
          })
       }
  
      render() {
          return (
             <div>
               <Navigation />
                <h1>Item View</h1>
                <Table striped bordered hover>
                   <tbody>
                      <tr>{this.renderTableHeader()}</tr>
                      {this.renderTableData()}
                   </tbody>
                </Table>
             </div>
          )
       }
}
export default Itemview;