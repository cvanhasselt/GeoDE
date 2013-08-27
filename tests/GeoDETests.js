    module('Module 1');
        asyncTest('Testing if data is loaded', 1, function() {
            // check to see if data is loaded 
            // THIS TEST MUST RUN SUCCESSFULLY FOR OTHER TESTS TO WORK.
            setupGeode(function () {
                equal($Z.isDataLoaded(), true, 'Data is Loaded');
                start();
            }); 
        });

    module('Module 2');
        test('Testing data returns', 28, function() {

            var country          = 'Afghanistan',
                countryAllCaps   = 'AFGHANISTAN',
                countryAlpha2    = 'AF',
                countryAlpha3    = 'AFG',
                unm49Code        = '004',
                unm49Number      = 4,
                Zcountry         = 'Zimbabwe',
                ZcountryAllCaps  = 'ZIMBABWE',
                ZcountryAlpha2   = 'ZW',
                ZcountryAlpha3   = 'ZWE',
                Zunm49Code       = '716',
                Zunm49Number     = 716;
                
            // test with country name, Afghanistan
            equal($Z.getCountryInfo(country).alpha2, 'AF','Expected value to be \'AF\'');
            equal($Z.getCountryInfo(country).alpha3, 'AFG','Expected value to be \'AFG\'');
            equal($Z.getCountryInfo(country).name, 'Afghanistan','Expected value to be \'Afghanistan\'');
            equal($Z.getCountryInfo(country).unm49, '004','Expected value to be \'004\'');

            // test return with all caps country name, AFGHANISTAN
            equal($Z.getCountryInfo(countryAllCaps).alpha2, 'AF','Expected value to be \'AF\'');
            equal($Z.getCountryInfo(countryAllCaps).alpha3, 'AFG','Expected value to be \'AFG\'');
            equal($Z.getCountryInfo(countryAllCaps).name, 'Afghanistan','Expected value to be \'Afghanistan\'');
            equal($Z.getCountryInfo(countryAllCaps).unm49, '004','Expected value to be \'004\'');

            // test return for searching by alpha2 country code, AF
            equal($Z.getCountryInfo(countryAlpha2).alpha2, 'AF','Expected value to be \'AF\'');
            equal($Z.getCountryInfo(countryAlpha2).alpha3, 'AFG','Expected value to be \'AFG\'');
            equal($Z.getCountryInfo(countryAlpha2).name, 'Afghanistan','Expected value to be \'Afghanistan\'');
            equal($Z.getCountryInfo(countryAlpha2).unm49, '004','Expected value to be \'004\'');

            // test return for searching for alpha3 country code, AFG
            equal($Z.getCountryInfo(countryAlpha3).alpha2, 'AF','Expected value to be \'AF\' testing with \'' + countryAlpha3);
            equal($Z.getCountryInfo(countryAlpha3).alpha3, 'AFG','Expected value to be \'AFG\'');
            equal($Z.getCountryInfo(countryAlpha3).name, 'Afghanistan','Expected value to be \'Afghanistan\'');
            equal($Z.getCountryInfo(countryAlpha3).unm49, '004','Expected value to be \'004\'');

            // test return for searching for UN M.49 country code, 004
            equal($Z.getCountryInfo(unm49Code).alpha2, 'AF','Expected value to be \'AF\' testing with \'' + unm49Code );
            equal($Z.getCountryInfo(unm49Code).alpha3, 'AFG','Expected value to be \'AFG\'');
            equal($Z.getCountryInfo(unm49Code).name, 'Afghanistan','Expected value to be \'Afghanistan\'');
            equal($Z.getCountryInfo(unm49Code).unm49, '004','Expected value to be \'004\'');

            // test return for searching for UN M.49 country code as a number, 4
            equal($Z.getCountryInfo(unm49Number).alpha2, 'AF','Expected value to be \'AF\'');
            equal($Z.getCountryInfo(unm49Number).alpha3, 'AFG','Expected value to be \'AFG\'');
            equal($Z.getCountryInfo(unm49Number).name, 'Afghanistan','Expected value to be \'Afghanistan\'');
            equal($Z.getCountryInfo(unm49Number).unm49, '004','Expected value to be \'004\'');  
            
            // test with country name, Zimbabwe
            equal($Z.getCountryInfo(Zcountry).alpha2, 'ZW','Expected value to be \'ZW\'');
            equal($Z.getCountryInfo(Zcountry).alpha3, 'ZWE','Expected value to be \'ZWE\'');
            equal($Z.getCountryInfo(Zcountry).name, 'Zimbabwe','Expected value to be \'Zimbabwe\'');
            equal($Z.getCountryInfo(Zcountry).unm49, '716','Expected value to be \'716\'');
      }); 

    module('Module 3');
        test('Testing for a few countries with alternate names.', 2, function() {
        
            var country1        = 'Austria',
                altCountry1     = 'Austria, Republic of',
                country2        = 'Vatican',
                altCountry2     = 'Holy See';
   
            equal($Z.getCountryInfo(country1).alpha2, $Z.getCountryInfo(altCountry1).alpha2, '\'' + country1 + '\' should return same value as \'' + altCountry1 +'\'' );
            equal($Z.getCountryInfo(country2).alpha2, $Z.getCountryInfo(altCountry2).alpha2, '\'' + country2 + '\' should return same value as \'' + altCountry2 +'\'' );
        });
        

    module('Module 4');
        test('Testing for a bad value.', 1, function() {
            var badCountry = 'Badland';
            // testing a bad value; should equal null.  In practice, this should be tested prior 
            // to using any returned value object value.
            equal($Z.getCountryInfo(badCountry), null, 'Expected to be null');
        });