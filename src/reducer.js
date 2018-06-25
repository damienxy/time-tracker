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
    if (action.type == "GET_ALL_TRACKS") {
        const allTracks = action.allTracks;
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
        console.log("allTracks", allTracks);
        console.log("allTracksByProject", allTracksByProject);
        return {
            ...state,
            allTracks: action.allTracks,
            allTracksByProject: allTracksByProject
        };
    }
    if (action.type == "GET_PROJECT_TRACKS") {
        return {
            ...state,
            projectTracks: action.projectTracks
        };
    }
    if (action.type == "SAVE_TIME_TRACK") {
        return {
            ...state,
            allTracks: [...state.allTracks, action.singleTrack]
        };
    }

    return state; // state needs to be returned at the bottom of the reducer function
}
