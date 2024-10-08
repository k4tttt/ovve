# ovve
## Project description (abstract)
We want to create a web-application that focuses on student overalls and the patches that are sewed onto them.

The web-app will be designed to keep track of the progress of the overalls as they go from brand new to well worn. The core functionality of the website will be to keep track of your very own overalls. It will offer lots of statistics and the users can see how their overalls has transformed over time thanks to temporality in the connected database. A student can also own patches that are not yet sewed onto the overalls. And again by utilizing temporality the user can see what patches they had in their collection over time. Overalls can have modifications, such as exchanged parts with other overall owners, installed LED-strips or zippers, or accessories attached. People and organizations can add existing patches to the database. The website should also make it possible for users to interact with each other and see other overalls, toplists regarding amount of patches, and make friends.

The database will store information about:
patches (name, creator, type), users (name, university, color of overalls, buy date of overalls), overalls-modifications (name, category, placement) and connections between users and their patches (buy-date, sew-date, price, bought from who) and modifications.

A user can mark certain patches as "tradeable" (meaning they are okay with the idea of trading that patch for another one). Another user can then initiate a trade and offer a patch of their own to trade with. The first user can then agree or make a counter offer with a different patch belonging to the second user. Such counter offers can go back and forth until either both agree or one user cancels the trade (sort of like monopoly mobile game if you've ever played it). A user might also be able to make a wishlist of patches that they want, that already exists in the database. Perhaps a trading page that recommends users that own tradeable patches on your wishlist, and even more so if you also own a tradeable patch on their wishlist.

We plan on doing a wiki-like page where users can search/filter through patches and users, and see all colors of overalls at different universities.

## Project brainstorming
### hejsan
- people should have profiles with CRUD
- namn, ovvenamn, beskriving, klass (id21), profilbild(er)
- började plugga när, lärosäte, program,
- type of "ovve"
- color of ovve (självfärgad/köpt färg), revär, pris, invigd, laglig, inköpsdatum
- antal märken, unika märken
- koppla märkes-id med person-id
- tid och status för märken, placering, pris, köpperson, bytes
- vänner
- begränsningar: ett konto kan bara ha en ovve

- märken
- namn, upphovsperson, edition (id)
- flera användare kan ha samma märke
- "one of a kind" - egengjorda märken (handmålat/handsytt)
- kategori: vävt, broderat, tryckt, handmålat, handsytt...

- ovvemods: splittad, bytta delar, dragkedja, ljusslinga, accessoar...

- trigger badge on milestones
- trigger on program -> color

- hålla koll på byten av märken

- sidor: browse alla märken (som existerar) med sortering
- profilsida (egen och andras)
- browse alla märken man äger med sortering
- redigeringssida för profil
- lägga till/ta bort märken från ovve/samling
- märkesdetaljsida
- topplista för antal märken (personer - allmän/lärosäte/program/vänner)
- ovve-färg baserat på program, wikipedia-liknande

- if we have time: create functionality for märkessäljare
