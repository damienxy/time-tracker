import React from "react";
import { connect } from "react-redux";
import { getAllTracks } from "./actions";
import { VictoryBar, VictoryPie } from "victory";

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            period: "today"
        };
        this.getProjectDuration = this.getProjectDuration.bind(this);
        this.getTotalDurationAllProjects = this.getTotalDurationAllProjects.bind(
            this
        );
        // this.getTotalDurationByDay = this.getTotalDurationByDay.bind(this);
        this.convertFormat = this.convertFormat.bind(this);
        this.navClick = this.navClick.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(getAllTracks()).then(() => {
            this.getTotalDurationAllProjects(this.props.allTracksToday);
            // this.getTotalDurationByDay(new Date());
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
    getProjectDuration(projectId) {
        let totalDuration = 0;
        const projectData = this.props.allTracksByProject.filter(
            project => project.project_id == projectId
        );
        const projectArray = projectData[0].tracks;
        projectArray.map(track => {
            totalDuration = totalDuration + track.duration;
        });
        return this.convertFormat(totalDuration);
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
        const totalTrackedTime = this.convertFormat(totalDuration);
        this.setState({
            totalTrackedTime: totalTrackedTime,
            period: period
        });
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
    render() {
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
                            <button
                                className="activePeriod"
                                type="button"
                                onClick={e => {
                                    this.getTotalDurationAllProjects(
                                        this.props.allTracksToday
                                    );
                                    this.navClick(e);
                                }}
                            >
                                Today
                            </button>
                            <button
                                type="button"
                                onClick={e => {
                                    this.getTotalDurationAllProjects(
                                        this.props.allTracksThisWeek
                                    );
                                    this.navClick(e);
                                }}
                            >
                                This week
                            </button>
                            <button
                                type="button"
                                onClick={e => {
                                    this.getTotalDurationAllProjects(
                                        this.props.allTracksThisMonth
                                    );
                                    this.navClick(e);
                                }}
                            >
                                This month
                            </button>
                            <button
                                type="button"
                                onClick={e => {
                                    this.getTotalDurationAllProjects(
                                        this.props.allTracksThisYear
                                    );
                                    this.navClick(e);
                                }}
                            >
                                This year
                            </button>
                            <button
                                type="button"
                                onClick={e => {
                                    this.getTotalDurationAllProjects(
                                        this.props.allTracks
                                    );
                                    this.navClick(e);
                                }}
                            >
                                Total
                            </button>
                        </div>
                    </div>
                </div>
                <VictoryPie
                    data={this.props.dataPie}
                    x="project_name"
                    y="total_duration"
                    margin={{ left: 20, right: 20 }}
                    width={500}
                />
                {/* <VictoryBar
                    data={this.props.dataPie}
                    x="project_name"
                    y="total_duration"
                /> */}
                <div id="track-list">
                    {this.props.allTracksByProject &&
                        this.props.allTracksByProject.map(track => {
                            return (
                                <div
                                    key={track.project_id}
                                    className="single-track"
                                >
                                    <div>{track.name}</div>
                                    <div>
                                        {this.getProjectDuration(
                                            track.project_id
                                        )}
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
        allTracksByProject: state.allTracksByProject,
        dataPie: state.dataPie,
        allTracksToday: state.allTracksToday,
        allTracksThisWeek: state.allTracksThisWeek,
        allTracksThisMonth: state.allTracksThisMonth,
        allTracksThisYear: state.allTracksThisYear
    };
};

export default connect(mapStateToProps)(Statistics);
