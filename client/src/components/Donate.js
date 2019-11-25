import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import viewProfile from './viewProfile';
import LogHeader from './LogHeader';
import '../css/style.css';

import '../css/Dashboard.css';
import profile from './top_service.png'


const jwtToken = localStorage.getItem('JWT_TOKEN');


class Donate extends React.Component{

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
                            <h5>
                                2000<br/><span>since</span>
                            </h5>
                            <h2>Thank You, {this.props.location.state.donation.donatedBy}</h2>
                            <p>Thank You for your generous contribution. Our executive <b>{this.props.location.state.executive.email}</b>
                            is on his way to collect your food.</p>
                            <div class="banner_item">
                                <div class="single_item">
                                    <h2><Link to="/foodDonate">Donate Food</Link></h2>
                                    
                                </div>
                                <div class="single_item">
                                    <h2><Link to="/">Donate Stuff</Link></h2>
                                    
                                </div>
                                <div class="single_item">
                                    <h2><Link to="/">Requests</Link></h2>
                                    
                                </div>
                            </div>
                            
                        </div>
                       
                    </div>
                    <div class="col-lg-12">
                        <div class="text-center about_btn">
                                <Link class="btn_3 " to="/search">Search for Stuff</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        executive:{this.props.location.state.executive.email}
    daan kiya: {this.props.location.state.donation.donatedBy}</div>
        );
    }
}

export default Donate;