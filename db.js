const spicedPg = require("spiced-pg");
const db = spicedPg("postgres:postgres:postgres@localhost:5432/timetracker");
const bcrypt = require("bcryptjs");

exports.hashPassword = function(plainTextPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt((err, salt) => {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(plainTextPassword, salt, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    }).catch(err => console.log("Error in hashPassword ", err));
};

exports.checkPassword = function(
    textEnteredInLoginForm,
    hashedPasswordFromDatabase
) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(
            textEnteredInLoginForm,
            hashedPasswordFromDatabase,
            function(err, doesMatch) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doesMatch);
                }
            }
        );
    });
};

exports.register = function(first, last, email, hash) {
    const q = `
        INSERT INTO users (firstname, lastname, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id, email, password;
    `;
    const params = [first, last, email, hash];
    return db.query(q, params);
};

exports.getUserByEmail = function(email) {
    const q = `
        SELECT id, email, password FROM users
        WHERE email = $1
    `;
    const params = [email];
    return db.query(q, params);
};

exports.getUserById = function(userId) {
    const q = `
        SELECT id, firstname, lastname
        FROM users
        WHERE id = $1;
    `;
    const params = [userId];
    return db.query(q, params);
};

exports.getProjects = function(userId, status) {
    const q = `
        SELECT *
        FROM projects
        WHERE user_id = $1
        AND active = $2
    `;
    const params = [userId, status];
    return db.query(q, params);
};

exports.createProject = function(userId, projectName) {
    const q = `
        INSERT INTO projects (user_id, name)
        VALUES ($1, $2)
        RETURNING *
    `;
    const params = [userId, projectName];
    return db.query(q, params);
};

exports.getTimeTrackAll = function(userId, status) {
    const q = `
        SELECT timetrack.id, timetrack.user_id, timetrack.project_id, starttime, endtime, duration, timetrack.created_at, projects.name
        FROM timetrack
        JOIN projects
        ON timetrack.project_id = projects.id
        WHERE timetrack.user_id = $1
        AND projects.active = $2
    `;
    const params = [userId, status];
    return db.query(q, params);
};

exports.getTimeTrackByProject = function(userId, projectId) {
    const q = `
        SELECT timetrack.id, timetrack.user_id, timetrack.project_id, starttime, endtime, duration, timetrack.created_at, projects.name
        FROM timetrack
        JOIN projects
        ON timetrack.project_id = projects.id
        WHERE timetrack.user_id = $1
        AND timetrack.project_id = $2
        AND projects.active = true
    `;
    const params = [userId, projectId];
    return db.query(q, params);
};

exports.newTimeTrack = function(
    userId,
    projectId,
    startTime,
    endTime,
    duration
) {
    const q = `
        INSERT INTO timetrack (user_id, project_id, starttime, endtime, duration)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `;
    const params = [userId, projectId, startTime, endTime, duration];
    return db.query(q, params);
};

exports.setProjectStatus = function(userId, projectId, status) {
    const q = `
    UPDATE projects
    SET active = $3
    WHERE id = $2
    AND user_id = $1
    RETURNING *
`;
    const params = [userId, projectId, status];
    return db.query(q, params);
};
