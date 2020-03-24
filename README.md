# BrewMe Server

## Overview

- Stack:
  - Client: React.js, HTML5, CSS3
  - Web Server: Node and Express with PostgreSQL 
  - Database: Locally hosted PostgreSQL 
  - Tests: Supertest, Chai

## Setup
- Clone this repository to your local machine
- Install the dependencies for the project
- Ensure your PostgreSQL server is running
- Create a database for the server with your user as the owner
- Run the command `npm run migrate -- 3` to create the database tables
- run the command `npm t` to run tests

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`