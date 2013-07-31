GeoDE
=====

The intent of GeoDE.js is to be a lightweight Javascript library used to bring country specific 
identifiers and information into a Javascript context within the browser.

I chose GeoDE as a name because the principal data used in this library is geographic in nature,
and because a geode is a very pretty type of crystalline rock.  My hope is make this code solid
as a rock but also elegant and pretty.  The name is also, conveniently, a good acronym for 
Geographice Data Engine.  

This is also the first time I've used Git, so anyone who wanders by and sees this, please be kind.

## Background:

The ISO-3166 specification has two different codes, alpha-2 and alpha-3, that are routinely used to
identify countries.  However, there is no exact way, other than one-to-one mapping, of deriving the 
alpha-2 value from the alpha-3 value. Furthermore, while countries have official names, many have
common names that are significantly different from the official name, for example "Russia" and
the "Russian Federation."  

GeoDE will allow you to easily get all ISO-3166 values for a country in JavaScript. If you have a 
set of images named on the alpha-2 codes, but your database uses alpha-3 codes, you can use GeoDE
to translate between the two codes without having to add an extra column to your database or 
rename all the images.

## Initial Data

Data included in early versions will include:

* Country names, and variants
* ISO-3166 Alpha2 country codes
* ISO-3166 Alpha3 country codes
* United Nations M49 Country Codes

The data will be stored as JSON data, as it is likely that this data will change over time.
Rather than bundle the data in the code (as in my first prototype), this will allow users
to easily pick and choose what data to include.

## TODO list

- [ ] Grouping of countries, with methods like addToGroup, deleteFromGroup, etc.
- [ ] Recent searches group
- [ ] Add more data, such as international calling codes
- [ ] Add famfam flags
- [ ] Better documentation
- [ ] Practical demo example
- [ ] (Longer term) Save to browser cache or local storage in some way





