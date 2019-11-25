import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class viewProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:true,
            user: {}
        }

    }

     getDataAxios= async()=>{
        console.log('jwt token',localStorage.getItem('JWT_TOKEN'));
        const res =
          await axios.get("http://localhost:8080/users/profile",
                          { headers: 
                    { 
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('JWT_TOKEN'),
                          }
                }
)
        console.log(res.data);
        this.setState({user:res.data.user, isLoading: false }, () => {
            console.log(this.state.isLoading, '..state updated');
          }); 
          

    }
    componentDidMount(){
         this.getDataAxios();
       }
    
    //   componentDidUpdate(){
    //     this.getDataAxios();
    //   }
    
    render(){

        return(
        <div>{!this.state.isLoading ? <div>username:{this.state.user.local.username}<br/>
        email:{this.state.user.local.email}<br/>
            <Link to="/editprofile">Edit your profile</Link>
        </div>:<div>Loading..</div> }</div>
        );

        
    }

}

export default viewProfile;