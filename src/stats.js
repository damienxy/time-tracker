import React from "react";
import { connect } from "react-redux";
import { getAllTracks, getCurrentPeriod } from "./actions";
import { VictoryBar, VictoryPie } from "victory";
import Graphs from "./graphs";

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            period: "today",
            periodNum: 0
        };
        this.getProjectDuration = this.getProjectDuration.bind(this);
        this.getTotalDurationAllProjects = this.getTotalDurationAllProjects.bind(
            this
        );
        // this.getTotalDurationByDay = this.getTotalDurationByDay.bind(this);
        // this.convertFormat = this.convertFormat.bind(this);
        this.navClick = this.navClick.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(getAllTracks(true)).then((...args) => {
            this.getTotalDurationAllProjects(this.props.allTracksToday);
            // this.getTotalDurationByDay(new Date());
            this.props.dispatch(
                getCurrentPeriod(this.props.allTracksByProject)
            );
        });
    }
    navClick(e) {
        if (document.querySelector(".activePeriod")) {
            document
                .querySelector(".activePeriod")
                .classList.remove("activePeriod");
        }
        e.target.classList.add("activePeriod");
    }
    getProjectDuration(projectId, array) {
        let totalDuration = 0;
        const projectData = array.filter(
            project => project.project_id == projectId
        );
        if (!projectData.length) {
            return this.props.convertFormat(0);
        } else {
            const projectArray = projectData[0].tracks;
            projectArray.map(track => {
                totalDuration = totalDuration + track.duration;
            });
            return this.props.convertFormat(totalDuration);
        }
    }
    getTotalDurationAllProjects(array) {
        // Calculating total tracked time
        let period;
        if (array == this.props.allTracks) {
            period = "all times";
        } else if (array == this.props.allTracksToday) {
            period = "today";
        } else if (array == this.props.allTracksThisWeek) {
            period = "this week";
        } else if (array == this.props.allTracksThisMonth) {
            period = "this month";
        } else if (array == this.props.allTracksThisYear) {
            period = "this year";
        }
        let totalDuration = 0;
        array.map(track => {
            totalDuration += track.duration;
        });
        const totalTrackedTime = this.props.convertFormat(totalDuration);
        this.setState({
            totalTrackedTime: totalTrackedTime,
            period: period
        });
    }

    render() {
        if (
            !this.props.allTracksThisWeek ||
            !this.props.allTracksByProject ||
            !this.state.period
        ) {
            return null;
        }
        return (
            <div>
                <div>
                    <div className="all-projects">
                        <div className="all-projects-title">
                            TOTAL TRACKED {this.state.period}
                        </div>
                        <div className="all-projects-title">
                            {this.state.totalTrackedTime &&
                                this.state.totalTrackedTime}{" "}
                        </div>

                        <div className="button-container">
                            <div className="button-ind">
                                <button
                                    className="activePeriod"
                                    type="button"
                                    onClick={e => {
                                        this.getTotalDurationAllProjects(
                                            this.props.allTracksToday
                                        );
                                        this.setState({
                                            periodNum: 0
                                        });
                                        this.navClick(e);
                                    }}
                                >
                                    Today
                                </button>
                            </div>
                            <div className="button-ind">
                                <button
                                    type="button"
                                    onClick={e => {
                                        this.getTotalDurationAllProjects(
                                            this.props.allTracksThisWeek
                                        );
                                        this.setState({
                                            periodNum: 1
                                        });
                                        this.navClick(e);
                                    }}
                                >
                                    This week
                                </button>
                            </div>
                            <div className="button-ind">
                                <button
                                    type="button"
                                    onClick={e => {
                                        this.getTotalDurationAllProjects(
                                            this.props.allTracksThisMonth
                                        );
                                        this.setState({
                                            periodNum: 2
                                        });
                                        this.navClick(e);
                                    }}
                                >
                                    This month
                                </button>
                            </div>
                            <div className="button-ind">
                                <button
                                    type="button"
                                    onClick={e => {
                                        this.getTotalDurationAllProjects(
                                            this.props.allTracksThisYear
                                        );
                                        this.setState({
                                            periodNum: 3
                                        });
                                        this.navClick(e);
                                    }}
                                >
                                    This year
                                </button>
                            </div>
                            <div className="button-ind">
                                <button
                                    type="button"
                                    onClick={e => {
                                        this.getTotalDurationAllProjects(
                                            this.props.allTracks
                                        );
                                        this.setState({
                                            periodNum: 4
                                        });
                                        this.navClick(e);
                                    }}
                                >
                                    Total
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Graphs id="graph-component" /> */}
                <VictoryPie
                    data={this.props.graphArrays[this.state.periodNum]}
                    x="project_name"
                    y="total_duration"
                    margin={{ left: 20, right: 20 }}
                    width={800}
                />
                {/* <VictoryBar
                    data={this.props.dataPie}
                    x="project_name"
                    y="total_duration"
                /> */}
                <div id="track-list" className="flex wrap">
                    {this.props.allTracksByProject &&
                        this.props.allTracksByProject.map(track => {
                            return (
                                <div
                                    key={track.project_id}
                                    className="single-track"
                                >
                                    <div className="margin-bottom">
                                        {track.name}
                                    </div>
                                    <div>
                                        {this.state.periodNum == 0 &&
                                            this.getProjectDuration(
                                                track.project_id,
                                                this.props
                                                    .allTracksByProjectToday
                                            )}
                                        {this.state.periodNum == 1 &&
                                            this.getProjectDuration(
                                                track.project_id,
                                                this.props
                                                    .allTracksByProjectThisWeek
                                            )}
                                        {this.state.periodNum == 2 &&
                                            this.getProjectDuration(
                                                track.project_id,
                                                this.props
                                                    .allTracksByProjectThisMonth
                                            )}
                                        {this.state.periodNum == 3 &&
                                            this.getProjectDuration(
                                                track.project_id,
                                                this.props
                                                    .allTracksByProjectThisYear
                                            )}
                                        {this.state.periodNum == 4 &&
                                            this.getProjectDuration(
                                                track.project_id,
                                                this.props.allTracksByProject
                                            )}
                                        {/* {this.getProjectDuration(
                                            track.project_id,
                                            this.props
                                                .allTracksByProjectThisWeek
                                        )} */}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        allTracks: state.allTracks,
        allTracksToday: state.allTracksToday,
        allTracksThisWeek: state.allTracksThisWeek,
        allTracksThisMonth: state.allTracksThisMonth,
        allTracksThisYear: state.allTracksThisYear,
        allTracksByProject: state.allTracksByProject,
        allTracksByProjectToday: state.allTracksByProjectToday,
        allTracksByProjectThisWeek: state.allTracksByProjectThisWeek,
        allTracksByProjectThisMonth: state.allTracksByProjectThisMonth,
        allTracksByProjectThisYear: state.allTracksByProjectThisYear,
        currentPeriod: state.currentPeriod,
        graphArrays: state.graphArrays
    };
};

export default connect(mapStateToProps)(Statistics);
