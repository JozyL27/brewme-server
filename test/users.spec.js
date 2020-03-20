const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')


describe(`Users endpoint`, () => {
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

    describe(`POST /api/users`, () => {

        context(`given a proper username and password`, () => {
            it(`returns a status of 201 and the new user's info`, () => {
                const newUser = helpers.makeUser()

                return supertest(app)
                    .post('/api/users')
                    .send(newUser)
                    .expect(201)
                    .expect(res => {
                        expect(res.body).to.have.property('password')
                        expect(res.body.user_name).to.eql(newUser.user_name)
                        expect(res.body.id).to.eql(newUser.id)
                    })
            })
        })

        context(`Given an invalid username or password`, () => {
            it(`returns a 400 status and error message`, () => {
                const invalidUser = {
                    user_name: 'invalid Zelda',
                    password: 'invalidpass'
                }

                return supertest(app)
                    .post('/api/users')
                    .send(invalidUser)
                    .expect(400)
                    .expect(res => {
                        expect(res.body).to.have.property('error')
                    })
            })
        })
    })
})