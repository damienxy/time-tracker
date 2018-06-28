import React from "react";
import { connect } from "react-redux";
import { getAllTracks } from "./actions";
import { VictoryBar, VictoryPie } from "victory";

class Graphs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getDataByDate = this.getDataByDate.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(getAllTracks());
    }
    getDataByDate() {
        const today = new Date();
        console.log(today);
        console.log(this.props.allTracksByProject);
    }
    render() {
        return (
            <div>
                <VictoryPie
                    data={this.props.dataPie}
                    x="project_name"
                    y="total_duration"
                    margin={{ left: 20, right: 20 }}
                    width={900}
                />
                {/* <VictoryBar
                    data={this.props.dataPie}
                    x="project_name"
                    y="total_duration"
                    margin={{ left: 20, right: 20 }}
                    width={200}
                    height={150}
                /> */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        dataPie: state.dataPie
    };
};

export default connect(mapStateToProps)(Graphs);
