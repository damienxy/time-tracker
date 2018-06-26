import React from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import Register from "./register";
import Login from "./login";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div id="welcome">
                <div className="brand">
                    <div className="name">TRACK</div>
                    <i className="logo fas fa-chart-bar" />
                </div>
                <HashRouter>
                    <div>
                        {/* <h1 onClick={this.welcomeToggle}>{this.state.buttonText}</h1> */}
                        <Link to="/">Login</Link>
                        <Link to="/register">Register</Link>
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/" component={Login} />
                    </div>
                </HashRouter>
            </div>
        );
    }
}
