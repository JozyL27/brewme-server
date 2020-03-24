const express = require('express')
const path = require('path')
const UserBeersService = require('./user-beers-service')


const userBeersRouter = express.Router()
const jsonBodyParser = express.json()


userBeersRouter
    .route('/:user_id')
    .all(checkUserExists)
    .get((req, res, next) => {
        UserBeersService.getUserBeers(req.app.get('db'), req.params.user_id)
            .then(beers => {
                res.status(200).json(beers)
            })
            .catch(next)
    })

userBeersRouter
    .route('/')
    .post(jsonBodyParser, checkUserBeerExists, (req, res, next) => {
        const { user_id, beer_id } = req.body
        const newBeer = { user_id, beer_id }

        for (const [key, value] of Object.entries(newBeer))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })
        
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
    .delete(jsonBodyParser, (req, res, next) => {
        const { user_id, beer_id } = req.body

        UserBeersService.deleteBeer(
            req.app.get('db'),
            user_id,
            beer_id
        )
        .then(numRowsAffected => {
            res.status(204).end()
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

async function checkUserBeerExists(req, res, next) {
    const { user_id, beer_id } = req.body

    try {
        const newBeer = await UserBeersService.getUserBeer(
            req.app.get('db'),
            user_id,
            beer_id
        )

        if (newBeer)
            return res.status(400).json({
                error: `Beer already in "My Beer" list!`
            })

            res.newBeer = newBeer
            next()
    } catch (error) {
        next(error)
    }
}






module.exports = userBeersRouter