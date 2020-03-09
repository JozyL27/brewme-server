const express = require('express')
const BeerService = require('./beers-service')


const beersRouter = express.Router()


beersRouter
    .route('/')
    .get((req, res, next) => {
        BeerService.getAllBeers(req.app.get('db'))
            .then(beers => {
                res.json(beers)
            })
            .catch(next)
    })


beersRouter
    .route('/:beer_id')
    .all(checkBeerExists)
    .get((req, res, next) => {
        BeerService.getById(req.app.get('db'), req.params.beer_id)
            .then(beer => {
                res.json(beer)
            })
            .catch(next)
    })


beersRouter
    .route('/:beer_name')
    .get((req, res, next) => {
        BeerService.getByName(req.app.get('db'), req.params.beer_name)
            .then(beer => {
                res.json(beer)
            })
            .catch(next)
    })


beersRouter
    .route('/random/beer')
    .get((req, res, next) => {
        BeerService.getRandomBeer(req.app.get('db'))
            .then(random => {
                res.json(random)
            })
            .catch(next)
    })


async function checkBeerExists(req, res, next) {
    try {
        const beer = await BeerService.getById(
            req.app.get('db'),
            req.params.beer_id
        )

        if (!beer)
            return res.status(404).json({
                error: `Beer doesn't exist`
            })

            res.beer = beer
            next()
    } catch (error) {
        next(error)
    }
}


module.exports = beersRouter