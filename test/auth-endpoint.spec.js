const knex = require('knex')
const jwt = require('jsonwebtoken')
const app = require('../src/app')
const helpers = require('./test-helpers')


describe(`auth endpoint`, () => {
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

    describe(`POST /api/auth/login`, () => {
        beforeEach('insert user', () => {
            return db('brewme_users')
                .insert(helpers.makeUser())
        })

        const requiredFields = ['user_name', 'password']

        requiredFields.forEach(field => {
            const testUser = helpers.makeUser()

            const loginAttemptBody = {
                user_name: testUser.user_name,
                password: testUser.password,
            }
    
            it(`responds with 400 required error when ${field} is missing`, () => {
                delete loginAttemptBody[field]
    
                return supertest(app)
                    .post('/api/auth/login')
                    .send(loginAttemptBody)
                    .expect(400, {
                        error: `Missing '${field}' in request body`,
                    })
            })
        })
    })
})