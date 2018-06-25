import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from "./axios";
import Projects from "./projects";
import Tracker from "./tracker";
import Statistics from "./stats";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <div id="navbar">
                            <h1>You're successfully logged in</h1>
                            <Link to="/projects" className="nav-elem">
                                Track your time
                            </Link>
                            <Link to="/stats" className="nav-elem">
                                Statistics
                            </Link>
                            <a className="nav-elem" href="/logout">
                                Logout
                            </a>
                        </div>
                        <div id="mainview">
                            <div>
                                <div>Visible on every main screen</div>
                                <Tracker />
                                <Route
                                    exact
                                    path="/projects"
                                    component={Projects}
                                />
                                <Route
                                    exact
                                    path="/stats"
                                    component={Statistics}
                                />
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
