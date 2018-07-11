import React from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import Register from "./register";
import Login from "./login";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.navClickLog = this.navClickLog.bind(this);
        this.navClickReg = this.navClickReg.bind(this);
    }
    componentDidMount() {
        document.querySelector(".log").classList.add("activeLink");
    }
    navClickLog(e) {
        document.querySelector(".reg").classList.remove("activeLink");
        document.querySelector(".log").classList.add("activeLink");
    }
    navClickReg(e) {
        document.querySelector(".log").classList.remove("activeLink");
        document.querySelector(".reg").classList.add("activeLink");
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
                        <div className="links-container flex">
                            <div className="link log">
                                <Link to="/" onClick={e => this.navClickLog(e)}>
                                    Login
                                </Link>
                            </div>
                            <div className="link reg">
                                <Link
                                    to="/register"
                                    onClick={e => this.navClickReg(e)}
                                >
                                    Register
                                </Link>
                            </div>
                        </div>
                        <div id="login-page">
                            <Route
                                exact
                                path="/register"
                                component={Register}
                            />
                            <Route exact path="/" component={Login} />
                        </div>
                    </div>
                </HashRouter>
            </div>
        );
    }
}
