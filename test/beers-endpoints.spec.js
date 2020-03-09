const knex = require('knex')
const app = require('../src/app')

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

    before('clean the table', () => db('beers').truncate())

    describe(`GET /api/beers`, () => {
        context(`Given no beers`, () => {
            it(`responds with 200 and empty list`, () => {
                return supertest(app)
                    .get('/api/beers')
                    .expect(200, [])
            })
        })
    })
})