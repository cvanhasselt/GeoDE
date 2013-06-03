Geode
=====

The intent of Geode.js is to be a lightweight Javascript bring country specific identifiers into a Javascript UI.  

## Background:

The ISO-3166 specification has two different codes, alpha-2 and alpha-3, that are routinely used to identify countries.
However, there is no exact way, other than one-to-one mapping, of deriving the alpha-2 value from the alpha-3 value.
Furthermore, while countries have official names, many have common names that are significantly different from the
official name, for example "Russia" and the "Russian Federation."  

Geode will allow you to easily get all ISO-3166 values for a country in JavaScript. If you have a set of images named 
on the alpha-2 codes, but your database uses alpha-3 codes, you can use Geode to translate between the two codes
without having to add an extra column to your database or rename all the images.
