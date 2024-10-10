CREATE OR REPLACE FUNCTION insert_patch(new_name TEXT, new_creator TEXT) RETURNS integer AS $$
DECLARE
    new_id integer;
BEGIN
	INSERT INTO patch (name, creator)
	VALUES (new_name, new_creator)
	RETURNING id INTO new_id;
	RETURN new_id;
END;
$$ LANGUAGE plpgsql;
