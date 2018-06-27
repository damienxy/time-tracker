export default function(state = {}, action) {
    if (action.type == "GET_PROJECTS") {
        return {
            ...state,
            projects: action.projects
        };
    }
    if (action.type == "CREATE_PROJECT") {
        return {
            ...state,
            projects: [...state.projects, action.project]
        };
    }
    if (action.type == "ACTIVE_PROJECT") {
        return {
            ...state,
            activeProject: [
                {
                    project_id: action.projectId,
                    project_name: action.projectName
                }
            ]
        };
    }
    if (action.type == "GET_ALL_TRACKS") {
        const allTracks = action.allTracks;
        // creating array ordering tracks by project
        let checking = [];
        let allTracksByProject = [];
        for (var i = 0; i < allTracks.length; i++) {
            if (
                checking.filter(id => id == allTracks[i].project_id).length == 0
            ) {
                checking.push(allTracks[i].project_id);
                allTracksByProject.push({
                    project_id: allTracks[i].project_id,
                    name: allTracks[i].name,
                    tracks: []
                });
            }
        }
        for (var j = 0; j < allTracks.length; j++) {
            for (var i = 0; i < allTracksByProject.length; i++) {
                if (
                    allTracks[j].project_id == allTracksByProject[i].project_id
                ) {
                    allTracksByProject[i].tracks.push(allTracks[j]);
                }
            }
        }
        // creating array with project duration for pie chart
        const dataPie = [];
        for (var i = 0; i < allTracksByProject.length; i++) {
            let totalDuration = 0;
            allTracksByProject[i].tracks.map(
                track => (totalDuration = totalDuration + track.duration)
            );
            dataPie.push({
                project_name: allTracksByProject[i].name,
                total_duration: totalDuration
            });
        }
        // creating array with tracks of today
        const allTracksToday = allTracks.filter(track => {
            const startDate = new Date(Number(track.starttime));
            const endDate = new Date(Number(track.endtime));
            const today = new Date();
            return (
                "" +
                    startDate.getFullYear() +
                    startDate.getMonth() +
                    startDate.getDate() ==
                    "" +
                        today.getFullYear() +
                        today.getMonth() +
                        today.getDate() &&
                "" +
                    endDate.getFullYear() +
                    endDate.getMonth() +
                    endDate.getDate() ==
                    "" +
                        today.getFullYear() +
                        today.getMonth() +
                        today.getDate()
            );
        });
        // console.log("dataPie", dataPie);
        console.log("allTracks", allTracks);
        // console.log("allTracksByProject", allTracksByProject);
        console.log("allTracksToday", allTracksToday);
        return {
            ...state,
            allTracks: action.allTracks,
            allTracksByProject: allTracksByProject,
            allTracksToday: allTracksToday,
            dataPie: dataPie
        };
    }
    if (action.type == "GET_PROJECT_TRACKS") {
        return {
            ...state,
            projectTracks: action.projectTracks
        };
    }
    if (action.type == "SAVE_TIME_TRACK") {
        console.log("saving time track...", action);
        return {
            ...state,
            allTracks: [...state.allTracks, action.singleTrack]
        };
    }

    return state; // state needs to be returned at the bottom of the reducer function
}
