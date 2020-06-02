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
    - /api/beers/:beer_name endpoint retrieves a beer or list of beers that contain the word or keyword searched. example keyword: "bud" retrieves "bud light", "budweiser", "bud light lime", etc. as an array.
    - /api/beers/random endpoint retrieves one random beer from the database as an object.

- /api/userBeers
    - /api/userBeers/:user_id endpoint retrieves all the beers associated with the user id that has been input. Example user_id: "2", returns a list of: "bud light", "Gumballhead", & "budweiser".
    - POST /api/userBeers is used for adding a beer to the user's "My beers" list. It requires a user id & beer id.
    - DELETE /api/userBeers is used for removing a beer from the user's "My beers" list. It requires a user id & beer id.

- /api/auth
    - /api/auth/login endpoint is used to verify a user has an existing account and to sign in to his / her account. This API uses JSON web tokens for authentication.

- /api/users
    - endpoint is used to create a brewme user account. Username and password are the only required fields. Password must contain 1 upper case letter, a number, a special character, and must be at least 8 characters long. Example Post: user_name: zelda, password: #Password60

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`