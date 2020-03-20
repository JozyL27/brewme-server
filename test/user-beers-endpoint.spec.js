const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')


describe(`User-Beers endpoint`, () => {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from database', () => db.destroy())

    before('clean tables', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe(`/api/userbeers`, () => {
        context(`Given there is data in the userbeers table`, () => {
            beforeEach('insert beers', () => {
                return db('beers')
                    .insert(helpers.makeBeersArray())
            })

            beforeEach('insert users', () => {
                return db('brewme_users')
                    .insert(helpers.makeUser())
            })

            beforeEach('insert users', () => {
                return db('user_beers')
                    .insert(helpers.makeUserBeers())
            })


            it(`returns a status of 200 and the users beers`, () => {
                const userOneId = 1
                const beers = helpers.makeBeersArray()
                const userOneBeer = beers[0]


                return supertest(app)
                .get(`/api/userbeers/${userOneId}`)
                .expect(200)
                .expect(res => {
                    const userBeer = res.body[0]
                    expect(userBeer.user_id).to.eql(userOneId)
                    expect(userBeer.name).to.eql(userOneBeer.name)
                    expect(userBeer.beer_id).to.eql(userOneBeer.id)
                })
            })
        })
    })
})