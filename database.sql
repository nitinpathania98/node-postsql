CREATE DATABASE lms

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(60) NOT NULL,
    active BOOLEAN DEFAULT true
);

CREATE TABLE leave_submit (
    id SERIAL PRIMARY KEY,
    leave_type VARCHAR(50) NOT NULL,
    purpose TEXT,
    duration INT NOT NULL,
);
