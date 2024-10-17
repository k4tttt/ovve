DROP FUNCTION IF EXISTS get_password(TEXT);

CREATE FUNCTION get_password(usern TEXT)
RETURNS TEXT AS $$
DECLARE
    passw TEXT;
BEGIN
    SELECT password INTO passw
    FROM profile
    WHERE username = usern;

    RETURN passw;
END;
$$ LANGUAGE plpgsql;