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
        /// Function to order data by project
        function byProject(array) {
            let checking = [];
            let orderByProject = [];
            for (var i = 0; i < array.length; i++) {
                if (
                    checking.filter(id => id == array[i].project_id).length == 0
                ) {
                    checking.push(array[i].project_id);
                    orderByProject.push({
                        project_id: array[i].project_id,
                        name: array[i].name,
                        tracks: []
                    });
                }
            }
            for (var j = 0; j < array.length; j++) {
                for (var i = 0; i < orderByProject.length; i++) {
                    if (array[j].project_id == orderByProject[i].project_id) {
                        orderByProject[i].tracks.push(array[j]);
                    }
                }
            }

            return orderByProject;
        }
        /// creating array ordering tracks by project
        const allTracksByProject = byProject(allTracks);

        // creating array ordering tracks by project
        // let checking = [];
        // let allTracksByProject = [];
        // for (var i = 0; i < allTracks.length; i++) {
        //     if (
        //         checking.filter(id => id == allTracks[i].project_id).length == 0
        //     ) {
        //         checking.push(allTracks[i].project_id);
        //         allTracksByProject.push({
        //             project_id: allTracks[i].project_id,
        //             name: allTracks[i].name,
        //             tracks: []
        //         });
        //     }
        // }
        // for (var j = 0; j < allTracks.length; j++) {
        //     for (var i = 0; i < allTracksByProject.length; i++) {
        //         if (
        //             allTracks[j].project_id == allTracksByProject[i].project_id
        //         ) {
        //             allTracksByProject[i].tracks.push(allTracks[j]);
        //         }
        //     }
        // }

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
        // ordered by project
        const allTracksByProjectToday = byProject(allTracksToday);
        // creating array with tracks of this week
        const allTracksThisWeek = allTracks.filter(track => {
            const startDate = new Date(Number(track.starttime));
            const endDate = new Date(Number(track.endtime));
            const today = new Date();
            const dayInWeek = today.getDay();
            const firstDayThisWeekString =
                Date.parse(today) - (dayInWeek - 1) * 1000 * 60 * 60 * 24;
            // console.log("first day in Week: ", firstDayThisWeekString);
            // console.log(
            //     "first day in Week as date: ",
            //     new Date(Number(firstDayThisWeekString))
            // );
            const firstDayThisWeek = new Date(Number(firstDayThisWeekString));
            return (
                Number(
                    "" +
                        startDate.getFullYear() +
                        startDate
                            .getMonth()
                            .toString()
                            .padStart(2, "0") +
                        startDate
                            .getDate()
                            .toString()
                            .padStart(2, "0")
                ) >=
                Number(
                    "" +
                        firstDayThisWeek.getFullYear() +
                        firstDayThisWeek
                            .getMonth()
                            .toString()
                            .padStart(2, "0") +
                        firstDayThisWeek
                            .getDate()
                            .toString()
                            .padStart(2, "0")
                )
            );
        });
        // ordered by project
        const allTracksByProjectThisWeek = byProject(allTracksThisWeek);
        // creating array with tracks of this month
        const allTracksThisMonth = allTracks.filter(track => {
            const startDate = new Date(Number(track.starttime));
            const endDate = new Date(Number(track.endtime));
            const today = new Date();
            return (
                "" + startDate.getFullYear() + startDate.getMonth() ==
                    "" + today.getFullYear() + today.getMonth() &&
                "" + endDate.getFullYear() + endDate.getMonth() ==
                    "" + today.getFullYear() + today.getMonth()
            );
        });
        // ordered by project
        const allTracksByProjectThisMonth = byProject(allTracksThisMonth);
        // creating array with tracks of this year
        const allTracksThisYear = allTracks.filter(track => {
            const startDate = new Date(Number(track.starttime));
            const endDate = new Date(Number(track.endtime));
            const today = new Date();
            return (
                "" + startDate.getFullYear() == "" + today.getFullYear() &&
                "" + endDate.getFullYear() == "" + today.getFullYear()
            );
        });
        // ordered by project
        const allTracksByProjectThisYear = byProject(allTracksThisYear);

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
        // Trying to create data pie with all periods
        function graphDataEach(period) {
            const periodData = [];
            for (var i = 0; i < period.length; i++) {
                let totalDuration = 0;
                period[i].tracks.map(
                    track => (totalDuration = totalDuration + track.duration)
                );
                periodData.push({
                    project_name: period[i].name,
                    total_duration: totalDuration
                });
            }
            return periodData;
        }

        function getDataArray(today, thisWeek, thisMonth, thisYear, total) {
            const graphDataArray = [
                today,
                thisWeek,
                thisMonth,
                thisYear,
                total
            ];
            return graphDataArray;
        }

        const graphArrays = getDataArray(
            graphDataEach(allTracksByProjectToday),
            graphDataEach(allTracksByProjectThisWeek),
            graphDataEach(allTracksByProjectThisMonth),
            graphDataEach(allTracksByProjectThisYear),
            graphDataEach(allTracksByProject)
        );

        // console.log("dataPie", dataPie);
        // console.log("allTracks", allTracks);
        // console.log("allTracksByProject", allTracksByProject);
        // console.log(
        //     "allTracksByProjectWithFunction",
        //     allTracksByProjectWithFunction
        // );
        // console.log("allTracksToday", allTracksToday);
        // console.log("allTracksByProjectToday", allTracksByProjectToday);
        // console.log("allTracksThisWeek", allTracksThisWeek);
        // console.log("allTracksThisMonth", allTracksThisMonth);
        // console.log("allTracksThisYear", allTracksThisYear);
        return {
            ...state,
            allTracks: action.allTracks,
            allTracksToday: allTracksToday,
            allTracksThisWeek: allTracksThisWeek,
            allTracksThisMonth: allTracksThisMonth,
            allTracksThisYear: allTracksThisYear,
            allTracksByProject: allTracksByProject,
            allTracksByProjectToday: allTracksByProjectToday,
            allTracksByProjectThisWeek: allTracksByProjectThisWeek,
            allTracksByProjectThisMonth: allTracksByProjectThisMonth,
            allTracksByProjectThisYear: allTracksByProjectThisYear,
            graphArrays: graphArrays,
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
    if (action.type == "CURRENT_PERIOD") {
        return {
            ...state,
            currentPeriod: action.period
        };
    }
    if (action.type == "SHOW_PROJECTS") {
        return {
            ...state,
            showProjects: [action.boolean]
        };
    }

    return state; // state needs to be returned at the bottom of the reducer function
}
