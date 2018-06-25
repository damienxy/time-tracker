DROP TABLE IF EXISTS timetrack;

CREATE TABLE timetrack (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    project_id INTEGER REFERENCES projects(id) NOT NULL,
    starttime BIGINT NOT NULL,
    endtime BIGINT NOT NULL,
    duration INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
