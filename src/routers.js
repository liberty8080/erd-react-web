import React from "react";
import {Route} from "react-router-dom"
import SignIn from "./components/SigninPage";
import SignupPage from "./components/SignupPage";
import ErdListPage from "./components/ErdListPage";

export default (
    <div className="container">
            <Route path="/signin" component={SignIn}/>
            <Route path="/signup" component={SignupPage}/>
            <Route path="/erdList/:userId" component={ErdListPage}/>
    </div>
)


