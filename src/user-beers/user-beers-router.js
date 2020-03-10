const express = require('express')
const UserBeersService = require('./user-beers-service')

const userBeersRouter = express.Router()


userBeersRouter
    .route('/:user_id')
    .get((req, res, next) => {
        UserBeersService.getUserBeers(req.app.get('db'), req.params.user_id)
            .then(beers => {
                res.json(beers)
            })
            .catch(next)
    })


module.exports = userBeersRouter