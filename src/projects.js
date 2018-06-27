import React from "react";
import { connect } from "react-redux";
import {
    getProjects,
    createProject,
    getAllTracks,
    saveTimeTrack,
    activeProject
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
        this.toggleViewStatus = this.toggleViewStatus.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.selectProject = this.selectProject.bind(this);
        this.handleTracker = this.handleTracker.bind(this);
        this.track = this.track.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(getProjects());
        this.props.dispatch(getAllTracks());
    }
    componentWillUnmount() {
        {
            this.props.activeProject &&
                this.props.dispatch(
                    activeProject(
                        this.props.activeProject[0].project_id,
                        this.props.activeProject[0].project_name
                    )
                );
        }
    }
    toggleViewStatus() {
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
    handleTracker() {
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

    render() {
        return (
            <div>
                <div id="current-project">
                    <div className="current-project-title">
                        {this.props.activeProject && (
                            <div
                                className="pointer"
                                onClick={this.handleTracker}
                            >
                                {this.props.activeProject[0].project_name.toUpperCase()}
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
                </div>

                <div className="heading">All your projects</div>
                <div id="project-list">
                    {this.props.projects &&
                        this.props.projects.map(project => {
                            return (
                                <div
                                    key={project.id}
                                    onClick={() => {
                                        this.selectProject(
                                            project.name,
                                            project.id
                                        ),
                                            this.props.dispatch(
                                                activeProject(
                                                    project.id,
                                                    project.name
                                                )
                                            );
                                    }}
                                    className="single-project pointer"
                                >
                                    <div>{project.name}</div>
                                    {/* <ProjectStats projectId={project.id} /> */}
                                </div>
                            );
                        })}
                </div>
                <div
                    className="single-project pointer"
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
                            name="projectName"
                            placeholder="Project name"
                        />

                        <button
                            className={this.state.viewStatus}
                            type="button"
                            onClick={() =>
                                this.props.dispatch(
                                    createProject(this.projectName)
                                )
                            }
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
        activeProject: state.activeProject
    };
};

export default connect(mapStateToProps)(Projects);
