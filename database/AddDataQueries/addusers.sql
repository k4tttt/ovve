DELETE FROM profile;

INSERT INTO profile (username, password, ovve_name, purchase_date, inauguration_date, biography, color, email, type)
VALUES
    ('Erik', 'password', 'Erik', '2022-01-15', '2022-02-10', 'Loves adventure and exploration.', 11, 'id16esn@cs.umu.se', 1),
    ('Alva', 'password', 'Alva', '2023-03-12', '2023-04-05', 'Passionate about technology.', 11, 'id21ash@cs.umu.se', 1),
    ('k4tt', 'password', 'TYRA', '2022-03-22', '2024-04-14', 'sliving', 11, 'id21twn@cs.umu.se', 1);

SELECT * FROM profile;