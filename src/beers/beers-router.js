const express = require('express')
const beerService = require('./beers-service')


const beersRouter = express.Router()


beersRouter
    .route('/')
    .get((req, res, next) => {
        beerService.getAllBeers(req.app.get('db'))
            .then(beers => {
                res.json(beers)
            })
            .catch(next)
    })





module.exports = beersRouter