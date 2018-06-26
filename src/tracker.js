import React from "react";
import { connect } from "react-redux";
import { getAllTracks, saveTimeTrack } from "./actions";

class Tracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSecs: 0,
            currentMins: 0,
            currentHours: 0,
            tracking: false
        };
    }
    componentDidMount() {
        this.props.handleTracker();
        this.props.dispatch(getAllTracks());
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
                <button type="button" onClick={this.props.handleTracker}>
                    Click
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
