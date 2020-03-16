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
        .where('beers.name', 'like', `%${name}%`)
    },
    getRandomBeer(db) {
        return db
            .raw(`SELECT * FROM beers ORDER BY RANDOM() limit 1;`)
    },
    getPaginatedResults(db, page) {
        const beersPerPage = 10
        const offset = beersPerPage * (page - 1)

        return db('beers')
            .select('*')
            .limit(beersPerPage)
            .offset(offset)
    },
}

module.exports = BeersService