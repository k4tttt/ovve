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
('Umeå Universitet', 'Programmet i statistik och data science', 'Mörkgröna hängselbyxor', '005A09');


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

SELECT patch.name as patch, patch.creator, patch_category.name as category FROM patch
JOIN patch_category ON patch.category = patch_category.id;

