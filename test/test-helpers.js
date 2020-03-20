function makeBeersArray() {
    return [
        {
            brewery_id: 1234567,
            name: 'Munsterfest',
            cat_id: 1234567,
            style_id: 123456,
            abv: 4.95,
            ibu: 2.00,
            srm: 2.00,
            upc: 12345678,
            filepath: 'none',
            descript: 'solid beer',
            add_user: 0,
            id: 1,
            last_mod: new Date('2029-01-22T16:28:32.615Z').toISOString()            
        },
        {
            brewery_id: 1234567,
            name: 'gumballhead',
            cat_id: 1234568,
            style_id: 123458,
            abv: 4.85,
            ibu: 2.00,
            srm: 2.00,
            upc: 12345679,
            filepath: 'none',
            descript: 'ok beer',
            add_user: 0,
            id: 2,
            last_mod: new Date('2029-01-22T16:28:32.615Z').toISOString()
            
        },
        {
            brewery_id: 1234567,
            name: 'lagunitas ipa',
            cat_id: 1234569,
            style_id: 123459,
            abv: 6.95,
            ibu: 2.00,
            srm: 2.00,
            upc: 12345676,
            filepath: 'none',
            descript: 'great beer',
            add_user: 0,
            id: 3,
            last_mod: new Date('2029-01-22T16:28:32.615Z').toISOString()
            
        },
    ]
}

function makeUser() {
    return {
        id: 1,
        user_name: 'Zelda',
        password: '#Link1234'
    }
}


function cleanTables(db) {
    return db.transaction(trx =>
      trx.raw(
        `TRUNCATE
          user_beers,
          brewme_users,
          beers
        `
      )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE beers_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE brewme_users_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('beers_id_seq', 0)`),
          trx.raw(`SELECT setval('brewme_users_id_seq', 0)`),
        ])
      )
    )
  }

module.exports = {
    makeBeersArray,
    cleanTables,
    makeUser
}