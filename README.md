# ovve
## Project description (abstract)
We want to build a web application for student-overalls. A database is used to register accounts and connect the accounts to patches. The database will be temporal since patches are often bought, sewed (and perhaps lost) at different times. The core functionality of the website will be to keep track of your very own overall. It will offer lots of statistics and the user's can see how their overall has transformed over time thanks to a timeline. It should also be possible to interact with other users (see other user's overalls, toplists, and make friends).

The database will store information about:
patches; such as name, creator, type (woven/embroidered/etc).
user; such as name, university, name on overall, color of overall, buy date of overall.
modifications; such as type, name, placement.
connection between user and patches; buy date, sew date (multiple if patch was relocated), price, bought from, state (sewn or not).

We have currently not planned any big computational functions, could you help us figure something out? The two project ideas already submited has such functionality, and it sounds like fun to challenge ourselves with such a task.

An idea that might work is that a user can mark certain patches as "tradeable" (meaning they are okay with the idea of trading that patch for another one). Another user can then initiate a trade and offer a patch of their own to trade with. The first user can then agree or make a counter offer with another patch belonging to the second user. Such counter offers can go back and forth until either both agree or one user cancels the trade (sort of like monopoly mobile game if you've ever played it). A user might also be able to make a wishlist of patches that they want, that already exists in the database. Perhaps a trading page that recommends users that own tradeable patches on your wishlist, and even more so if you also own a tradeable patch on their wishlist.

###

We want to create a web-application that focuses on student overalls and the patches that are sewed onto them.

The web-app will be designed to keep track of the progress of the overalls as they go from brand new to well worn. The core functionality of the website will be to keep track of your very own overalls. It will offer lots of statistics and the users can see how their overalls has transformed over time thanks to temporality in the connected database. A student can also own patches that are not yet sewed onto the overalls. And again by utilizing temporality the user can see what patches they had in their collection over time. Overalls can have modifications, such as exchanged parts with other overall owners, installed LED-strips or zippers, or accessories attached. People and organizations can add existing patches to the database. The website should also make it possible for users to interact with each other and see other overalls, toplists regarding amount of patches, and make friends.

The database will store information about:
patches (name, creator, type), users (name, university, color of overalls, buy date of overalls), overalls-modifications (name, category, placement) and connections between users and their patches (buy-date, sew-date, price, bought from who) and modifications.

#

There will also be a large, searchable page where you can see all patches that exist. The patches will the categorized with some basic data such as shape, primary color and designer/seller. On this page you can simply browse patches, or go into a patch specific page to see more information about it, such as who owns it. You can also add a patch to the wishlist and as such be able to see people who own the patch and have it flagged for trading.



Lastly, there could potentially be a friends-function with a feed where you see friend activity, such as buying x amount of new patches, sewing y amount of new patches onto the overalls, or hitting a milestone such as 100 sewed on patches.


## Project brainstorming
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
