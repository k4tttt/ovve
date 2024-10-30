INSERT INTO ovve_color (university, determinator, color_name, color_hex)
VALUES
('Umeå Universitet', 'Kandidatprogrammet i biologi och geovetenskap', 'Blå', '1E66FF'),
('Umeå Universitet', 'Kandidatprogramet i litteraturvetenskap och kreativt skrivande, samt biblioteks- och informationsvetenskap', 'Brun', 'B96427'),
('Umeå Universitet', 'Högskoleingenjör i maskinteknik', 'Grå', '9E9E9E'),
('Umeå Universitet', 'Högskoleingenjör i byggteknik', 'Orange', 'FFA530'),
('Umeå Universitet', 'Högskoleingenjör i energiteknik', 'Vinröd', 'B12222'),
('Umeå Universitet', 'Högskoleingenjör i elektronik och datorteknik/medicinsk Teknik', 'Vit', 'F3F3F3'),
('Umeå Universitet', 'Civilingenjör i teknisk fysik', 'Svart', '191919'),
('Umeå Universitet', 'Civilingenjör i industriell ekonomi', 'Gul', 'FED638'),
('Umeå Universitet', 'Civilingenjör i energiteknik', 'Mörkblå', '24269B'),
('Umeå Universitet', 'Civilingenjör i bioteknik', 'Mörkgrön', '005A09'),
('Umeå Universitet', 'Civilingenjör i interaktion och design', 'Khaki', 'D0C491'),
('Umeå Universitet', 'Civilingenjör i teknisk datavetenskap', 'Ljusblå', 'A8D7F0'),
('Umeå Universitet', 'Kandidat/masterutbildningen i datavetenskap', 'Ljusblå med mörklila revär', 'A8D7F0'),
('Umeå Universitet', 'Digital medieproduktion', 'Ljusgul', 'EFEF8F'),
('Umeå Universitet', 'Programmet i Biomedicin', 'Mörklila', '7126E2'),
('Umeå Universitet', 'Kandidatprogrammet i matematik', 'Mörklila med gul revär', '7126E2'),
('Umeå Universitet', 'Biomedicinsk analytikerprogrammet', 'Ljuslila', 'C57EFF'),
('Umeå Universitet', 'Life science', 'Ljusgrön', '8DDB78'),
('Umeå Universitet', 'Arkitektutbildningen', 'Rosa', 'E753CE'),
('Umeå Universitet', 'Arkeologprogrammet', 'Neongrön', 'DEFF4A'),
('Umeå Universitet', 'Museologiprogrammet', 'Neongrön med revär', 'DEFF4A'),
('Umeå Universitet', 'Sjuksköterske- och röntgensjuksköterskeprogrammet', 'Röd med reflex', 'EB0808'),
('Umeå Universitet', 'Miljö- och hälsoskyddsprogrammet', 'Turkos', '4FFFE8'),
('Umeå Universitet', 'Lärarprogrammet', 'Ljusgrå m revär', 'B6B6B6'),
('Umeå Universitet', 'Socionom', 'Korall', 'FF9F8E'),
('Umeå Universitet', 'Beteendevetarsektionen', 'Maroon', 'AC1A41'),
('Umeå Universitet', 'Tandteknikerprogrammet', 'Blekrosa', 'FDC3ED'),
('Umeå Universitet', 'Programmet i statistik och data science', 'Mörkgröna hängselbyxor', '005A09'),
('Lunds Universitet', 'Brandingenjör', 'Svart', '191919'),
('Lunds Universitet', 'Datateknik, Information- och Kommunikationsteknik', 'Rosa', 'FA7FDB');


SELECT * FROM ovve_color;

INSERT INTO ovve_type (name)
VALUES
('Overall'),
('Hängselbyxor'),
('Frack'),
('Labbrock');

SELECT * FROM ovve_type;

INSERT INTO patch_category (name)
VALUES
('Broderat'),
('Vävt'),
('Tryckt'),
('DIY');

SELECT * FROM patch_category;

INSERT INTO mod_category (name)
VALUES
('Byte av del'),
('Dragkedja'),
('Splittad ovve'),
('Ljusslinga'),
('Accessoar');

SELECT * FROM mod_category;

INSERT INTO patch (name, creator, category) VALUES
('Babba Buu', 'piraya', 1),
('BGC', 'origo', 2),
('Caps', 'Piraya', 3),
('cos(x)', 'mamma mu', 1),
('CS', 'CS-sektionen', 2),
('csn!! lån', 'märkligt', 3),
('Dangling pointer', 'CS-sektionen', 1),
('Det är Khaki', 'CS-sektionen', 2),
('Diciplin', 'Piraya', 3),
('Dickachu', 'Adrian Boman', 1),
('Drägg', 'Piraya', 2),
('du är ful', 'tengil', 3),
('du är full', 'tengil', 1),
('Gin och Tonic', 'märkligt', 2),
('go piss girl', 'Umsys', 3),
('H.O.M.E.R 21', 'Homer', 1),
('Hata Folk', 'piraya', 2),
('I am a feminist', 'Feministerna i umeå', 3),
('IDag & inatt 2024', 'IDag&inatt', 2),
('IndivID', 'IndivID', 3),
('Jag bIDrar...', 'IndivID', 1),
('Jag...mottagningen', 'CS-sektionen', 2),
('KRÄNKT', 'Piraya', 3),
('Make a Stand', 'Feministerna i umeå', 1),
('MatLab', 'Faust', 2),
('mute', 'CS-sektionen', 3),
('Nollevin', 'Piraya', 1),
('OBS! sprirt', 'Samuel Sahlin', 2),
('Omogen', 'märkligt', 3),
('Origo', 'NTK', 1),
('OS 2023', 'Piraya', 2),
('Personal', 'origo', 3),
('Renesance ovve', 'märkligt', 1),
('Retro klassmärke regnbåge', 'ID11', 2),
('Snaps 22', 'OND', 3),
('Snösvänget', 'snösvänget', 1),
('SnösvängetXmotorväg', 'Snösvänget', 2),
('STD=c99', 'CS-sektionen', 3),
('styrde mottagningen 22', 'NTK', 1),
('t-röd', 'Gabbe', 2),
('Tacksittning ID 21', 'ID21', 3),
('Tacksittning ID19', 'ID19', 1),
('tengil Tris', 'tengil', 2),
('tengil är homo <3', 'tengil', 3),
('Tisdagar', 'Faust', 1),
('Tyska StrIDen 2022', 'indivID', 2),
('Tyska StrIDen 2023', 'indivID', 3),
('Tyska StrIDen generic', 'indivID', 1),
('vaffö då?', 'märkligt', 2),
('valgrind', 'Melker Henriksson', 3),
('Vulvasaur', 'Adrian Boman', 1),
('Warragiors', 'Warragiors', 2),
('While fork', 'CS-sektionen', 3),
('Zelda', 'Piraya', 2),
('åhag :)', 'CS-sektionen', 3),
('Ånghest', 'märkligt', 1),
('Älska folk', 'piraya', 2),
('överlevde mottagningen 21', 'NTK', 3),
('överlevde mottagningen 22', 'NTK', 1);

SELECT patch.id, patch.name as patch, patch.creator, patch_category.name as category FROM patch
JOIN patch_category ON patch.category = patch_category.id;

INSERT INTO profile (username, password, ovve_name, purchase_date, inauguration_date, biography, color, email, type)
VALUES
    ('Erik', 'password', 'Erik', '2022-01-15', '2022-02-10', 'Loves adventure and exploration.', 11, 'id16esn@cs.umu.se', 1),
    ('Alva', '$2a$10$IA.J7g7hFexLUHQEYuyR7eVE7Bz/v.nfLh7wC6C2VaeuKOlVyutvS', 'Alva', '2023-03-12', '2023-04-05', 'Passionate about technology.', 11, 'id21ash@cs.umu.se', 1),
    ('dataguy', 'password', '', '2023-03-12', '2023-04-05', 'DATA', 13, 'dv22dgy@cs.umu.se', 1);

INSERT INTO placement_category (name)
VALUES
('N/A'),
('Höger arm'),
('Vänster arm'),
('Höger ben'),
('Vänster ben'),
('Bröstkorg'),
('Krage'),
('Rygg');

SELECT * FROM placement_category;

SELECT * FROM profile;

INSERT INTO patch_inventory (patch_id, profile_id, price, obtained_date, lost_date, obtained_from, tradable)
VALUES
(19, 3, 0, '2024-05-14', '9999-12-31', 'Idag&Inatt', FALSE),
(20, 3, 20, '2022-03-10', '9999-12-31', 'IndivID', TRUE),
(30, 3, 20, '2022-10-05', '9999-12-31', 'NTK', FALSE),
(57, 3, 20, '2022-11-10', '9999-12-31', 'Piraya', FALSE),
(47, 3, 0, '2023-05-21', '9999-12-31', 'IndivID', TRUE);

SELECT * FROM patch_inventory JOIN patch ON patch.id = patch_inventory.patch_id;

INSERT INTO patch_status (TST, TET, sewn_on, placement, patch)
VALUES
('2024-05-14', '2024-08-17', FALSE, 1, 8),
('2024-08-17', '9999-12-31', TRUE, 4, 8),
('2022-03-10', '9999-12-31', TRUE, 5, 9),
('2022-10-05', '2022-10-15', FALSE, 1, 10),
('2022-10-15', '9999-12-31', TRUE, 5, 10),
('2022-11-10', '2022-11-30', FALSE, 1, 11),
('2022-11-30', '9999-12-31', TRUE, 4, 11),
('2023-05-21', '2023-09-10', FALSE, 1, 12),
('2023-09-10', '9999-12-31', TRUE, 5, 12);

SELECT * FROM patch_status WHERE sewn_on = TRUE;

SELECT * FROM patch_sewn_view;
SELECT * FROM profile;
SELECT * FROM patch_not_sewn_view;

INSERT INTO trade_offer (sending_profile_id, recieving_profile_id, approved)
VALUES
(1, 3, FALSE),
(1, 2, FALSE),
(1, 3, FALSE),
(2, 3, FALSE);

UPDATE trade_offer SET approved = FALSE WHERE id = 1;

SELECT * FROM trade_offer WHERE sending_profile_id = 1 OR recieving_profile_id = 1 AND approved = FALSE;
SELECT * FROM patch_inventory WHERE profile_id = 1;

INSERT INTO trade_offer_patch (trade_offer_id, owning_profile, patch)
VALUES
(1, 1, 6),
(1, 1, 7),
(1, 3, 8),
(2, 1, 7);