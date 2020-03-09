const xss = require('xss')


const BeersService = {
    getAllBeers(db) {
        return db
            .from('beers')
            .select('*')
    },
    getById(db, id) {
        return BeersService.getAllBeers(db)
            .where('beers.id', id)
            .first()
    },
    getByName(db, name) {
        return BeersService.getAllBeers(db)
        .where('beers.name', name)
        .first()
    },
    getRandomBeer(db) {
        return db
            .raw(`SELECT * FROM beers ORDER BY RANDOM() limit 1;`)
    },
}

module.exports = BeersService