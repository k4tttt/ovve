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
BEFORE UPDATE ON profile
FOR EACH ROW
EXECUTE FUNCTION check_username_uniqueness();