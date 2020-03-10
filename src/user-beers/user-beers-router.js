const express = require('express')
const UserBeersService = require('./user-beers-service')

const userBeersRouter = express.Router()

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