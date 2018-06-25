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
    if (action.type == "GET_TIME_TRACK") {
        return {
            ...state,
            allTracks: action.allTracks
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
