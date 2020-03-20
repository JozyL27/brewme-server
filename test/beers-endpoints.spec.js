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

        describe(`GET /name/:by_name`, () => {
            context(`given no beers by name`, () => {
                const invalidBeer = 'invalidBrewski'

                it(`returns 404 not found and a message`, () => {
                    return supertest(app)
                        .get(`/api/beers/name/${invalidBeer}`)
                        .expect(404, {"error":"No brewskis found, try another search!"})
                })
            })

            context(`Given there is a beer by a given name`, () => {
                beforeEach('insert beers', () => {
                    return db('beers')
                    .insert(helpers.makeBeersArray())
                })

                it(`responds with 200 and the beer`, () => {
                    const beers = helpers.makeBeersArray()
                    const beerOne = beers[0]

                    return supertest(app)
                        .get(`/api/beers/name/${beerOne.name}`)
                        .expect(200, [beers[0]])
                })
            })
        })

        describe(`GET /random/beer`, () => {
            context(`given beers are in the database`, () => {
                beforeEach('insert beers', () => {
                    const beers = helpers.makeBeersArray()
                    const randBeer = beers[0]

                    return db('beers')
                    .insert(randBeer)
                })

                it(`responds with 200 and a random beer`, () => {
                    const beers = helpers.makeBeersArray()
                    const randBeer = beers[0]

                    return supertest(app)
                        .get(`/api/beers/random/beer`)
                        .expect(200)
                        .expect(res => {
                            const resbeer = res.body.rows[0]
                            expect(resbeer.name).to.eql(randBeer.name)
                            expect(resbeer.id).to.eql(randBeer.id)
                        })
                })
            })

            context(`given no beers in database`, () => {
                it(`responds with status 404 and a message`, () => {
                    return supertest(app)
                        .get(`/api/beers/random/beer`)
                        .expect(404, {"error":"No brewskis found in database!"})
                })
            })
        })
    })
})