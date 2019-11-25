import React from 'react';
import { Link } from 'react-router-dom';

import viewProfile from './viewProfile';
import LogHeader from './LogHeader';
import '../css/style.css';

import '../css/Dashboard.css';
import profile from './top_service.png'

class Dashboard extends React.Component{
    render(){
        return(
            <div><LogHeader/><section class="about_us">
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
                            <h2>About Believe</h2>
                            <p>According to the research firm Frost & Sullivan, the estimated
                                size of the North American used test and measurement equipment
                                market was $446.4 million in 2004 and is estimated to grow to
                                $654.5 million by 2011. For over 50 years, companies and governments
                                have procured used test and measurement instruments.</p>
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
        <div className="row dashboard container-fluid"><Link to="/viewProfile">View your profile</Link>
            <Link to="/foodDonate">Donate food</Link><Link to="/search">Search for items</Link><Link to="/itemrequests">approve your pending requests</Link></div></div>

        );
    };
}

export default Dashboard;