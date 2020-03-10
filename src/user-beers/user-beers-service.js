const UserBeersService = {
    getAllUsersBeers(db) {
        return db('user_beers')
        .select('*')
    },
    getUserBeers(db, id) {
        return db
            .from('user_beers')
            .innerJoin('beers', 'user_beers.beer_id', 'beers.id')
            .innerJoin('brewme_users', 'user_beers.user_id', 'brewme_users.id')
            .where('brewme_users.id', id)
    },
    getUserById(db, id) {
        return db('brewme_users')
            .where('brewme_users.id', id)
            .first()
    },
    getById(db, id) {
        return db
            .from('user_beers')
            .select('*')
            .where('user_beers.id', id)
            .first()
    },
    insertBeer(db, newBeer) {
        return db
            .insert(newBeer)
            .into('user_beers')
            .returning('*')
            .then(([beer]) => beer)
            .then(beer => UserBeersService.getById(db, beer.id))
    },
}


module.exports = UserBeersService