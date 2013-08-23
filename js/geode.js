"use strict";

var $Z = {};
/* 
* GeoDE: a JavaScript based Geographic Data Engine.
*
* Licensed under The MIT License (MIT)
*
* Copyright (c) 2013 Christopher Gerard van Hasselt
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:

* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.

* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*
********************************************************************************
*/

// isArray -- Mozilla code found here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
// needed for the deep array searching.
Array.isArray = Array.isArray || function (vArg) {
    return Object.prototype.toString.call(vArg) === "[object Array]";
};

/*
 * GeoDE is the JavaScript Geographic Data Engine.  It is designed to bring 
 *   geographic metadata, beginning with ISO-3166 country codes, into a JavaScript
 *   client environment.  
 *
 *  @author     Chris van Hasselt 
 *  
 *  @param      {string}    source  source is the name of the JSON source file where country data is stored.
 *                                  The default source file is isodata.json.
 */

var GeoDE = GeoDE || function (source) {

    var self           = this,      // reference to current object
        dataLoaded     = false,     // private variable, used to note whether data is loaded; read access through isDataLoaded() method
        dataFile       = source,    // private variable, used to store name of the GeoDE object datafile.  
                                    // Multiple GeoDE objects could be used with different datafiles
        recentSearches = [];

    function getXHR() {

        var result = null;

        if (window.XMLHttpRequest) {
            result = new XMLHttpRequest();
        } else {
            try {
                result = new ActiveXObject("MSXML2.XMLHTTP.3.0");
            } catch (e) { }

            if (result === null) {
                try {
                    result = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) { }
            }
        }
        return result;
    }

    /* function setIsoData assigns data returned from a JSON file, named as the dataFile variable,
     * to the isoData property Object.
     *
     */
    function setIsodata(xhrResponse) {
        self.isodata = JSON.parse(xhrResponse);
        return true;
    }

    /*
     * function getCountryIndex finds the country index from any list, implemented as an array.
     *    For individual list items, the function performs a deep search of an array if the item is an array. 
     *    See test cases for examples.  This function is private, but reachable via getCountryInfo()
     *    
     *    @param    {Array}   list    Any of the (so far 4) possible country information lists
     *    @param    {string}  query   A value sought from the country list 
     *    @return   {number}          Integer index of the array element found
     */
    function getCountryIndex(list, query) {

        var counter     = list.length - 1,        // used to count down through the list passed in that will be searched
            deepcounter = 0,                      // deepcounter is used when the list item is an array, rather than a single value
            qLower      = query.toLowerCase(),    // the lowercase value of the item being searched for.  All searches are lowercased.
            deepfound   = false,                  // true if a match is found within a deeper level of the item.
            keepgoing   = true;                   // keepgoing until match is found.

        do {
        // The list item may be either a single value, or an array.  if it is an array, a search within this array is needed.
        // The only list that may contain arrays is the isonames list, which, for example, has the following entry
        //
        //         [
        //            "Holy See (Vatican City State)",
        //            "Vatican",
        //            "Vatican City",
        //            "Holy See"
        //         ]
        //
            if (Array.isArray(list[counter])) {
                deepcounter = list[counter].length - 1;
                do {
                    if (qLower === list[counter][deepcounter].toLowerCase()) {
                        deepfound = true;
                        keepgoing = false;
                    }
                } while (!deepfound && ((deepcounter += -1) >= 0));
            } else {
                if (qLower === list[counter].toLowerCase()) {
                    keepgoing = false;
                }
            }
        } while (keepgoing && ((counter += -1) >= 0));

        return counter;
    }

    /*
     * function search 
     *    
     *    @param    {Array}   list    Any of the (so far 4) possible country information lists
     *    @param    {string}  query   A value sought from the country list 
     *    @return   {number}          Integer index of the array element found
     */
    function search(term) {

        var currIdx = 0;

        // get the index of the searchTerm, if available 
        if (term.match(/^[a-zA-Z]{2}$/i) !== null) {
            // search term is iso3166-alpha2 code
            currIdx = getCountryIndex(self.isodata.alpha2, term);
        } else if (term.match(/^[a-zA-Z]{3}$/i)) {
            // search term is an iso3166-alpha3 code
            currIdx = getCountryIndex(self.isodata.alpha3, term);
        } else if (term.match(/^\d{3}$/i)) {
            // search term is a UN-M49 code
            currIdx = getCountryIndex(self.isodata.unm49, term);
        } else {
            // search term is a country name
            currIdx = getCountryIndex(self.isodata.isonames, term);
        }
        return currIdx;
    }

    /*
     *
     */
    function getCountryObject(idx, searchTerm) {

        var countryInfo = {
                query      : searchTerm,
                index      : idx,
                name       : (Array.isArray(self.isodata.isonames[idx])) ? self.isodata.isonames[idx][0] : self.isodata.isonames[idx],
                alpha2     : self.isodata.alpha2[idx],
                alpha3     : self.isodata.alpha3[idx],
                unm49      : self.isodata.unm49[idx]
            };

        return countryInfo;
    }
    /*
     *  public function to load data.  The loadData() function should be called after the object is created.
     *      The data will be loaded from the dataFile variable.  The callback function is called
     * 
     *    @param    {Function}  callback    callback is a callback, ran after data is loaded.  In general, all code on a
     *                                      page that will use the geographic data should begin via this callback.
     */
    this.loadData = function (callback) {

        var xhr = getXHR();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                dataLoaded = setIsodata(xhr.responseText);
                callback();
            }
        };
        xhr.open("GET", dataFile, true);
        xhr.send(null);
    };

    /*
     * getCountryInfo
     *    
     *    @param    {string}  searchTerm    Any of the (so far 4) possible country information lists
     *    @return   {number}                Integer index of the array element found
     */
    this.getCountryInfo = function (searchTerm) {

        var idx = 0,
            s   = '';

        if (typeof (searchTerm) === "number") {
            s = (Math.floor(Math.abs(searchTerm)) + 1000).toString().substring(1);
        } else {
            s = searchTerm;
        }
        idx = search(s);

        // return country info object
        return getCountryObject(idx, searchTerm);
    };

    this.isDataLoaded = function () {
        return dataLoaded;
    };

};