// import React from "react";
// import { connect } from "react-redux";
// import { getAllTracks } from "./actions";
//
// class Calc extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//         this.getProjectDuration = this.getProjectDuration.bind(this);
//         this.getTotalDurationAllProjects = this.getTotalDurationAllProjects.bind(
//             this
//         );
//         this.convertFormat = this.convertFormat.bind(this);
//     }
//     componentDidMount() {
//         this.props.dispatch(getAllTracks());
//     }
//     getProjectDuration(projectId) {
//         let totalDuration = 0;
//         const projectData = this.props.allTracksByProject.filter(
//             project => project.project_id == projectId
//         );
//         const projectArray = projectData[0].tracks;
//         console.log("project array", projectArray);
//         projectArray.map(track => {
//             totalDuration = totalDuration + track.duration;
//         });
//         return this.convertFormat(totalDuration);
//     }
//     getTotalDurationAllProjects() {
//         let totalDuration = 0;
//         this.props.allTracks.map(track => (totalDuration += track.duration));
//         const totalTrackedTime = this.convertFormat(totalDuration);
//         this.setState({
//             totalTrackedTime: totalTrackedTime
//         });
//     }
//     convertFormat(milliseconds) {
//         let seconds = milliseconds / 1000;
//         let hours = seconds / 3600;
//         seconds = seconds % 3600;
//         let minutes = seconds / 60;
//         console.log(minutes);
//         seconds = seconds % 60;
//         return (
//             <div>
//                 Total duration:{" "}
//                 {hours
//                     .toFixed(0)
//                     .toString()
//                     .padStart(2, "0")}h{minutes
//                     .toFixed(0)
//                     .toString()
//                     .padStart(2, 0)}m
//                 {seconds.toString().padStart(2, 0)}s
//             </div>
//         );
//     }
//     render() {
//         return (
//             <div>
//                 <div>Calculations</div>
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
// export default connect(mapStateToProps)(Calc);
