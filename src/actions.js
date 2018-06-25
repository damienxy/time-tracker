import axios from "./axios";

export async function getProjects() {
    const { data } = await axios.get("/projects.json");
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

export async function getTimeTrack() {
    const { data } = await axios.get("/gettimetrack.json");
    return {
        type: "GET_TIME_TRACK",
        allTracks: data.allTracks
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
