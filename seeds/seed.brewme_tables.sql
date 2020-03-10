BEGIN;

INSERT INTO brewme_users (user_name, password)
VALUES
('Dunder Mifflin', '$2a$12$ttbrUcAozp2hND1EGp6pVuPLHvEkgeeIP6Un2a0XNsOoTJ.zjcE4m');

INSERT INTO user_beers (user_id, beer_id)
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4);

COMMIT;