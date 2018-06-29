import React from "react";
import { connect } from "react-redux";
import {
    getProjects,
    createProject,
    getAllTracks,
    saveTimeTrack,
    activeProject,
    changeProjectStatus,
    errorMessage
} from "./actions";
import Tracker from "./tracker";
import ProjectStats from "./projectstats";

let tracker;
let startTime;
let endTime;
let duration;
let currentProj;

class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewStatus: "hidden",
            currentSecs: 0,
            currentMins: 0,
            currentHours: 0,
            tracking: false
        };
        this.getTotalDurationAllProjects = this.getTotalDurationAllProjects.bind(
            this
        );
        this.toggleViewStatus = this.toggleViewStatus.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.selectProject = this.selectProject.bind(this);
        this.handleTracker = this.handleTracker.bind(this);
        this.track = this.track.bind(this);
        this.navClick = this.navClick.bind(this);
        this.handleArchiveButton = this.handleArchiveButton.bind(this);
        this.hitEnter = this.hitEnter.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(getAllTracks(true));
        this.props.dispatch(getProjects(true));
        // .then((...args) => {
        //     this.getTotalDurationAllProjects(this.props.allTracksToday);
        // });
    }

    componentWillUnmount() {
        console.log("Projects component unmounting");
        if (this.state.tracking) {
            this.handleTracker();
        } else {
            return;
        }
        //     {
        //         this.props.activeProject &&
        //             this.props.dispatch(
        //                 activeProject(
        //                     this.props.activeProject[0].project_id,
        //                     this.props.activeProject[0].project_name
        //                 )
        //             );
        //     }
        // {this.state.tracking &&
        //         endTime = Date.parse(new Date());
        //         duration = endTime - this.startTime;
        //         this.props.dispatch(
        //             saveTimeTrack(currentProj, startTime, endTime, duration)
        //         )}
    }
    getTotalDurationAllProjects(array) {
        // Calculating total tracked time
        console.log("running getTotalDurationAllProjects");
        let totalDuration = 0;
        array.map(track => {
            totalDuration += track.duration;
        });
        const totalTrackedTime = this.props.convertFormat(totalDuration);
        // this.setState({
        //     totalTrackedTime: totalTrackedTime
        // });
    }
    toggleViewStatus() {
        this.field.value = null;
        if (this.state.viewStatus == "hidden") {
            this.setState({
                viewStatus: "visible"
            });
        } else {
            this.setState({
                viewStatus: "hidden"
            });
        }
    }
    handleInput(e) {
        console.log(e.target.value);
        this[e.target.name] = e.target.value;
    }
    selectProject(projectName, projectId) {
        this.setState(
            {
                currentProject: projectName,
                currentProjectId: projectId
            },
            () => {
                console.log(this.state.currentProjectId);
                this.handleTracker();
            }
        );
    }
    hitEnter(e) {
        if (e.keyCode == 13) {
            this.props.dispatch(createProject(this.projectName));
            this.toggleViewStatus();
        }
    }
    handleTracker() {
        console.log("handling tracker");
        if (this.props.errorMessage) {
            this.props.dispatch(errorMessage(null));
        }
        if (!this.state.tracking) {
            if (currentProj == this.state.currentProjectId) {
                currentProj = this.state.currentProjectId;
                console.log("clicked proj to start:", currentProj);
                startTime = Date.parse(new Date());
                console.log("start time", startTime);
                this.track();
                this.setState({
                    tracking: true
                });
            } else {
                currentProj = this.state.currentProjectId;
                console.log("clicked proj to start:", currentProj);
                startTime = Date.parse(new Date());
                console.log("start time", startTime);
                this.track();
                this.setState({
                    tracking: true,
                    currentSecs: 0,
                    currentMins: 0,
                    currentHours: 0
                });
            }
        } else if (this.state.tracking) {
            if (currentProj == this.state.currentProjectId) {
                console.log("clicked proj to end:", currentProj);
                endTime = Date.parse(new Date());
                duration = endTime - startTime;
                this.props.dispatch(
                    saveTimeTrack(currentProj, startTime, endTime, duration)
                );
                console.log("end time", endTime);
                clearTimeout(tracker);
                this.setState({
                    tracking: false
                });
            } else {
                console.log(
                    "clicked proj to change:",
                    this.state.currentProjectId
                );
                endTime = Date.parse(new Date());
                duration = endTime - startTime;
                this.props.dispatch(
                    saveTimeTrack(currentProj, startTime, endTime, duration)
                );
                console.log("end time", endTime);
                clearTimeout(tracker);
                this.setState(
                    {
                        tracking: false,
                        currentSecs: 0,
                        currentMins: 0,
                        currentHours: 0
                    },
                    () => {
                        currentProj = this.state.currentProjectId;
                        this.handleTracker();
                    }
                );
            }
        }
    }
    track() {
        tracker = setTimeout(() => {
            console.log(this.state.currentSecs);
            if (this.state.currentSecs == 59) {
                if (this.state.currentMins == 59) {
                    if (this.state.currentHours == 23) {
                        this.setState({
                            currentSecs: 0,
                            currentMins: 0,
                            currentHours: 0
                        });
                    } else {
                        this.setState({
                            currentSecs: 0,
                            currentMins: 0,
                            currentHours: this.state.currentHours + 1
                        });
                    }
                } else {
                    this.setState({
                        currentSecs: 0,
                        currentMins: this.state.currentMins + 1
                    });
                }
            } else {
                this.setState({
                    currentSecs: this.state.currentSecs + 1
                });
            }
            this.track();
        }, 1000);
    }
    navClick(e) {
        if (e.target.classList.contains("activeButton")) {
            e.target.classList.remove("activeButton");
        } else {
            if (document.querySelector(".activeButton")) {
                document
                    .querySelector(".activeButton")
                    .classList.remove("activeButton");
            }
            if (!e.target.classList.contains("counter")) {
                e.target.classList.add("activeButton");
            }
        }
    }
    handleArchiveButton(projectId) {
        if (this.state.tracking) {
            this.props.dispatch(
                errorMessage("You can't archive while tracking")
            );
            console.log("can't archive while tracking");
        } else {
            this.props.dispatch(changeProjectStatus(projectId, false));
        }
    }
    render() {
        // if (!this.props.allTracks || !this.props.allTracksToday) {
        //     return null;
        // }
        return (
            <div>
                <div id="current-project">
                    <div className="current-project-title">
                        {this.props.activeProject ? (
                            <div
                                className="counter pointer"
                                onClick={e => {
                                    this.handleTracker();
                                    this.navClick(e);
                                }}
                            >
                                {this.props.activeProject[0].project_name.toUpperCase()}
                            </div>
                        ) : (
                            <div className="alt-text">
                                <div>No project chosen</div>
                            </div>
                        )}
                    </div>
                    {this.props.activeProject && (
                        <div>
                            <div className="current-project-title">
                                {this.state.currentHours +
                                    "h" +
                                    this.state.currentMins
                                        .toString()
                                        .padStart(2, "0") +
                                    "m" +
                                    this.state.currentSecs
                                        .toString()
                                        .padStart(2, "0") +
                                    "s"}
                            </div>
                        </div>
                        // <Tracker
                        //     projectId={this.state.currentProjectId}
                        //     handleTracker={this.handleTracker}
                        // />
                    )}
                    {/* <div>

                        {this.getTotalDurationAllProjects(this.props.allTracks)}
                    </div> */}
                </div>

                <div className="heading">
                    All your projects{" "}
                    <div className="italic flex between">
                        <div>(click to start/stop tracking)</div>
                        {this.props.errorMessage && (
                            <div className="red">
                                {this.props.errorMessage[0]}
                            </div>
                        )}
                    </div>
                </div>
                <div id="project-list">
                    {this.props.projects &&
                        this.props.projects.map(project => {
                            return (
                                <div
                                    key={project.id}
                                    className="single-project pointer"
                                >
                                    <div
                                        className="single-project-name"
                                        onClick={e => {
                                            this.selectProject(
                                                project.name,
                                                project.id
                                            ),
                                                this.props.dispatch(
                                                    activeProject(
                                                        project.id,
                                                        project.name
                                                    )
                                                ),
                                                this.navClick(e);
                                        }}
                                    >
                                        {project.name}
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            className="archive-button"
                                            onClick={() => {
                                                this.handleArchiveButton(
                                                    project.id
                                                );
                                            }}
                                        >
                                            Archive
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div
                    className="add-project pointer"
                    onClick={this.toggleViewStatus}
                >
                    Add new project<span className="add pointer">+</span>
                    <div
                        id="uploader"
                        className={this.state.viewStatus}
                        onClick={e => e.stopPropagation()}
                    >
                        <input
                            className={this.state.viewStatus}
                            autoFocus="autofocus"
                            onChange={e => this.handleInput(e)}
                            onKeyDown={e => this.hitEnter(e)}
                            name="projectName"
                            placeholder="Project name"
                            ref={field => (this.field = field)}
                        />

                        <button
                            className={this.state.viewStatus}
                            type="button"
                            onClick={() => {
                                this.props.dispatch(
                                    createProject(this.projectName)
                                ),
                                    this.toggleViewStatus();
                            }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        projects: state.projects,
        allTracks: state.allTracks,
        allTracksToday: state.allTracksToday,
        activeProject: state.activeProject,
        errorMessage: state.errorMessage
    };
};

export default connect(mapStateToProps)(Projects);
