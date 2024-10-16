DROP FUNCTION IF EXISTS register_user;

CREATE FUNCTION register_user(usern, passw, purchased, ovvec)
INSERT INTO profile(username, password, purchase_date, biography, color)
VALUES(usern, passw, purchased, '', ovvec);
END;
$$ LANGUAGE plpgsql;