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
    .route('/:page_id')
    .get((req, res, next) => {
        BeerService.getPaginatedResults(req.app.get('db'),
        req.params.page_id
        )
        .then(beers => {
            res.json(beers)
        })
        .catch(next)
    })

beersRouter
    .route('/name/:beer_name')
    .all(checkNameExists)
    .get((req, res, next) => {
        let beerName = req.params.beer_name
        beerName = beerName.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
        encodeURIComponent(beerName)

        BeerService.getByName(req.app.get('db'), beerName)
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
                
                if (random.rows.length === 0) {
                return res.status(404).json({
                    error: `No brewskis found in database!`
                })
                } else {

                    res.random = random
                    next()
                }
                res.json(random.rows[0])
            })
            .catch(next)
    })

async function checkNameExists(req, res, next) {
    try {
        let beerName = req.params.beer_name
        beerName = beerName.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
        encodeURIComponent(beerName)

        const beer = await BeerService.getByName(
            req.app.get('db'),
            beerName
        )

        if (beer.length === 0)
            return res.status(404).json({
                error: `No brewskis found, try another search!`
            })

            res.beer = beer
            next()
    } catch (error) {
        next(error)
    }
}


module.exports = beersRouter