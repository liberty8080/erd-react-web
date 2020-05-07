import React from "react";
import {Route} from "react-router-dom"
import SignIn from "./components/SigninPage";
import SignupPage from "./components/SignupPage";
import ErdListPage from "./components/ErdListPage";
import App from "./components/App";
import AdminSigninPage from "./components/AdminSigninPage";
import UserManage from "./components/UserManage";
import ClassErd from "./components/ClassErd";

export default (
    <div className="container">
        <Route path="/signin" component={SignIn}/>
        <Route path="/signup" component={SignupPage}/>
        <Route path="/erdList/:userId" component={ErdListPage}/>
        <Route path="/app/:userId/:dataId" component={App}/>
        <Route path="/adminSignin" component={AdminSigninPage}/>
        <Route path="/userManage" component={UserManage}/>
        <Route path="/classErd" component={ClassErd}/>
    </div>
)


