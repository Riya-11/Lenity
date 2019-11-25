import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import LogHeader from './LogHeader';

const jwtToken = localStorage.getItem('JWT_TOKEN');



class ItemDetail extends React.Component{

    constructor(props){
        super(props);
        this.state={request: false
        


        }
    }



    handleClick=(e)=> {
        console.log("id ==",e.target.value);
        this.getConfirmation(e.target.value);
        // this.setState(state => ({
        //   isconfirm: true
        // }));
      }

      getConfirmation = async(x) => {
        
        await axios.post("http://localhost:8080/item/item-details",{id:x},
                          { headers: 
                    { 
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('JWT_TOKEN'),
                          }
                }
).then(res => {
    if (res.status === 200) {console.log(res);
      this.setState({ request: true});
}
})



    }


    render(){
    console.log(this.props.location.state.requested);
    if(this.state.request){
        return <Redirect to = {{ pathname: "/Dashboard"
    
      }} />;

      }

        return(
        <div><LogHeader/>details....item id:{this.props.location.state.donation._id}
    available to request: {this.props.location.state.requested} {this.props.location.state.requested ? "unavailable": <button value={this.props.location.state.donation._id} onClick={this.handleClick} type="submit">Request</button>}</div>
        );
    }
}

export default ItemDetail;