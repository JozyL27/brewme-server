const xss = require('xss')
const Treeize = require('treeize')



const BeersService = {
    getAllBeers(db) {
        return db('beers')
            .select('*')
    }
}

module.exports = BeersService