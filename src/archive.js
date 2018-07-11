import React from "react";
import { connect } from "react-redux";
import { getAllTracks, getProjects, changeProjectStatus } from "./actions";

class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getProjectDuration = this.getProjectDuration.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(getProjects(false));
        this.props.dispatch(getAllTracks(false));
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
    render() {
        if (!this.props.allTracks || !this.props.projects) {
            return null;
        }
        return (
            <div>
                <div className="heading">
                    Your archived projects <div className="italic" />
                </div>
                <div id="project-list">
                    {this.props.projects &&
                        this.props.projects.map(project => {
                            return (
                                <div
                                    key={project.id}
                                    className="single-archived-project pointer"
                                    onClick={() => {
                                        this.props.dispatch(
                                            changeProjectStatus(
                                                project.id,
                                                true
                                            )
                                        );
                                    }}
                                >
                                    <div className="single-archived-project-name">
                                        {project.name}
                                        <div>
                                            {this.props.allTracksByProject &&
                                                this.getProjectDuration(
                                                    project.id,
                                                    this.props
                                                        .allTracksByProject
                                                )}
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            className="archive-button"
                                        >
                                            Restore
                                        </button>
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
        projects: state.projects,
        allTracks: state.allTracks,
        allTracksToday: state.allTracksToday,
        allTracksByProject: state.allTracksByProject,
        activeProject: state.activeProject
    };
};

export default connect(mapStateToProps)(Projects);
