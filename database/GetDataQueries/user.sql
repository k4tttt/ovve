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


SELECT * FROM profile;
SELECT * FROM ovve_color;
SELECT * FROM ovve_type;

SELECT * FROM profile_view WHERE username = 'k4tt';

DELETE FROM profile;