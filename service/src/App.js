import React, {Component} from 'react';
import axios from 'axios';
//import { DropDownList } from '@progress/kendo-react-dropdowns'
import './index.css'

class App extends Component {

    state = {
      selectValue: 'Books',
      avail_quantity: [],
      sel_val: 'Books',
      name: null,
      quantity: null,
      address: null,
      text: null
    }

    handleChange = (e) => {
      this.setState({
        selectValue:e.target.value
      });
    }

    handleChange2 = (e) => {
      this.setState({
        [e.target.id]: e.target.value
      })
    }

    handleChange3 = (e) => {
      this.setState({
        sel_val: e.target.value
      })
    }


    handleSubmit = (e) => {
      e.preventDefault();
      console.log(this.state);
      this.getResponse();
    }

    handleSubmit2 = (e) => {
      //e.preventDefault();
      console.log(this.state);
      this.reqToLenity();
    }

    getResponse = async() => {
      var response = await axios.post("http://localhost:8080/inquiry/"+this.state.selectValue);
      console.log(response.data.Available);
      this.setState({
        avail_quantity: response.data.Available,
        text: 'Items Available'
      })
    }

    reqToLenity = async() => {
      var res = await axios.post("http://localhost:8080/request", {
          name: this.state.name,
          address: this.state.address,
          quantity: this.state.quantity,
          category: this.state.sel_val
      });
    }

    render() {
      //var message='You selected '+this.state.selectValue;
      //console.log(this.state);
      return (
        <div>
          <br/><br/>
          <center><h1 className="contact">Contact Us</h1></center>
          <br/><br/>
          <div className="container">
            
          <br/>
          
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Check for Availability by Category: </label><br/>
            <select 
              value={this.state.selectValue} 
              onChange={this.handleChange}
              className="form-control" 
            >
              <option value="Books">Books</option>
              <option value="Clothes">Clothes</option>
            </select>
            </div>
            <button className="btn btn-primary">Submit</button>
          </form>
          <br/>
          
          <p>{this.state.avail_quantity} {this.state.text}</p><br/>
          
          <br/>
          </div><br/><br/>
          <center><h3 className="request">Request Lenity</h3></center>
          <br/>


          <div className="container">
          <form onSubmit={this.handleSubmit2}>
            <div className="form-group">
              <label>Name of the organization:</label>
            <input type="text" id="name" onChange={this.handleChange2} className="form-control"/>
            </div>
            <div className="form-group">
            <label>Address:</label>
            <input type="text" id="address" onChange={this.handleChange2} className="form-control"/>
            </div>
            <div className="form-group">
            <label>Quantity:</label>
            <input type="number" id="quantity" onChange={this.handleChange2} className="form-control"/>
            </div>
            <div className="form-group">
            <label>Item:</label><br/>
            <select 
              value={this.state.sel_val} 
              onChange={this.handleChange3} 
              className="form-control"
            >
              <option value="Books">Books</option>
              <option value="Clothes">Clothes</option>
            </select>
            </div>
            <br/>
            
            <button className="btn btn-primary">Submit</button>
          </form>
          </div><br/><br/><br/>
        </div>        
      );
    }
}

export default App;
