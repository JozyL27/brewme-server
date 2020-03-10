CREATE TABLE user_beers (
    user_id INTEGER REFERENCES brewme_users(id),
    beer_id INTEGER REFERENCES beers(id),
    PRIMARY KEY (user_id, beer_id)
);