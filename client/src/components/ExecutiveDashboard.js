import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import LogHeader from './LogHeader';
import profile from './top_service.png'



class ExecutiveDashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:true,
            user: {},
            isconfirm:false
        }
        this.handleClick = this.handleClick.bind(this);


    }

    handleClick=(e)=> {
        console.log("id ==",e.target.value);
        this.getConfirmation(e.target.value);
        this.setState(state => ({
          isconfirm: true
        }));
        window.location.reload();
      }

    getConfirmation = async(x) => {
        const res= 
        await axios.post("http://localhost:8080/executive/dashboard",{type:'food',id:x},
                          { headers: 
                    { 
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('JWT_TOKEN'),
                          }
                }
)
console.log("res confirmation",res);

    }
    

     getDataAxios= async()=>{
        console.log('jwt token',localStorage.getItem('JWT_TOKEN'));
        const res =
          await axios.get("http://localhost:8080/executive/dashboard",
                          { headers: 
                    { 
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('JWT_TOKEN'),
                          }
                }
)
        console.log("executive dashboard retun :",res.data);
        this.setState({user:res.data.executive_data, isLoading: false }, () => {
            //console.log(this.state.user.email);
            console.log("state now",this.state.user)
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
        <div><LogHeader/>
        
        <section class="about_us">
            <div class="container">
                <div class="row justify-content-between align-items-center">
                    <div class="col-lg-4">
                        <div class="about_us_img">
                            <Link to="/viewProfile"><img src={profile} alt=""/></Link>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="about_us_text">
                            
                            <h2>Order Status</h2>
                            <div>{!this.state.isLoading? <div className="row">   {this.state.user.food.map((food, index) => (
        <p> {!food.status ? <h4>Donated by:, {food.donatedBy} from {food.location} .<button className="btn btn-outline-dark"onClick={this.handleClick} value={food._id}>Confirm Delivery</button><br/></h4>:""}</p>
        ))}     </div>:<div>Loading..</div> }</div>
                            
                        </div>
                       
                    </div>
                    
                </div>
            </div>
        </section>
        
        </div>
        );

        
    }

}
        
            

   

export default ExecutiveDashboard;