import axios from "./axios";

export async function getProjects(status) {
    const { data } = await axios.post("/projects.json", {
        status
    });
    return {
        type: "GET_PROJECTS",
        projects: data.projects
    };
}

export async function createProject(projectName) {
    const { data } = await axios.post("/newproject.json", {
        projectName
    });
    return {
        type: "CREATE_PROJECT",
        project: data.project
    };
}

export async function getAllTracks(status) {
    const { data } = await axios.post("/getalltracks.json", {
        status
    });
    return {
        type: "GET_ALL_TRACKS",
        allTracks: data.allTracks
    };
}

export async function getTimeTracksByProject(projectId) {
    const { data } = await axios.post("/getprojecttracks.json", {
        projectId: projectId
    });
    console.log("actions.jks data", projectId, data);
    return {
        type: "GET_PROJECT_TRACKS",
        projectTracks: data.projectTracks
    };
}

export async function saveTimeTrack(projectId, startTime, endTime, duration) {
    const { data } = await axios.post("/newtimetrack.json", {
        projectId,
        startTime,
        endTime,
        duration
    });
    console.log("results data of saveTimeTrack in actions.js", data);
    return {
        type: "SAVE_TIME_TRACK",
        singleTrack: data.singleTrack
    };
}

export function activeProject(projectId, projectName) {
    return {
        type: "ACTIVE_PROJECT",
        projectId,
        projectName
    };
}

export function getCurrentPeriod(period) {
    return {
        type: "CURRENT_PERIOD",
        period
    };
}

export function showProjects(boolean) {
    return {
        type: "SHOW_PROJECTS",
        boolean
    };
}

export async function changeProjectStatus(projectId, status) {
    const { data } = await axios.post("/projectstatus.json", {
        projectId,
        status
    });
    return {
        type: "CHANGE_PROJECT_STATUS",
        projectId
    };
}
