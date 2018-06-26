import React from "react";
import { connect } from "react-redux";
import { getAllTracks } from "./actions";
import { VictoryBar, VictoryPie } from "victory";

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getProjectDuration = this.getProjectDuration.bind(this);
        this.getTotalDurationAllProjects = this.getTotalDurationAllProjects.bind(
            this
        );
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
        return this.convertFormat(totalDuration);
    }
    getTotalDurationAllProjects() {
        // Calculating total tracked time
        let totalDuration = 0;
        this.props.allTracks.map(track => (totalDuration += track.duration));
        const totalTrackedTime = this.convertFormat(totalDuration);
        this.setState({
            totalTrackedTime: totalTrackedTime
        });
    }
    convertFormat(milliseconds) {
        let seconds = milliseconds / 1000;
        let hours = seconds / 3600;
        seconds = seconds % 3600;
        let minutes = seconds / 60;
        console.log(minutes);
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
                    .padStart(2, 0)}m
                {seconds.toString().padStart(2, 0)}s
            </div>
        );
    }
    render() {
        return (
            <div>
                <div>I will show time stats</div>
                <div>
                    <div
                        className="all-projects"
                        onClick={this.getTotalDurationAllProjects}
                    >
                        All projects, all times
                        <div>
                            {this.state.totalTrackedTime &&
                                this.state.totalTrackedTime}
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
                <VictoryBar
                    data={this.props.dataPie}
                    x="project_name"
                    y="total_duration"
                />
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
        dataPie: state.dataPie
    };
};

export default connect(mapStateToProps)(Statistics);
