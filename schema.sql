DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    user_id VARCHAR(16) PRIMARY KEY,
    password VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS leaderboard;

CREATE TABLE leaderboard
(
    player_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id VARCHAR(16) NOT NULL,
    score INTEGER NOT NULL
);