const knex = require('knex')
const { attachPaginate } = require('knex-paginate')
attachPaginate()
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
}

module.exports = BeersService