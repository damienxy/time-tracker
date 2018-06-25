import React from "react";
import { connect } from "react-redux";
import { getProjects, createProject } from "./actions";
import Tracker from "./tracker";

class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewStatus: "hidden"
        };
        this.toggleViewStatus = this.toggleViewStatus.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.selectProject = this.selectProject.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(getProjects());
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
    selectProject(projectName) {
        this.setState({
            currentProject: projectName
        });
    }
    render() {
        return (
            <div>
                <div id="current-project">
                    {this.state.currentProject
                        ? this.state.currentProject
                        : "Click on project to start tracking"}
                </div>
                <div>I will show all projects</div>
                <div id="projectList">
                    {this.props.projects &&
                        this.props.projects.map(project => {
                            return (
                                <div
                                    key={project.id}
                                    onClick={() => {
                                        this.selectProject(project.name);
                                    }}
                                    className="single-project"
                                >
                                    <div>{project.name}</div>
                                </div>
                            );
                        })}
                </div>
                <div onClick={this.toggleViewStatus}>Add new project</div>
                <input
                    className={this.state.viewStatus}
                    onChange={e => this.handleInput(e)}
                    name="projectName"
                    placeholder="Project name"
                />
                <button
                    className={this.state.viewStatus}
                    type="button"
                    onClick={() =>
                        this.props.dispatch(createProject(this.projectName))
                    }
                >
                    Add project
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        projects: state.projects,
        allTracks: state.allTracks
    };
};

export default connect(mapStateToProps)(Projects);
