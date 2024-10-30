DROP VIEW IF EXISTS trade_offer_patches_view;
DROP VIEW IF EXISTS trade_offer_view;
DROP TABLE IF EXISTS trade_offer_patch;
DROP TABLE IF EXISTS trade_offer;
DROP VIEW IF EXISTS trade_patch_view;
DROP VIEW IF EXISTS patch_not_sewn_view;
DROP VIEW IF EXISTS patch_sewn_view;
DROP INDEX IF EXISTS idx_profile;
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
DROP FUNCTION IF EXISTS status_update;


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
    obtained_from TEXT,
    tradable BOOLEAN
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
  placement_category.name AS placement_category
FROM
  patch_status p_s
JOIN patch_inventory p_i ON p_s.patch = p_i.id
JOIN patch p ON p_i.patch_id = p.id
JOIN patch_category p_c ON p.category = p_c.id
JOIN placement_category ON p_s.placement = placement_category.id
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
  placement_category.name AS placement_category
FROM
  patch_status p_s
JOIN patch_inventory p_i ON p_s.patch = p_i.id
JOIN patch p ON p_i.patch_id = p.id
JOIN patch_category p_c ON p.category = p_c.id
JOIN placement_category ON p_s.placement = placement_category.id
WHERE p_s.sewn_on = FALSE;

CREATE OR REPLACE VIEW trade_patch_view AS
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
  placement_category.name AS placement_category
FROM
  patch_status p_s
JOIN patch_inventory p_i ON p_s.patch = p_i.id
JOIN patch p ON p_i.patch_id = p.id
JOIN patch_category p_c ON p.category = p_c.id
JOIN placement_category ON p_s.placement = placement_category.id
WHERE p_i.tradable = TRUE;

CREATE FUNCTION status_update()
RETURNS TRIGGER AS $$
BEGIN
    IF (NEW.sewn_on = true) THEN
        -- Check for existing overlapping sewn-on entries
        IF EXISTS (
            SELECT 1 FROM patch_status
            WHERE (sewn_on = TRUE AND patch = NEW.patch AND TET >= NEW.TST AND TST < NEW.TET)
            OR (sewn_on = TRUE AND patch = NEW.patch AND TET <= NEW.TET AND TET > NEW.TST)
            OR (sewn_on = TRUE AND patch = NEW.patch AND TST <= NEW.TST AND TET >= NEW.TET)
        ) THEN
        	RAISE EXCEPTION 'Patch already sewn on during given timespan.';
        END IF;

        -- Delete unsewn status with same timespan
        DELETE FROM patch_status
        WHERE sewn_on = FALSE AND patch = NEW.patch AND TST = NEW.TST AND TET = NEW.TET;

        -- Update unsewn status that has same start
        UPDATE patch_status
        SET TST = NEW.TET
        WHERE sewn_on = FALSE AND patch = NEW.patch AND TST = NEW.TST;

        -- Update unsewn status that has same end
        UPDATE patch_status
        SET TET = NEW.TST
        WHERE sewn_on = FALSE AND patch = NEW.patch AND TET = NEW.TET;
    
        -- Split unsewn status into two
        IF EXISTS (
            SELECT 1 FROM patch_status
            WHERE patch = NEW.patch AND sewn_on = FALSE AND TST < NEW.TST AND TET > NEW.TET
        ) THEN
            -- Insert a new status to the right of NEW
            INSERT INTO patch_status (patch, sewn_on, TST, TET, placement)
            SELECT patch, sewn_on, NEW.TET, TET, placement
            FROM patch_status
            WHERE patch = NEW.patch AND sewn_on = FALSE AND TST < NEW.TST AND TET > NEW.TET;

            -- Update the original row to be to the left of NEW
            UPDATE patch_status
            SET TET = NEW.TST
            WHERE patch = NEW.patch AND sewn_on = FALSE AND TST < NEW.TST AND TET > NEW.TET;
        END IF;
    END IF;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER status_trigger
BEFORE UPDATE OR INSERT ON patch_status
FOR EACH ROW
EXECUTE FUNCTION status_update();

CREATE TABLE trade_offer (
    id SERIAL PRIMARY KEY,
    sending_profile_id INTEGER REFERENCES profile(id),
    recieving_profile_id INTEGER REFERENCES profile(id),
    approved BOOLEAN
);

CREATE TABLE trade_offer_patch (
    trade_offer_id INTEGER REFERENCES trade_offer(id),
    owning_profile INTEGER REFERENCES profile(id),
    patch INTEGER REFERENCES patch_inventory(id)
);

CREATE OR REPLACE VIEW trade_offer_view AS
SELECT
  trade_offer.id,
  sender.id AS sender_id,
  sender.username AS sender_name,
  sender.email AS sender_email,
  receiver.id AS receiver_id,
  receiver.username AS receiver_name,
  receiver.email AS receiver_email,
  trade_offer.approved
FROM
  trade_offer
JOIN profile sender ON trade_offer.sending_profile_id = sender.id
JOIN profile receiver ON trade_offer.recieving_profile_id = receiver.id;

CREATE OR REPLACE VIEW trade_offer_patches_view AS
SELECT
  trade_offer_patch.trade_offer_id,
  trade_offer_patch.owning_profile AS owner_id,
  owner.username AS owner_name,
  patch.id AS patch_id,
  patch.name AS patch_name,
  patch.creator AS patch_creator,
  patch_inventory.price AS patch_price,
  patch_inventory.tradable AS tradeable
FROM
  trade_offer_patch
JOIN profile owner ON trade_offer_patch.owning_profile = owner.id
JOIN patch_inventory ON trade_offer_patch.patch =  patch_inventory.id
JOIN patch ON patch_inventory.patch_id = patch.id;


SELECT * FROM trade_offer WHERE approved = FALSE;


CREATE OR REPLACE VIEW tradable_patches AS
SELECT 
    profile.username,
    ovve_color.university,
    patch.name AS patch_name,
    patch.creator AS patch_maker,
    patch_inventory.price AS patch_price
FROM 
    patch_inventory
JOIN 
    profile ON patch_inventory.profile_id = profile.id
JOIN 
    ovve_color ON profile.color = ovve_color.id
JOIN 
    patch ON patch_inventory.patch_id = patch.id
WHERE 
    patch_inventory.tradable = TRUE;