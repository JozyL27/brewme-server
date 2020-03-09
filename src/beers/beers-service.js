const xss = require('xss')


const BeersService = {
    getAllBeers(db) {
        return db
            .from('beers')
            .select('*')
    }
}

module.exports = BeersService