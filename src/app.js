import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from "./axios";
import Projects from "./projects";
import Tracker from "./tracker";
import Statistics from "./stats";
import Graphs from "./graphs";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.navClick = this.navClick.bind(this);
    }

    navClick(e) {
        if (document.querySelector(".active")) {
            document.querySelector(".active").classList.remove("active");
        }
        e.target.classList.add("active");
    }
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <div id="navbar">
                            <div className="brand">
                                <div className="name">TRACK</div>
                                <i className="logo fas fa-chart-bar" />
                            </div>

                            <Link
                                to="/projects"
                                className="nav-elem"
                                onClick={e => {
                                    this.navClick(e);
                                }}
                            >
                                Track your time
                            </Link>
                            {/* <Link
                                to="/graphs"
                                className="nav-elem"
                                onClick={e => {
                                    this.navClick(e);
                                }}
                            >
                                Graphs
                            </Link> */}
                            <Link
                                to="/stats"
                                className="nav-elem"
                                onClick={e => {
                                    this.navClick(e);
                                }}
                            >
                                Statistics
                            </Link>
                            <a className="nav-elem" href="/logout">
                                Logout
                            </a>
                        </div>
                        <div id="mainview">
                            <div>
                                {/* <div>Visible on every main screen</div> */}
                                {/* <Tracker /> */}
                                <Route
                                    exact
                                    path="/projects"
                                    // render={() => (
                                    //     <Projects navClick={this.navClick} />
                                    // )}
                                    component={Projects}
                                />
                                <Route
                                    exact
                                    path="/stats"
                                    component={Statistics}
                                />
                                {/* <Route
                                    exact
                                    path="/graphs"
                                    component={Graphs}
                                /> */}
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
