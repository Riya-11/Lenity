import React from 'react';
import {  BrowserRouter,Route} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';

import Header from './Header';
import Home from './Home';
import Signup from './Signup';
import SignIn from './SignIn';
import Signout from './Signout';
import Dashboard from './Dashboard';
import Verify from './Verify';
import reducers from '../reducers';
import viewProfile from './viewProfile';
import editProfile from './editProfile';
import foodDonate from './foodDonate';
import Donate from './Donate';
import ExecutiveSignin from './ExecutiveSignin';
import ExecutiveDashboard from './ExecutiveDashboard';
import Search from './Search';
import ItemDetail from './ItemDetail';
import itemrequests from './itemrequests';
var jwtToken = localStorage.getItem('JWT_TOKEN');
const App = () => {
    return (
        <div className="app">
            <Provider store={createStore(reducers,{
                auth: {
                    token:jwtToken,
                    isAuthenticated:jwtToken? true :false
                }
            }, applyMiddleware(reduxThunk))}>
            <BrowserRouter>
                    
        <div className="container-fluid">
        <Route exact path="/" component={Home}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/signin" component={SignIn}/>
        <Route exact path="/signout" component={Signout}/>
        <Route exact path="/verify" component={Verify}/>
        <Route exact path="/viewProfile" component={viewProfile}/>
        <Route exact path="/editProfile" component={editProfile}/>
        <Route exact path="/foodDonate" component={foodDonate}/>
        <Route exact path="/Donate" component={Donate}/>
        <Route exact path="/executivesignin" component={ExecutiveSignin}/>
        <Route exact path="/execdashboard" component={ExecutiveDashboard}/>
        <Route exact path="/search" component={Search}/>
        <Route exact path="/ItemDetail" component={ItemDetail}/>
        <Route exact path="/itemrequests" component={itemrequests}/>



        </div>
    </BrowserRouter>
    </Provider>

    </div>
    );
}

export default App;