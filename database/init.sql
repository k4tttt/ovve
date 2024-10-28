DROP VIEW patch_sewn_view;
DROP INDEX idx_profile;
DROP VIEW IF EXISTS profile_view;
DROP TABLE IF EXISTS patch_status;
DROP TABLE IF EXISTS patch_inventory;
DROP TABLE IF EXISTS patch;
DROP TABLE IF EXISTS patch_category;
DROP TABLE IF EXISTS placement_category;
DROP TABLE IF EXISTS ovve_mod;
DROP TABLE IF EXISTS mod_category;
DROP TABLE IF EXISTS profile;
DROP TABLE IF EXISTS ovve_type;
DROP TABLE IF EXISTS ovve_color;

CREATE TABLE ovve_color (
    id SERIAL PRIMARY KEY,
    university TEXT,
    determinator TEXT,
    color_name TEXT,
    color_hex VARCHAR(6)
);

CREATE TABLE ovve_type (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE profile (
    id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT,
    email TEXT,
    ovve_name TEXT,
    purchase_date DATE,
    inauguration_date DATE,
    biography TEXT,
    color INTEGER REFERENCES ovve_color(id),
    type INTEGER REFERENCES ovve_type(id),
    CONSTRAINT email_format_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
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

CREATE TABLE placement_category (
    id SERIAL PRIMARY KEY,
    name TEXT
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

CREATE TABLE patch_status (
    id SERIAL PRIMARY KEY,
    TST DATE,
    TET DATE,
    sewn_on BOOLEAN,
    placement INTEGER REFERENCES placement_category(id),
    patch INTEGER REFERENCES patch_inventory(id)
);

CREATE OR REPLACE VIEW profile_view AS
SELECT 
    p.id,
    p.username,
    p.email,
    p.ovve_name,
    p.purchase_date,
    p.inauguration_date,
    p.biography,
    oc.university,
    oc.determinator,
    oc.color_name,
    oc.color_hex,
    ot.name AS ovve_type_name
FROM 
    profile p
JOIN 
    ovve_color oc ON p.color = oc.id
JOIN 
    ovve_type ot ON p.type = ot.id;

DROP FUNCTION IF EXISTS check_username_uniqueness;



CREATE FUNCTION check_username_uniqueness()
RETURNS TRIGGER AS $$
BEGIN
	IF EXISTS (SELECT 1 FROM profile WHERE username = NEW.username AND id <> NEW.id) THEN
		RAISE EXCEPTION 'Username "%s" is already in use.', NEW.username;
	END IF;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER username_uniqueness_trigger
BEFORE UPDATE OR INSERT ON profile
FOR EACH ROW
EXECUTE FUNCTION check_username_uniqueness();


CREATE INDEX idx_profile ON profile(username);

CREATE OR REPLACE VIEW patch_sewn_view AS
SELECT
  p.id AS patch_id,
  p_i.profile_id,
  p.name,
  p.creator,
  p_i.price,
  p_i.obtained_from,
  p_i.obtained_date,
  p_i.lost_date,
  p_c.name AS category,
  p_s.TST,
  p_s.TET,
  p_s.placement
FROM
  patch_status p_s
JOIN patch_inventory p_i ON p_s.patch = p_i.id
JOIN patch p ON p_i.patch_id = p.id
JOIN patch_category p_c ON p.category = p_c.id
WHERE p_s.sewn_on = TRUE;

CREATE OR REPLACE VIEW patch_not_sewn_view AS
SELECT
  p.id AS patch_id,
  p_i.profile_id,
  p.name,
  p.creator,
  p_i.price,
  p_i.obtained_from,
  p_i.obtained_date,
  p_i.lost_date,
  p_c.name AS category,
  p_s.TST,
  p_s.TET,
  p_s.placement
FROM
  patch_status p_s
LEFT JOIN patch_inventory p_i ON p_s.patch = p_i.id
LEFT JOIN patch p ON p_i.patch_id = p.id
LEFT JOIN patch_category p_c ON p.category = p_c.id
WHERE p_s.sewn_on = FALSE;
