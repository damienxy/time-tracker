import React from "react";
import { connect } from "react-redux";
import { getTimeTracksByProject } from "./actions";

class ProjectStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.dispatch(getTimeTracksByProject(this.props.projectId));
    }
    render() {
        return (
            <div>
                <div>I return stats by project</div>
                <div className="project-stats">
                    {this.props.projectTracks &&
                        this.props.projectTracks.map(track => {
                            return (
                                <div key={track.id}>
                                    <div>{track.name}</div>
                                    <div>{track.duration}</div>
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("logging projectTracks", state.projectTracks);
    return {
        projectTracks: state.projectTracks
    };
};

export default connect(mapStateToProps)(ProjectStats);
