const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe(`beers endpoint`, function() {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe(`GET /api/beers`, () => {
        context(`Given no beers`, () => {
            it(`responds with 200 and empty list`, () => {
                return supertest(app)
                    .get('/api/beers')
                    .expect(200, [])
            })
        })

        context(`Given there are beers in the database`, () => {
            beforeEach('insert beers', () => {
                return db('beers')
                    .insert(helpers.makeBeersArray())
            })

            it(`GET /beers responds with a 200 and all beers`, () => {
                return supertest(app)
                    .get('/api/beers')
                    .expect(200, helpers.makeBeersArray())
            })
        })
    })
})