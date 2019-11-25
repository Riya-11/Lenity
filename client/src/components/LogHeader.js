import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../actions';

import '../css/style.css';
import '../css/Header.css';
import '../css/LogHeader.css';
import logo from './favicon.png';

class LogHeader extends React.Component{
    
    render(){
        return(
//             <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
//                 <Link to="/" className="navbar-brand">Lenity</Link>
//                 <div className="collapse navbar-collapse">
//                     <ul className="navbar-nv mr-auto">
//                         <li className="nav-item">
//                             <Link to="/dashboard" className="nav-link">Dashboard</Link>
//                         </li>

//                     </ul>
//                     <ul className="nav navbar-nav ml-auto">
//                         {!this.props.isAuth ?[<li className="nav-item">
//                             <Link to="/signup" className="nav-link">Sign Up</Link>
//                         </li>,
//                         <li className="nav-item">
//                             <Link to="/signin" className="nav-link">Sign In</Link>
//         </li>,
//     <li className="nav-item">
//     <Link to="/executivesignin" className="nav-link">Sign In As executive</Link>
// </li>] : null }
//                         {this.props.isAuth ?[<li className="nav-item">
//                             <Link to="/signout"className="nav-link" onClick={this.signOut}>Sign Out</Link>
//                         </li>]:null }
                        
//                     </ul>
//                 </div>
//             </nav>
<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
<a class="navbar-brand" href="#">Logo</a>

<ul class="navbar-nav nav-right">
  <li class="nav-item">
    <a class="nav-link" href="#">Link 1</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link 2</a>
  </li>

  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
      Dropdown link
    </a>
    <div class="dropdown-menu">
      <a class="dropdown-item" href="#">Link 1</a>
      <a class="dropdown-item" href="#">Link 2</a>
      <a class="dropdown-item" href="#">Link 3</a>
    </div>
  </li>
  <li class="nav-item">
    <Link to="/signout">SignOut</Link>
  </li>

</ul>

</nav>
  
        );
    };

}

export default LogHeader;