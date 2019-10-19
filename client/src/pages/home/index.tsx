import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import LoginPage from "../login";
import SignupPage from "../signup";

const HomePage = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={LoginPage}></Route>
                <Route path="/signup" component={SignupPage}></Route>
                <Route path="/" component={Welcome}></Route>
            </Switch>
        </Router>
    );
};

export default HomePage;
