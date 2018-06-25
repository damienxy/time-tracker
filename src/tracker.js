import React from "react";
import { connect } from "react-redux";
import { getAllTracks, saveTimeTrack } from "./actions";

let tracker;
let startTime;
let endTime;
let duration;

class Tracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSecs: 0,
            currentMins: 0,
            currentHours: 0
        };
        this.startTracker = this.startTracker.bind(this);
        this.stopTracker = this.stopTracker.bind(this);
        this.track = this.track.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(getAllTracks());
    }
    startTracker() {
        startTime = Date.parse(new Date());
        console.log("start time", startTime);
        this.track();
    }
    stopTracker() {
        endTime = Date.parse(new Date());
        duration = endTime - startTime;
        this.props.dispatch(
            /// !!! *** exchange 1 for actual project id *** !!! ///
            saveTimeTrack(21, startTime, endTime, duration)
        );
        console.log("end time", endTime);
        clearTimeout(tracker);
    }
    track() {
        tracker = setTimeout(() => {
            console.log(this.state.currentSecs);
            this.setState({
                currentSecs: this.state.currentSecs + 1
            });
            this.track();
        }, 1000);
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.currentHours +
                        "h" +
                        this.state.currentMins +
                        "m" +
                        this.state.currentSecs +
                        "s"}
                </div>
                <div>Click on project to start tracking</div>
                <button type="button" onClick={this.startTracker}>
                    Test button - Start
                </button>
                <button type="button" onClick={this.stopTracker}>
                    Test button - End
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("loggin all tracks", state.allTracks);
    return {
        allTracks: state.allTracks
    };
};

export default connect(mapStateToProps)(Tracker);
