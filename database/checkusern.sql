DROP FUNCTION IF EXISTS check_username_uniqueness;

CREATE FUNCTION check_username_uniqueness(usern TEXT)
RETURNS BOOLEAN AS $$
BEGIN
	IF EXISTS (SELECT 1 FROM profile WHERE username = $1) THEN
		RETURN FALSE;
	ELSE
		RETURN TRUE;
	END IF;
END;
$$ LANGUAGE plpgsql;