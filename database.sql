CREATE DATABASE demo

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  employeetype VARCHAR(50) ,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(50) ,
  cpassword VARCHAR(50),
  phonenumber VARCHAR(50) ,
  country VARCHAR(50) ,
  state VARCHAR(50) ,
  city VARCHAR(50) ,
  address VARCHAR(50) ,
);
