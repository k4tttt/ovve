CREATE OR REPLACE FUNCTION get_user(p_username TEXT)
RETURNS TABLE(
    id INTEGER,
    username TEXT,
    password TEXT,
    ovve_name TEXT,
    purchase_date DATE,
    inauguration_date DATE,
    biography TEXT,
    color INTEGER,
    type INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM
        profile
    WHERE
        username = p_username;
END;
$$ LANGUAGE plpgsql;


SELECT * FROM get_user('Tyra');

SELECT * FROM profile WHERE username = 'Tyra';