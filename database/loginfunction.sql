DROP FUNCTION IF EXISTS get_password()
CREATE FUNCTION get_password(usern TEXT)
RETURN TEXT AS $$
DECLARE
    passw TEXT;
BEGIN
    SELECT password INTO passw
    FROM profile
    WHERE username = usern;
    
    RETURN passw;
END;
$$ LANGUAGE plpgsql;