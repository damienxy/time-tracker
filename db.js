const spicedPg = require("spiced-pg");
const db = spicedPg("postgres:postgres:postgres@localhost:5432/timetracker");
const bcrypt = require("bcryptjs");

exports.hashPassword = function(plainTextPassword) {
    console.log("Running hashPassword");
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
    console.log("Running register query");
    const q = `
        INSERT INTO users (firstname, lastname, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id, email, password;
    `;
    const params = [first, last, email, hash];
    return db.query(q, params);
};

exports.getUserByEmail = function(email) {
    console.log("Running getUserByEmail");
    const q = `
        SELECT id, email, password FROM users
        WHERE email = $1
    `;
    const params = [email];
    return db.query(q, params);
};

exports.getUserById = function(userId) {
    console.log("Running getUserById");
    const q = `
        SELECT id, firstname, lastname
        FROM users
        WHERE id = $1;
    `;
    const params = [userId];
    return db.query(q, params);
};

exports.getProjects = function(userId) {
    console.log("Running getProjectsById");
    const q = `
        SELECT *
        FROM projects
        WHERE user_id = $1
    `;
    const params = [userId];
    return db.query(q, params);
};

exports.createProject = function(userId, projectName) {
    console.log("Running createProject");
    const q = `
        INSERT INTO projects (user_id, name)
        VALUES ($1, $2)
        RETURNING *
    `;
    const params = [userId, projectName];
    return db.query(q, params);
};

exports.getTimeTrack = function(userId) {
    console.log("Running getTimeTrack");
    const q = `
        SELECT * FROM timetrack
        WHERE user_id = $1
    `;
    const params = [userId];
    return db.query(q, params);
};

exports.newTimeTrack = function(
    userId,
    projectId,
    startTime,
    endTime,
    duration
) {
    console.log("Running newTimeTrack");
    const q = `
        INSERT INTO timetrack (user_id, project_id, starttime, endtime, duration)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `;
    const params = [userId, projectId, startTime, endTime, duration];
    return db.query(q, params);
};
