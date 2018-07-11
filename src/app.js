import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from "./axios";
import Projects from "./projects";
import Statistics from "./stats";
import Archive from "./archive";
import { errorMessage } from "./actions";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.navClick = this.navClick.bind(this);
        this.convertFormat = this.convertFormat.bind(this);
        // this.convertFormatMinutes = this.convertFormatMinutes.bind(this);
    }
    navClick(e) {
        if (document.querySelector(".active")) {
            document.querySelector(".active").classList.remove("active");
        }
        e.target.classList.add("active");
    }
    convertFormat(milliseconds) {
        let seconds = milliseconds / 1000;
        let hours = seconds / 3600;
        seconds = seconds % 3600;
        let minutes = seconds / 60;
        seconds = seconds % 60;
        return (
            <div>
                {Math.trunc(hours)
                    .toString()
                    .padStart(2, "0")}h{Math.trunc(minutes)
                    .toString()
                    .padStart(2, 0)}m
                {seconds.toString().padStart(2, 0)}s
            </div>
        );
    }
    // convertFormatMinutes(milliseconds) {
    //     let seconds = milliseconds / 1000;
    //     let hours = seconds / 3600;
    //     seconds = seconds % 3600;
    //     let minutes = seconds / 60;
    //     seconds = seconds % 60;
    //     return (
    //         <div>
    //             {Math.trunc(hours)
    //                 .toString()
    //                 .padStart(2, "0")}h{Math.trunc(minutes)
    //                 .toString()
    //                 .padStart(2, 0)}m
    //         </div>
    //     );
    // }
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
                            <div className="links-container">
                                <Link
                                    to="/"
                                    className="nav-elem"
                                    onClick={e => {
                                        this.navClick(e);
                                    }}
                                >
                                    Track your time
                                </Link>
                                <Link
                                    to="/stats"
                                    className="nav-elem"
                                    onClick={e => {
                                        this.navClick(e);
                                    }}
                                >
                                    Statistics
                                </Link>
                                <Link
                                    to="/archive"
                                    className="nav-elem"
                                    onClick={e => {
                                        this.navClick(e);
                                    }}
                                >
                                    Archive
                                </Link>
                                <a className="nav-elem" href="/logout">
                                    Logout
                                </a>
                            </div>
                        </div>
                        <div id="mainview">
                            <div>
                                <Route
                                    exact
                                    path="/"
                                    render={() => (
                                        <Projects
                                            convertFormat={this.convertFormat}
                                            convertFormatMinutes={
                                                this.convertFormatMinutes
                                            }
                                        />
                                    )}
                                />
                                <Route
                                    exact
                                    path="/stats"
                                    render={() => {
                                        return (
                                            <Statistics
                                                convertFormat={
                                                    this.convertFormat
                                                }
                                            />
                                        );
                                    }}
                                />
                                <Route
                                    exact
                                    path="/archive"
                                    render={() => {
                                        return (
                                            <Archive
                                                convertFormat={
                                                    this.convertFormat
                                                }
                                            />
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
