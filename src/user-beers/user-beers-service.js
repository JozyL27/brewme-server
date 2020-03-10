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
}


module.exports = UserBeersService