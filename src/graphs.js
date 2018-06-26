// import React from "react";
// import { connect } from "react-redux";
// import { getAllTracks } from "./actions";
// import { VictoryBar, VictoryPie } from "victory";
// // import { BarChart } from "./victory";
//
// class Graphs extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//         this.getDataByDate = this.getDataByDate.bind(this);
//     }
//     componentDidMount() {
//         this.props.dispatch(getAllTracks());
//     }
//     getDataByDate() {
//         const today = new Date();
//         console.log(today);
//         console.log(this.props.allTracksByProject);
//     }
//     render() {
//         return (
//             <div>
//                 <h1>I would like to show some graphs</h1>
//                 <VictoryBar />
//                 {/* <BarChart /> */}
//                 <button onClick={this.getDataByDate}>CLICK TO GET DATA</button>
//             </div>
//         );
//     }
// }
//
// const mapStateToProps = state => {
//     return {
//         allTracks: state.allTracks,
//         allTracksByProject: state.allTracksByProject
//     };
// };
//
// export default connect(mapStateToProps)(Graphs);
