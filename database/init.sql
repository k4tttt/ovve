CREATE TABLE profile (
    id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT,
    ovvename TEXT,
    purchase_date DATE,
    inauguration_date DATE,
    biography TEXT
);

CREATE TABLE patch (
    id SERIAL PRIMARY KEY,
    name TEXT,
    creator TEXT
);
