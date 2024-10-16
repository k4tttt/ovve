DROP FUNCTION IF EXISTS register_user;

CREATE FUNCTION register_user(usern, passw, ovven, purchased, inaugurationd, bio, ovvec, mail)
INSERT INTO profile(username, password, ovve_name, purchase_date, inauguration_date, biography, color, email)
VALUES(usern, passw, ovven, purchased, inaugurationd, bio, ovvec, mail);
END;
$$ LANGUAGE plpgsql;