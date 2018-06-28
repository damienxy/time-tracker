import React from "react";
import { connect } from "react-redux";
import { getAllTracks, getProjects, changeProjectStatus } from "./actions";

class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.dispatch(getProjects(false));
        this.props.dispatch(getAllTracks(false));
    }
    render() {
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
        activeProject: state.activeProject
    };
};

export default connect(mapStateToProps)(Projects);
