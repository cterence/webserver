import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Welcome } from "./components";
import LoginPage from "../login";
import SignupPage from "../signup";
import FeaturesPage from "../features";

const HomePage = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={LoginPage}></Route>
                <Route path="/signup" component={SignupPage}></Route>
                <Route path="/features" component={FeaturesPage}></Route>
                <Route path="/" component={Welcome}></Route>
            </Switch>
        </Router>
    );
};

export default HomePage;
