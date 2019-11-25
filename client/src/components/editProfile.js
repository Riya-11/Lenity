import React from 'react';
import axios from 'axios';


class editProfile extends React.Component{
    state={firstname:'',lastname:'',contactno:'',address:''};

    postEditData = async()=>{
        const res=await axios.post("http://localhost:8080/users/editProfile", {firstname:this.state.firstname,
        lastname:this.state.lastname,
        address:this.state.address,
        contactno:this.state.contactno},
        { headers: 
            { 
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('JWT_TOKEN'),
                  }
        }
        )
        console.log('res=',res);
    }

    onFormSubmit=(event)=>{
        event.preventDefault();
        console.log(this.state);
        this.postEditData();
    }
    render(){


        return(
            <div>Edit your profile
            <form onSubmit={this.onFormSubmit}>
                firstname: <input type="text"
                        value={this.state.firstname}
                        onChange={e => this.setState({firstname:e.target.value})}
                />
                lastname: <input type="text"
                        value={this.state.lastname}
                        onChange={e => this.setState({lastname:e.target.value})}
                />
                address: <input type="text"
                        value={this.state.address}
                        onChange={e => this.setState({address:e.target.value})}
                />
                contactno: <input type="text"
                        value={this.state.contactno}
                        onChange={e => this.setState({contactno:e.target.value})}
                />
                <button type="submit">Submit</button>
            </form></div>
        );
    }
}

export default editProfile;