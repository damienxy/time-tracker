const express = require("express");
const app = express();
const compression = require("compression");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const db = require("./db");
const secrets = require("./secrets");

// Middleware

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

const cookieSessionMiddleware = cookieSession({
    secret: secrets.COOKIE_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14
});

app.use(cookieSessionMiddleware);

app.use(compression());

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(express.static("./public"));

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// Routes

app.post("/register.json", function(req, res) {
    db.hashPassword(req.body.password).then(hash => {
        db
            .register(req.body.first, req.body.last, req.body.email, hash)
            .then(results => {
                req.session.userId = results.rows[0].id;
            })
            .then(() => {
                res.json({
                    success: true
                });
            })
            .catch(err => {
                console.log("Error in app.post '/register' ", err);
                res.json({
                    success: false
                });
            });
    });
});

app.post("/login.json", function(req, res) {
    let userId;
    db
        .getUserByEmail(req.body.email)
        .then(results => {
            userId = results.rows[0].id;
            return db.checkPassword(
                req.body.password,
                results.rows[0].password
            );
        })
        .then(doesMatch => {
            if (doesMatch) {
                req.session.userId = userId;
            } else {
                throw new Error("Incorrect password");
            }
        })
        .then(() => {
            res.json({
                success: true
            });
        })
        .catch(err => {
            console.log("Error in app.post('/login') ", err);
            res.json({
                success: false
            });
        });
});

app.post("/projects.json", (req, res) => {
    db
        .getProjects(req.session.userId, req.body.status)
        .then(({ rows }) => {
            res.json({
                projects: rows
            });
        })
        .catch(err => {
            console.log("Error in app.post(/projects.json)", err);
        });
});

app.post("/newproject.json", (req, res) => {
    db
        .createProject(req.session.userId, req.body.projectName)
        .then(({ rows }) => {
            res.json({
                project: rows[0]
            });
        })
        .catch(err => {
            console.log("Error in app.post(/newproject.json)", err);
        });
});

app.post("/projectstatus.json", (req, res) => {
    db
        .setProjectStatus(
            req.session.userId,
            req.body.projectId,
            req.body.status
        )
        .then(({ rows }) => {
            console.log("Rows", rows);
            res.json({
                success: true
            });
        })
        .catch(err => {
            console.log("Error in app.post(/projectstatus.json)", err);
        });
});

app.post("/getalltracks.json", (req, res) => {
    console.log("running getalltracks");
    db
        .getTimeTrackAll(req.session.userId, req.body.status)
        .then(({ rows }) => {
            res.json({
                allTracks: rows
            });
        })
        .catch(err => {
            console.log("Error in app.get(/getalltracks.json", err);
        });
});

app.post("/getprojecttracks.json", (req, res) => {
    console.log(
        "running getprojecttracks",
        req.session.userId,
        req.body.projectId
    );
    db
        .getTimeTrackByProject(req.session.userId, req.body.projectId)
        .then(({ rows }) => {
            console.log("server results", rows);
            res.json({
                projectTracks: rows
            });
        })
        .catch(err => {
            console.log("Error in app.get(/getprojecttracks.json", err);
        });
});

app.post("/newtimetrack.json", (req, res) => {
    console.log("running newtimetrack");
    db
        .newTimeTrack(
            req.session.userId,
            req.body.projectId,
            req.body.startTime,
            req.body.endTime,
            req.body.duration
        )
        .then(({ rows }) => {
            res.json({
                singleTrack: rows[0]
            });
        })
        .catch(err => {
            console.log("Error in app.post(/newtimetrack.json)", err);
        });
});

app.get("/logout", function(req, res) {
    req.session = null;
    res.redirect("/");
});

// All other routes should be above these two:

app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
