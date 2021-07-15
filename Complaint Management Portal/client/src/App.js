import React, {useEffect} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Signup from './components/auth/Singup';
import Header from './components/layout/Header';
import Complaints from './components/complaints/Complaints';

import {loadUser} from "./store/actions/authActions";
import store from "./store/store";

import * as ROUTES from "./constants/routes";

import './app.css';

const App = ({isAuthenticated}) => {
    // check if the there is a user at the logged in
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    let routes = isAuthenticated ?
        (
            <Switch>
                <Route exact path={ROUTES.COMPLAINTS} component={Complaints}/>
                <Redirect to={ROUTES.COMPLAINTS}/>
            </Switch>
        ) :
        (
            <Switch>
                <Route exact path={ROUTES.SIGN_UP} component={Signup}/>
                <Route exact path={ROUTES.SIGN_IN} component={Login}/>
                <Redirect to={ROUTES.SIGN_IN}/>
            </Switch>
        );
    return (
        <>
            <Header/>
            <div className="container">
                {routes}
            </div>
            <Footer/>
        </>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(App);
