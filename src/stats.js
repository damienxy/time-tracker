import React from "react";
import { connect } from "react-redux";
import { getAllTracks } from "./actions";

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getProjectDuration = this.getProjectDuration.bind(this);
        this.convertFormat = this.convertFormat.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(getAllTracks());
    }
    getProjectDuration(projectId) {
        let totalDuration = 0;
        const projectData = this.props.allTracksByProject.filter(
            project => project.project_id == projectId
        );
        const projectArray = projectData[0].tracks;
        console.log("project array", projectArray);
        projectArray.map(track => {
            totalDuration = totalDuration + track.duration;
        });
        const totalSeconds = totalDuration / 1000;
        const totalMinutes = totalDuration / 1000 / 60;
        const totalHours = totalDuration / 1000 / 60 / 24;
        return this.convertFormat(totalDuration);
        // return (
        //     <div>
        //         Duration: {totalDuration} milliseconds or {totalSeconds} seconds
        //         or {totalMinutes} minutes or {totalHours} hours.
        //     </div>
        // );
        console.log(
            "total duration for that one project",
            totalDuration,
            "milliseconds, or ",
            totalSeconds,
            "seconds or",
            totalMinutes,
            "minutes or",
            totalHours,
            "hours."
        );
    }
    convertFormat(milliseconds) {
        let seconds = milliseconds / 1000;
        let hours = seconds / 3600;
        seconds = seconds % 3600;
        let minutes = seconds / 60;
        seconds = seconds % 60;
        return (
            <div>
                Total duration:{" "}
                {hours
                    .toFixed(0)
                    .toString()
                    .padStart(2, "0")}h{minutes
                    .toFixed(0)
                    .toString()
                    .padStart(2, 0)}m{seconds.toString().padStart(2, 0)}s
            </div>
        );
    }
    render() {
        return (
            <div>
                <div>I will show time stats</div>
                <div id="track-list">
                    {this.props.allTracksByProject &&
                        this.props.allTracksByProject.map(track => {
                            return (
                                <div
                                    key={track.project_id}
                                    className="single-track"
                                >
                                    <div>{track.name}</div>
                                    <div>Duration:</div>
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
        allTracksByProject: state.allTracksByProject
    };
};

export default connect(mapStateToProps)(Statistics);
