import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

import axios from 'axios';
import './Itemview.css';
import Navigation from './Navigation';


export class ItemDetails extends Component{
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
          head: ['Id','Name', 'Description','Type'],
           data: []
        }
      }
  
      componentDidMount() {
          // GET request using axios with set headers
          const headers = {
              'Content-Type': 'application/json',
              'Authorization': 'Contacts ' + localStorage.getItem('accessToken.value'),
          };
          axios.get('http://localhost:8080/item/itemId', { headers })
              .then(response => {
                  this.setState({data: response.data});
                  console.log(this.state.data);
              });
      }
  
      renderTableData() {
          return this.state.data.map((data, index) => {
              const { itemId, name,description,type} = data //destructuring
              return (
                  <tr key={index}>
                      <td>{itemId}</td>
                      <td>{name}</td>
                      <td>{description}</td>
                      <td>{type}</td>
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
               <a href="/itemview">Back</a>
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
export default ItemDetails;