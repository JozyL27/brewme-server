# BrewMe Server

# Base URL:
- https://protected-beach-04591.herokuapp.com/api

## Overview

- Stack:
  - Client: React.js, HTML5, CSS3
  - Web Server: Node, Express, PostgreSQL 
  - Database: PostgreSQL 
  - Tests: Supertest, Chai

## Endpoints
- /api/beers
    - /api/beers/:beer_name endpoint retrieves a beer or list of beers that contain the word or keyword searched. example keyword: "bud" retrieves "bud light", "budweiser", "bud light lime", etc.
    - /api/beers/random endpoint retrieves one random beer from the database

- /api/userBeers
    - /api/userBeers/:user_id endpoint retrieves all the beers associated with the user id that has been input. Example user_id: "2", returns a list of: "bud light", "Gumballhead", & "budweiser".
    - POST /api/userBeers is used for adding a beer to the user's "My beers" list. It requires a user id & beer id.
    - DELETE /api/userBeers is used for removing a beer from the user's "My beers" list. It requires a user id & beer id.

- /api/auth
    - /api/auth/login endpoint is used to verify a user has an existing account and to sign in to his / her account.

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`