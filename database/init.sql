DROP TABLE patch_inventory;
DROP TABLE patch;
DROP TABLE profile;
DROP TABLE ovve_color;
DROP TABLE patch_category;

CREATE TABLE ovve_color (
    id SERIAL PRIMARY KEY,
    university TEXT,
    determinator TEXT,
    color_name TEXT,
    color_hex VARCHAR(6)
);

CREATE TABLE profile (
    id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT,
    ovve_name TEXT,
    purchase_date DATE,
    inauguration_date DATE,
    biography TEXT,
    color INTEGER REFERENCES ovve_color(id)
);

CREATE TABLE patch_category (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE patch (
    id SERIAL PRIMARY KEY,
    name TEXT,
    creator TEXT,
    category INTEGER REFERENCES patch_category(id)
);

CREATE TABLE patch_inventory (
    id SERIAL PRIMARY KEY,
    patch_id INTEGER REFERENCES patch(id),
    profile_id INTEGER REFERENCES profile(id),
    price INTEGER,
    obtained_date DATE,
    lost_date DATE,
    obtained_from TEXT
);

CREATE TABLE mod_category (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE ovve_mod (
    id SERIAL PRIMARY KEY,
    title TEXT,
    description TEXT,
    category INTEGER REFERENCES mod_category(id),
    profile_id INTEGER REFERENCES profile(id),
    price INTEGER,
    obtained_date DATE,
    lost_date DATE,
    obtained_from TEXT
);
