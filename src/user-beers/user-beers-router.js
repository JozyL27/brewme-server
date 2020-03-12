const express = require('express')
const path = require('path')
const UserBeersService = require('./user-beers-service')

const userBeersRouter = express.Router()
const jsonBodyParser = express.json()


// requires auth in future

userBeersRouter
    .route('/:user_id')
    .all(checkUserExists)
    .get((req, res, next) => {
        UserBeersService.getUserBeers(req.app.get('db'), req.params.user_id)
            .then(beers => {
                res.json(beers)
            })
            .catch(next)
    })



// adding post feature to /:user_id, add new beer by using req.params.user_id instead of
//manually adding id grab it from params
//requires auth in future

userBeersRouter
    .route('/')
    .post(jsonBodyParser, (req, res, next) => {
        const { user_id, beer_id } = req.body
        const newBeer = { user_id, beer_id }

        for (const [key, value] of Object.entries(newBeer))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })
        
        // future use code below
        // newBeer.user_id = req.user.id

        UserBeersService.insertBeer(
            req.app.get('db'),
            newBeer
        )
        .then(beer => {
            res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${beer.id}`))
                .json(beer)
        })
        .catch(next)
    })


async function checkUserExists(req, res, next) {
    try {
        const user = await UserBeersService.getUserById(
            req.app.get('db'),
            req.params.user_id
        )

        if (!user)
            return res.status(404).json({
                error: `User doesn't exist`
            })

            res.user = user
            next()
    } catch (error) {
        next(error)
    }
}



module.exports = userBeersRouter