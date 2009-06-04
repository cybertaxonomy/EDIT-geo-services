/* Copyright (C) 2009 Dominik Mikiewicz, www.cartomatic.pl
 * Copyright (C) 2009 Museum and Institute of Zoology of the Polish Academy of Sciences
 * 
 * This software is provided 'as-is', without any express or implied warranty.
 * In no event will the author be held liable for any damages arising from the
 * use of this software.
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter and redistribute it freely,
 * subject to the following restrictions:
 * 
 * 1. The origin of this software must not be misrepresented. If you use the
 * software in a product, an acknowledgement in the product documentation would
 * be appreciated but is not required.
 * 
 * 2. Altered source versions must be plainly marked as such, and must not be
 * misrepresented as being the original software.
 * 
 * 3. This notice may not be removed or altered in any source distribution.
*/

using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text.RegularExpressions;

    public class CoordinateConverter
    {

        //Patterns
        private ArrayList patterns;


        //Class constructor
        public CoordinateConverter()
        {
            //initialise pattern array
            patterns = new ArrayList();

            //temp pattern variable
            string[] pattern;


            //variations of DD.DDD with white space characters
            pattern = new string[2];
            pattern[0] = "Variation of DD.DDD";
            pattern[1] =
                //+/-/Nn/Ss/Ww/EeDD.DDDD
                "(^" +
                "(\\s)*(\\+|-|W|w|E|e|N|n|S|s)?(\\s)*" +
                "((\\d{1,3}(\\.|\\,)?(\\s)*$)|(\\d{1,3}(\\.|\\,)\\d+(\\s)*$))" +
                ")" +
                ////DD.DDDDNn/Ss/Ww/Ee
                "|(^" +
                "(\\s)*((\\d{1,3}(\\.|\\,)?(\\s)*)|(\\d{1,3}(\\.|\\,)\\d+(\\s)*))" +
                "(W|w|E|e|N|n|S|s)?(\\s)*$" +
                ")";
            patterns.Add(pattern);


            //Variations of DD(°|d)MM.MMM' with whitespace characters
            pattern = new string[2];
            pattern[0] = "Variation of DD(°|d)MM.MMM('|m)";
            pattern[1] =
                "(^" +
                "(\\s)*(\\+|-|W|w|E|e|N|n|S|s)?(\\s)*" +
                "((\\d{1,3}(\\s)*(°|º|D|d)?(\\s)*$)|(\\d{1,3}(\\s)*(°|º|D|d)(\\s)*\\d{1,2}(\\.|\\,)?(ʹ|'|M|m)?$)|(\\d{1,3}(\\s)*(°|º|D|d)(\\s)*\\d{1,2}(\\.|\\,)\\d+(\\s)*(ʹ|'|M|m)?(\\s)*$))" +
                ")" +
                "|(^" +
                "(\\s)*((\\d{1,3}(\\s)*(°|º|D|d)?(\\s)*)|(\\d{1,3}(\\s)*(°|º|D|d)(\\s)*\\d{1,2}(\\.|\\,)?(ʹ|'|M|m)?)|(\\d{1,3}(\\s)*(°|º|D|d)(\\s)*\\d{1,2}(\\.|\\,)\\d+(\\s)*(ʹ|'|M|m)?(\\s)*))" +
                "(W|w|E|e|N|n|S|s)?(\\s)*$" +
                ")";
            patterns.Add(pattern);


            //Variations of DD°MM'SS.SSS" with whitespace characters
            pattern = new string[2];
            pattern[0] = "Variation of DD(°|d)MM(ʹ|m)SS.SSS(ʺ|s)";
            pattern[1] =
                //+/-/Nn/Ss/Ww/EeDD°MMʹSS.SSS
                "(^" +
                "(\\s)*(\\+|-|W|w|E|e|N|n|S|s)?(\\s)*" +
                "((\\d{1,3}(\\s)*(°|º|D|d)?(\\s)*$)|(\\d{1,3}(\\s)*(°|º|D|d)(\\s)*\\d{1,2}(\\s)*(ʹ|'|M|m)?(\\s)*$)|(\\d{1,3}(\\s)*(°|º|D|d)(\\s)*\\d{1,2}(\\s)*(ʹ|'|M|m)(\\s)*\\d{1,2}(\\.|\\,)?(\\s)*(ʺ|\"|''|S|s)?(\\s)*$)|(\\d{1,3}(\\s)*(°|º|D|d)(\\s)*\\d{1,2}(\\s)*(ʹ|'|M|m)(\\s)*\\d{1,2}(\\.|\\,)\\d+(\\s)*(ʺ|\"|''|S|s)?(\\s)*$))" +
                ")" +
                //DD°MMʹSS.SSSNn/Ss/Ww/Ee
                "|(^" +
                "(\\s)*((\\d{1,3}(\\s)*(°|º|D|d)?(\\s)*)|(\\d{1,3}(\\s)*(°|º|D|d)(\\s)*\\d{1,2}(\\s)*(ʹ|'|M|m)?(\\s)*)|(\\d{1,3}(\\s)*(°|º|D|d)(\\s)*\\d{1,2}(\\s)*(ʹ|'|M|m)(\\s)*\\d{1,2}(\\.|\\,)?(\\s)*(ʺ|\"|''|S|s)?(\\s)*)|(\\d{1,3}(\\s)*(°|º|D|d)(\\s)*\\d{1,2}(\\s)*(ʹ|'|M|m)(\\s)*\\d{1,2}(\\.|\\,)\\d+(\\s)*(ʺ|\"|''|S|s)?(\\s)*))" +
                "(W|w|E|e|N|n|S|s)?(\\s)*$" +
                ")";
            patterns.Add(pattern);


            //Variations of DD:MM:SS.SSS with whitespace characters
            pattern = new string[2];
            pattern[0] = "Variation of DD:MM:SS.SSS";
            pattern[1] =
                // +/-/Nn/Ss/Ww/EeDD:MM:SS.SSS
                "(^" +
                "(\\s)*(\\+|-|W|w|E|e|N|n|S|s)?(\\s)*" +
                "((\\d{1,3}(\\s)*\\:?(\\s)*$)|(\\d{1,3}(\\s)*\\:(\\s)*\\d{1,2}(\\s)*\\:?(\\s)*$)|(\\d{1,3}(\\s)*\\:(\\s)*\\d{1,2}(\\s)*\\:(\\s)*\\d{1,2}(\\.|\\,)?(\\s)*$)|(\\d{1,3}(\\s)*\\:(\\s)*\\d{1,2}(\\s)*\\:(\\s)*\\d{1,2}(\\.|\\,)\\d+(\\s)*$))" +
                ")" +
                //DD:MM:SS.SSSNn/Ss/Ww/Ee
                "|(^" +
                "(\\s)*((\\d{1,3}(\\s)*\\:?(\\s)*)|(\\d{1,3}(\\s)*\\:(\\s)*\\d{1,2}(\\s)*\\:?(\\s)*)|(\\d{1,3}(\\s)*\\:(\\s)*\\d{1,2}(\\s)*\\:(\\s)*\\d{1,2}(\\.|\\,)?(\\s)*)|(\\d{1,3}(\\s)*\\:(\\s)*\\d{1,2}(\\s)*\\:(\\s)*\\d{1,2}(\\.|\\,)\\d+(\\s)*))" +
                "(W|w|E|e|N|n|S|s)?(\\s)*$" +
                ")";
            patterns.Add(pattern);

        }


        //tests if a string matches one of the defined patterns
        private int MatchPattern(string str)
        {
            int recognised = -1;

            //match the string against each available patern
            for (int i = 0; i < patterns.Count; i++)
            {

                string[] pattern = (string[])patterns[i];

                Regex regexObj = new Regex((string)pattern[1]);

                if (regexObj.IsMatch(str)) { recognised = i; break; }

            }

            return recognised;
        }


        //gets sign of the coordinate (tests for presence of negative sign)
        private int GetSign(string str)
        {

            //This regex checks for the negative hemisphere indicator
            Regex regexNegative = new Regex("(-|S|s|W|w)");

            //This regex checks if there weren't any other hemisphere indicators
            //it is needed for the specific case of the DDdMMmSSs S
            //so it needs to be ensured there where no positive indicators
            Regex regexPositive = new Regex("(\\+|N|n|E|e)");

            //if a positive indicator is found no need to search further
            if (regexPositive.IsMatch(str))
            {
                return 1;
            }
            else
            {
                //if not check whether there was a negative indicator. if so negate otherwise return positive
                if (regexNegative.IsMatch(str))
                {
                    return -1;
                }
                else
                {
                    return 1;
                }
            }
        }


        //this checks for the coordinate sign by evaluating user supplied data
        private int GetCustomSign(string str)
        {
            //Note:
            //Indicators are evaluated from the longest ones to the shortes ones
            //So when searching for "P" does not affect "PN" as "PN" is evaluated earlier

            
            //search for the presence of indicators
            bool hasPositive = false;
            bool hasNegative = false;

            //keep previous negative indicators here
            ArrayList previousNegatives = new ArrayList();
            
            //compare the string with user supplied custom pattern
            for (int x = CustomPtrn.HemisphereIndicators.Count - 1; x >= 0; x--)
            {

                CustomHemisphereIndicator ind = (CustomHemisphereIndicator)CustomPtrn.HemisphereIndicators[x];

                //test here if the indicator exists (has length >0)
                if (ind.Length > 0)
                {

                    //check if the supplied pattern was marked as case insensitive?
                    string CaseInsensitive = "";

                    if (CustomPtrn.CaseInsensitive)
                    {
                        CaseInsensitive = "(?i)";
                    }

                    //create a regex
                    Regex tempRegex = new Regex(CaseInsensitive + ind.Indicator);

                    //if a pattern is found
                    if (tempRegex.IsMatch(str))
                    {
                        //check whether it's a positive or negative indicator
                        if (ind.Positive)
                        {
                            /* Note:
                             * See the note below to understand why checking for previous negatives is performed here
                            */
                            
                            //check the previous negatives
                            if (previousNegatives.Count != 0)
                            {
                                bool sameNegative = false;

                                for (int i = previousNegatives.Count - 1; i >= 0; i--)
                                {
                                    if (ind.Indicator == (string) previousNegatives[i])
                                    {
                                        sameNegative = true;
                                        break;
                                    }
                                }

                                //mark as positive only if the previously found negative is the same
                                if (sameNegative)
                                {
                                    hasPositive = true;
                                }

                            }
                            else //if no negatives before it already marks the sign as positive
                            {
                                hasPositive = true;
                            }

                        }
                        else
                        {
                            /* Note:
                             * save the negative indicator here so it can be compared later if a positive wants to overwrite it!
                             * in a case a longer negative "Pn" has already been found a shorter positive "P" will not overwrite it
                             * and the hasPositive will remain false;
                             * In a case a "P" negative indicator has already been found, positive will mark hasPositive and therefore
                             * later a default positive value will be returned (if the indicators for positive & negative are the same
                             * positive is returned)
                             * testing for previous positives is not required since if a hasPositive is already true method will return
                             * true anyway
                             * 
                            */
                            previousNegatives.Add(ind.Indicator);
                            
                            hasNegative = true;

                        }
                    }
                }
                
            }

            //Note:
            //positive indicator has priority here - if both indicators supplied by the user are the same, a positive is chosen
            //if there were no indicator found in the tested coordinate, a positive value is returned by default

            if (hasPositive)
            {
                return 1;
            }
            else
            {
                if (hasNegative)
                {
                    return -1;
                }
                else
                {
                    return 1;
                }
            }

        }

          

        //returns a currently used decimal separator
        private string GetDecimalSeparator()
        {
            return System.Globalization.NumberFormatInfo.CurrentInfo.NumberDecimalSeparator;
        }


        //replaces comma or dot for current decimal separator
        private string FixDecimalSeparator(string str)
        {
            //Note:
            //Coma is replaced as parsers often recognise dot as a decimal separator
            //Comma or dot is replaced with a decimal separator here (environment settings)
            //But decimal separator has to be used later too;

            

            Regex ReplaceComma = new Regex("(\\,|\\.)");
            str = ReplaceComma.Replace(str, GetDecimalSeparator());

            return str;
        }


        //removes sign
        private string RemoveSign(string str)
        {
            Regex RemoveSign = new Regex("(\\+|-|S|s|W|w|N|n|E|e)");
            str = RemoveSign.Replace(str, "");

            return str;
        }


        //removes custom sign indicators
        private string RemoveCustomPatternParts(string str)
        {

            /* Note:
             * Symbols are added here so the removing tries to not affect the coordinate too much
             * Strings to be removed then are evaluated from the longest ones to the shortes ones
             * So when searching for "P" does not affect "PN" as "PN" is evaluated earlier
             * */

            //CustomHemisphereIndicator is used here so another object does not have to be created
            //only for the string cleanning
            ArrayList StringsToRemove = CustomPtrn.HemisphereIndicators;

            //add degree symbol
            CustomHemisphereIndicator StringToRemove = new CustomHemisphereIndicator("Degree", CustomPtrn.DegreeSymbol,CustomPtrn.DegreeSymbol.Length, false);
            StringsToRemove.Add(StringToRemove);

            //add minute symbol
            StringToRemove = new CustomHemisphereIndicator("Minute", CustomPtrn.MinuteSymbol, CustomPtrn.MinuteSymbol.Length, false);
            StringsToRemove.Add(StringToRemove);

            //add second symbol
            StringToRemove = new CustomHemisphereIndicator("Second", CustomPtrn.SecondSymbol, CustomPtrn.SecondSymbol.Length, false);
            StringsToRemove.Add(StringToRemove);

            //sorth the arraylist (by element's Length property)
            StringsToRemove.Sort();


            for (int x = StringsToRemove.Count - 1; x >= 0; x--)
            {

                CustomHemisphereIndicator ToBeRemoved = (CustomHemisphereIndicator)StringsToRemove[x];

                //check if the string exists so replacing does not yield errors
                if (ToBeRemoved.Length > 0)
                {
                    //check if the supplied pattern was marked as case insensitive?
                    string CaseInsensitive = "";

                    if (CustomPtrn.CaseInsensitive)
                    {
                        CaseInsensitive = "(?i)";
                    }

                    //create regex for replacing
                    Regex TempRegex = new Regex(CaseInsensitive + ToBeRemoved.Indicator);


                    if (ToBeRemoved.Name == "Degree" | ToBeRemoved.Name == "Minute")
                    {
                        //replace with a symbol used later for splitting
                        str = TempRegex.Replace(str, ":");
                    }
                    else
                    {
                        //remove the string
                        str = TempRegex.Replace(str, "");
                    }
                }
            }
            return str;
        }



        //removes whitespace characters
        private string RemoveWhiteSpace(string str)
        {
            Regex RemoveWhiteSpace = new Regex("\\s*");
            str = RemoveWhiteSpace.Replace(str, "");

            return str;
        }


        //Object for the conversion results
        public struct ConversionResults
        {
            public bool PatternRecognised;
            public string PatternMatched;
            public string PatternType;

            public bool ConversionSuccessful;
            public double ConvertedCoord;
            public bool CanBeLat;

            public string ConversionComments;

            public int Dd;
            public int Mm;
            public double Mmm;
            public int Ss;
            public double Sss;

        }


        public ConversionResults TryConvert(string str)
        {
            //some local variables
            int sign; //sign of the coordinate
            string[] DecimalBit, DdMmSs, DdMm; //arrays for splitting
            double Dd = 0, Mm = 0, Ss = 0, Mmm = 0, Sss = 0, Dec = 0; //parts of the coordinates

            char DecSeparator = char.Parse(GetDecimalSeparator()); //gets the current decimal separator

            Regex TempRegex; //regular expression object for 'on demand' patern matching 

            ConversionResults results = new ConversionResults();

            //Get the matched pattern
            string[] pattern;
            int ptrnnum = MatchPattern(str);
            if (ptrnnum != -1)
            {
                pattern = (string[])patterns[ptrnnum];
            }
            else
            {
                pattern = new string[2];
                pattern[0] = "Unknown";
                pattern[1] = "No pattern matched";
            }



            switch (pattern[0]) //pattern[0] holds patern name
            {
                default: //pattern not recognised

                    results.PatternRecognised = false;
                    results.PatternType = pattern[0];
                    results.PatternMatched = pattern[1];

                    results.ConversionSuccessful = false;
                    results.ConvertedCoord = 99999; //this is to mark an error...

                    results.ConversionComments = "Coordinate pattern not recognised!";

                    break;


                case "Variation of DD.DDD":

                    //Pattern matched
                    results.PatternRecognised = true;

                    //Matching pattern succeeded so intialy the parsing is ok
                    results.ConversionSuccessful = true;

                    //pattern info
                    results.PatternType = pattern[0];
                    results.PatternMatched = pattern[1];

                    //get sign
                    sign = GetSign(str);

                    //Replace comma or dot with a current decimal separator
                    str = FixDecimalSeparator(str);

                    //Remove all the unwanted stuff
                    str = RemoveSign(str);
                    str = RemoveWhiteSpace(str);

                    //Since this is already a decimal degree no spliting is needed
                    Dd = double.Parse(str);

                    //do some additional checking if the coords fall into the range
                    if (Dd < -180 | Dd > 180)//degree may require another param specifying whether it's lat or lon...
                    {
                        results.ConversionSuccessful = false;
                        results.ConvertedCoord = 99999; //this is to mark an error...
                        results.ConversionComments += "Degrees fall outside the range: DD < -180 | DD > 180; ";
                    }

                    //Do the conversion if everything ok
                    if (results.ConversionSuccessful)
                    {
                        results.ConversionComments = "Conversion successful.";

                        Dec = sign * Dd;
                        results.ConvertedCoord = Dec;

                        //Check whether the coordinate exceeds +/- 90 and mark it in comments
                        if (Dec <= 90 & Dec >= -90) { results.CanBeLat = true; }
                    }

                    break;


                case "Variation of DD(°|d)MM.MMM('|m)":

                    //Pattern matched
                    results.PatternRecognised = true;

                    //Matching pattern succeeded so intialy the parsing is ok
                    results.ConversionSuccessful = true;

                    //pattern info
                    results.PatternType = pattern[0];
                    results.PatternMatched = pattern[1];

                    //get sign
                    sign = GetSign(str);

                    //Replace comma or dot with a current decimal separator
                    str = FixDecimalSeparator(str);

                    //Remove all the unwanted stuff
                    str = RemoveSign(str);
                    str = RemoveWhiteSpace(str);


                    //do some further replacing
                    //Replace degree symbol
                    TempRegex = new Regex("(°|º|D|d)");
                    str = TempRegex.Replace(str, ":");

                    //remove minute symbol
                    TempRegex = new Regex("(ʹ|'|M|m)");
                    str = TempRegex.Replace(str, "");

                    //Extract decimal part
                    DecimalBit = str.Split(DecSeparator);

                    //split degrees and minutes
                    DdMm = DecimalBit[0].Split(':');


                    //extract values from the strings
                    Dd = int.Parse(DdMm[0]); //Degrees

                    if (DdMm.Length > 1)//Minutes
                    {
                        //check if the string is not empty
                        if (DdMm[1] != "") { Mm = int.Parse(DdMm[1]); }
                    }

                    if (DecimalBit.Length > 1)//DecimalSeconds
                    {
                        //check if the string is not empty
                        if (DecimalBit[1] != "")
                        {
                            Mmm = double.Parse(DecimalBit[1]) / Math.Pow(10, (DecimalBit[1].Length));
                        }
                    }

                    //do some additional checking if the coords fall into the range
                    if (Dd < -180 | Dd > 180)//degree may require another param specifying whether it's lat or lon...
                    {
                        results.ConversionSuccessful = false;
                        results.ConvertedCoord = 99999; //this is to mark an error...
                        results.ConversionComments += "Degrees fall outside the range: DD < -180 | DD > 180; ";
                    }
                    if (Mm > 59) //minutes
                    {
                        results.ConversionSuccessful = false;
                        results.ConvertedCoord = 99999; //this is to mark an error...
                        results.ConversionComments += "Minutes fall outside the range: MM > 59; ";
                    }


                    //Do the conversion if everything ok
                    if (results.ConversionSuccessful)
                    {

                        Dec = sign * (Dd + (Mm + Mmm) / 60);

                        //one more check to ensure a coord does not exceed 180
                        if (Dec > 180 | Dec < -180)
                        {
                            results.ConversionSuccessful = false;
                            results.ConvertedCoord = 99999; //this is to mark an error...
                            results.ConversionComments += "Coordinate is either > 180 or < -180; ";
                        }
                        else
                        {
                            results.ConvertedCoord = Dec;

                            results.ConversionComments = "Conversion successful.";

                            //Check whether the coordinate exceeds +/- 90 and mark it in comments
                            if (Dec <= 90 & Dec >= -90) { results.CanBeLat = true; }
                        }
                    }


                    break;


                case "Variation of DD(°|d)MM(ʹ|m)SS.SSS(ʺ|s)":

                    /* 
                     * Note:
                     * This pattern allows the seconds to be specified with S, s or " or nothing at all
                     * If the seconds are marked with "s" and there is no other indication of the hemisphere
                     * the coordinate will be parsed as southern (negative).
                     * 
                     * If the N / E / W / + indicator is found the coordinate will be parsed appropriately no matter
                     * what is the second notation
                    */

                    //Pattern matched
                    results.PatternRecognised = true;

                    //Matching pattern succeeded so intialy the parsing is ok
                    results.ConversionSuccessful = true;

                    //pattern info
                    results.PatternType = pattern[0];
                    results.PatternMatched = pattern[1];

                    //get sign
                    sign = GetSign(str);

                    //Replace comma or dot with a current decimal separator
                    str = FixDecimalSeparator(str);

                    //Remove all the unwanted stuff
                    str = RemoveSign(str);
                    str = RemoveWhiteSpace(str);

                    //remove second symbol (s is removed by the get sign method)
                    //double apostrophe is not removed here as single apostrphe may mark minutes!
                    //it's taken care of later after extracting the decimal part
                    TempRegex = new Regex("(ʺ|\")");
                    str = TempRegex.Replace(str, "");

                    //do some further replacing
                    //Replace degree symbol
                    TempRegex = new Regex("(°|º|D|d|ʹ|'|M|m)");
                    str = TempRegex.Replace(str, ":");


                    //Extract decimal part
                    DecimalBit = str.Split(DecSeparator);

                    //remove : from the decimal part [1]! This is needed when a double apostrophe was used to mark seconds
                    if (DecimalBit.Length > 1)
                    {
                        DecimalBit[1].Replace(":", "");
                    }

                    //split degrees and minutes
                    DdMmSs = DecimalBit[0].Split(':');


                    //extract values from the strings
                    Dd = int.Parse(DdMmSs[0]); //Degrees
                    if (DdMmSs.Length > 1)//Minutes
                    {
                        //check if the string is not empty
                        if (DdMmSs[1] != "") { Mm = int.Parse(DdMmSs[1]); }
                    }
                    if (DdMmSs.Length > 2)//Seconds
                    {
                        //check if the string is not empty
                        if (DdMmSs[2] != "") { Ss = int.Parse(DdMmSs[2]); }
                    }
                    if (DecimalBit.Length > 1)//DecimalSeconds
                    {
                        //check if the string is not empty
                        if (DecimalBit[1] != "")
                        {
                            Sss = double.Parse(DecimalBit[1]) / Math.Pow(10, (DecimalBit[1].Length));
                        }
                    }

                    //do some additional checking if the coords fall into the range
                    if (Dd < -180 | Dd > 180)//degree may require another param specifying whether it's lat or lon...
                    {
                        results.ConversionSuccessful = false;
                        results.ConvertedCoord = 99999; //this is to mark an error...
                        results.ConversionComments += "Degrees fall outside the range: DD < -180 | DD > 180; ";
                    }
                    if (Mm > 59) //minutes
                    {
                        results.ConversionSuccessful = false;
                        results.ConvertedCoord = 99999; //this is to mark an error...
                        results.ConversionComments += "Minutes fall outside the range: MM > 59; ";
                    }
                    if (Ss > 59) //seconds
                    {
                        results.ConversionSuccessful = false;
                        results.ConvertedCoord = 99999; //this is to mark an error...
                        results.ConversionComments += "Seconds fall outside the range: MM >= 60; ";
                    }

                    //Do the conversion if everything ok
                    if (results.ConversionSuccessful)
                    {
                        results.ConversionComments = "Conversion successful.";

                        Dec = sign * (Dd + Mm / 60 + (Ss + Sss) / 3600);

                        //one more check to ensure a coord does not exceed 180
                        if (Dec > 180 | Dec < -180)
                        {
                            results.ConversionSuccessful = false;
                            results.ConvertedCoord = 99999; //this is to mark an error...
                            results.ConversionComments += "Coordinate is either > 180 or < -180; ";
                        }
                        else
                        {
                            results.ConvertedCoord = Dec;

                            results.ConversionComments = "Conversion successful.";

                            //Check whether the coordinate exceeds +/- 90 and mark it in comments
                            if (Dec <= 90 & Dec >= -90) { results.CanBeLat = true; }
                        }
                    }
                    break;


                case "Variation of DD:MM:SS.SSS":

                    //Pattern matched
                    results.PatternRecognised = true;

                    //Matching pattern succeeded so intialy the parsing is ok
                    results.ConversionSuccessful = true;

                    //pattern info
                    results.PatternType = pattern[0];
                    results.PatternMatched = pattern[1];

                    //get sign
                    sign = GetSign(str);

                    //Replace comma or dot with a current decimal separator
                    str = FixDecimalSeparator(str);

                    //Remove all the unwanted stuff
                    str = RemoveSign(str);
                    str = RemoveWhiteSpace(str);

                    //Do some splitting
                    DecimalBit = str.Split(DecSeparator);
                    DdMmSs = DecimalBit[0].Split(':');


                    //extract values from the strings
                    Dd = int.Parse(DdMmSs[0]); //Degrees
                    if (DdMmSs.Length > 1)//Minutes
                    {
                        //check if the string is not empty
                        if (DdMmSs[1] != "") { Mm = int.Parse(DdMmSs[1]); }
                    }
                    if (DdMmSs.Length > 2)//Seconds
                    {
                        //check if the string is not empty
                        if (DdMmSs[2] != "") { Ss = int.Parse(DdMmSs[2]); }
                    }
                    if (DecimalBit.Length > 1)//DecimalSeconds
                    {
                        //check if the string is not empty
                        if (DecimalBit[1] != "")
                        {
                            Sss = double.Parse(DecimalBit[1]) / Math.Pow(10, (DecimalBit[1].Length));
                        }
                    }

                    //do some additional checking if the coords fall into the range
                    if (Dd < -180 | Dd > 180)//degree may require another param specifying whether it's lat or lon...
                    {
                        results.ConversionSuccessful = false;
                        results.ConvertedCoord = 99999; //this is to mark an error...
                        results.ConversionComments += "Degrees fall outside the range: DD < -180 | DD > 180; ";
                    }
                    if (Mm > 59) //minutes
                    {
                        results.ConversionSuccessful = false;
                        results.ConvertedCoord = 99999; //this is to mark an error...
                        results.ConversionComments += "Minutes fall outside the range: MM > 59; ";
                    }
                    if (Ss > 59) //seconds
                    {
                        results.ConversionSuccessful = false;
                        results.ConvertedCoord = 99999; //this is to mark an error...
                        results.ConversionComments += "Seconds fall outside the range: MM >= 60; ";
                    }

                    //Do the conversion if everything ok
                    if (results.ConversionSuccessful)
                    {
                        results.ConversionComments = "Conversion successful.";

                        Dec = sign * (Dd + Mm / 60 + (Ss + Sss) / 3600);

                        //one more check to ensure a coord does not exceed 180
                        if (Dec > 180 | Dec < -180)
                        {
                            results.ConversionSuccessful = false;
                            results.ConvertedCoord = 99999; //this is to mark an error...
                            results.ConversionComments += "Coordinate is either > 180 or < -180; ";
                        }
                        else
                        {
                            results.ConvertedCoord = Dec;

                            results.ConversionComments = "Conversion successful.";

                            //Check whether the coordinate exceeds +/- 90 and mark it in comments
                            if (Dec <= 90 & Dec >= -90) { results.CanBeLat = true; }
                        }
                    }

                    break;


                //-------------Customs patterns start here-------------

                case "Custom variation of DD.DDD":

                    //Pattern matched
                    results.PatternRecognised = true;

                    //Matching pattern succeeded so intialy the parsing is ok
                    results.ConversionSuccessful = true;

                    //pattern info
                    results.PatternType = pattern[0];
                    results.PatternMatched = pattern[1];


                    //get sign
                    sign = GetCustomSign(str);
                    

                    //Remove all the unwanted stuff
                    //Note: This method also replaces the symbols with ":"
                    //Note: In certain cases it may make the coord unparsable
                    str = RemoveCustomPatternParts(str);

                    str = RemoveWhiteSpace(str);

                    //Replace comma or dot with a current decimal separator
                    str = FixDecimalSeparator(str);

                    //remove the ":" here as it is not needed here for decimal degrees
                    str = str.Replace(":", "");

                    try
                    {
                        //Since this is already a decimal degree no spliting is needed
                        Dd = double.Parse(str);
                    }
                    catch
                    {
                        results.ConversionSuccessful = false;
                        results.ConvertedCoord = 99999; //this is to mark an error...
                        results.ConversionComments =
                            "It looks like the supplied pattern has some ambiguous elements and the parser was unable to parse the coordinate." +
                            "<br/>If the supplied symbols used for marking degrees, minutes or seconds contain hemisphere indicators, " + 
                            "the parser is likely to fail or yield rubbish results even though the pattern itself has been recognised."
                            ;

                        //exit method
                        return results;
                    }

                    //Since this is already a decimal degree no spliting is needed
                    Dd = double.Parse(str);

                    //do some additional checking if the coords fall into the range
                    if (Dd < -180 | Dd > 180)//degree may require another param specifying whether it's lat or lon...
                    {
                        results.ConversionSuccessful = false;
                        results.ConvertedCoord = 99999; //this is to mark an error...
                        results.ConversionComments += "Degrees fall outside the range: DD < -180 | DD > 180; ";
                    }

                    //Do the conversion if everything ok
                    if (results.ConversionSuccessful)
                    {
                        results.ConversionComments = "Conversion successful.";

                        Dec = sign * Dd;
                        results.ConvertedCoord = Dec;

                        //Check whether the coordinate exceeds +/- 90 and mark it in comments
                        if (Dec <= 90 & Dec >= -90) { results.CanBeLat = true; }
                    }

                    break;

                case "Custom variation of DD:MM.MMM":

                    //Pattern matched
                    results.PatternRecognised = true;

                    //Matching pattern succeeded so intialy the parsing is ok
                    results.ConversionSuccessful = true;

                    //pattern info
                    results.PatternType = pattern[0];
                    results.PatternMatched = pattern[1];

                    //get sign
                    sign = GetCustomSign(str);



                    //Remove all the unwanted stuff
                    //Note: This method also replaces the symbols with ":"
                    //Note: In certain cases it may make the coord unparsable
                    str = RemoveCustomPatternParts(str);

                    str = RemoveWhiteSpace(str);

                    //Replace comma or dot with a current decimal separator
                    str = FixDecimalSeparator(str);

                    
                    //Extract decimal part
                    DecimalBit = str.Split(DecSeparator);

                    //split degrees and minutes
                    DdMm = DecimalBit[0].Split(':');


                    try
                    {
                        //extract values from the strings
                        Dd = int.Parse(DdMm[0]); //Degrees

                        if (DdMm.Length > 1)//Minutes
                        {
                            //check if the string is not empty
                            if (DdMm[1] != "") { Mm = int.Parse(DdMm[1]); }
                        }

                        if (DecimalBit.Length > 1)//DecimalSeconds
                        {
                            //check if the string is not empty
                            if (DecimalBit[1] != "")
                            {
                                //replace the ":" if any (may be here as a result of custom symbol replacement
                                DecimalBit[1] = DecimalBit[1].Replace(":", "");

                                Mmm = double.Parse(DecimalBit[1]) / Math.Pow(10, (DecimalBit[1].Length));
                            }
                        }
                    }
                    catch
                    {
                        results.ConversionSuccessful = false;
                        results.ConvertedCoord = 99999; //this is to mark an error...
                        results.ConversionComments =
                            "It looks like the supplied pattern has some ambiguous elements and the parser was unable to parse the coordinate." +
                            "<br/>If the supplied symbols used for marking degrees, minutes or seconds contain hemisphere indicators, " +
                            "the parser is likely to fail or yield rubbish results even though the pattern itself has been recognised."
                            ;

                        //exit method
                        return results;
                    }


                    //do some additional checking if the coords fall into the range
                    if (Dd < -180 | Dd > 180)//degree may require another param specifying whether it's lat or lon...
                    {
                        results.ConversionSuccessful = false;
                        results.ConvertedCoord = 99999; //this is to mark an error...
                        results.ConversionComments += "Degrees fall outside the range: DD < -180 | DD > 180; ";
                    }
                    if (Mm > 59) //minutes
                    {
                        results.ConversionSuccessful = false;
                        results.ConvertedCoord = 99999; //this is to mark an error...
                        results.ConversionComments += "Minutes fall outside the range: MM > 59; ";
                    }


                    //Do the conversion if everything ok
                    if (results.ConversionSuccessful)
                    {

                        Dec = sign * (Dd + (Mm + Mmm) / 60);

                        //one more check to ensure a coord does not exceed 180
                        if (Dec > 180 | Dec < -180)
                        {
                            results.ConversionSuccessful = false;
                            results.ConvertedCoord = 99999; //this is to mark an error...
                            results.ConversionComments += "Coordinate is either > 180 or < -180; ";
                        }
                        else
                        {
                            results.ConvertedCoord = Dec;

                            results.ConversionComments = "Conversion successful.";

                            //Check whether the coordinate exceeds +/- 90 and mark it in comments
                            if (Dec <= 90 & Dec >= -90) { results.CanBeLat = true; }
                        }
                    }

                    break;


                case "Custom variation of DD:MM:SS.SSS":

                    //Pattern matched
                    results.PatternRecognised = true;

                    //Matching pattern succeeded so intialy the parsing is ok
                    results.ConversionSuccessful = true;

                    //pattern info
                    results.PatternType = pattern[0];
                    results.PatternMatched = pattern[1];


                    //get sign
                    sign = GetCustomSign(str);



                    //Remove all the unwanted stuff
                    //Note: This method also replaces the symbols with ":"
                    //Note: In certain cases it may make the coord unparsable
                    str = RemoveCustomPatternParts(str);

                    str = RemoveWhiteSpace(str);

                    //Replace comma or dot with a current decimal separator
                    str = FixDecimalSeparator(str);


                    //Extract decimal part
                    DecimalBit = str.Split(DecSeparator);

                    //split degrees and minutes
                    DdMmSs = DecimalBit[0].Split(':');


                    try
                    {

                        //extract values from the strings
                        Dd = int.Parse(DdMmSs[0]); //Degrees
                        if (DdMmSs.Length > 1)//Minutes
                        {
                            //check if the string is not empty
                            if (DdMmSs[1] != "") { Mm = int.Parse(DdMmSs[1]); }
                        }
                        if (DdMmSs.Length > 2)//Seconds
                        {
                            //check if the string is not empty
                            if (DdMmSs[2] != "") { Ss = int.Parse(DdMmSs[2]); }
                        }
                        if (DecimalBit.Length > 1)//DecimalSeconds
                        {
                            //check if the string is not empty
                            if (DecimalBit[1] != "")
                            {
                                Sss = double.Parse(DecimalBit[1]) / Math.Pow(10, (DecimalBit[1].Length));
                            }
                        }
                    }
                    catch
                    {
                        results.ConversionSuccessful = false;
                        results.ConvertedCoord = 99999; //this is to mark an error...
                        results.ConversionComments =
                            "It looks like the supplied pattern has some ambiguous elements and the parser was unable to parse the coordinate." +
                            "<br/>If the supplied symbols used for marking degrees, minutes or seconds contain hemisphere indicators, " +
                            "the parser is likely to fail or yield rubbish results even though the pattern itself has been recognised."
                            ;

                        //exit method
                        return results;
                    }


                    //do some additional checking if the coords fall into the range
                    if (Dd < -180 | Dd > 180)//degree may require another param specifying whether it's lat or lon...
                    {
                        results.ConversionSuccessful = false;
                        results.ConvertedCoord = 99999; //this is to mark an error...
                        results.ConversionComments += "Degrees fall outside the range: DD < -180 | DD > 180; ";
                    }
                    if (Mm > 59) //minutes
                    {
                        results.ConversionSuccessful = false;
                        results.ConvertedCoord = 99999; //this is to mark an error...
                        results.ConversionComments += "Minutes fall outside the range: MM > 59; ";
                    }
                    if (Ss > 59) //seconds
                    {
                        results.ConversionSuccessful = false;
                        results.ConvertedCoord = 99999; //this is to mark an error...
                        results.ConversionComments += "Seconds fall outside the range: MM >= 60; ";
                    }

                    //Do the conversion if everything ok
                    if (results.ConversionSuccessful)
                    {
                        results.ConversionComments = "Conversion successful.";

                        Dec = sign * (Dd + Mm / 60 + (Ss + Sss) / 3600);

                        //one more check to ensure a coord does not exceed 180
                        if (Dec > 180 | Dec < -180)
                        {
                            results.ConversionSuccessful = false;
                            results.ConvertedCoord = 99999; //this is to mark an error...
                            results.ConversionComments += "Coordinate is either > 180 or < -180; ";
                        }
                        else
                        {
                            results.ConvertedCoord = Dec;

                            results.ConversionComments = "Conversion successful.";

                            //Check whether the coordinate exceeds +/- 90 and mark it in comments
                            if (Dec <= 90 & Dec >= -90) { results.CanBeLat = true; }
                        }
                    }

                    break;
                    

            }

            //do the self check here
            results = selfTest(results);

            //return conversion results
            return results;
        }


        private ConversionResults selfTest(ConversionResults results)
        {

            ConversionResults newresults = results;

            if (results.ConversionSuccessful != false)
            {
                int sign = 1;
                if (Math.Sign(results.ConvertedCoord) < 0) { sign = -1; }
                
                double decimalDegrees = sign * results.ConvertedCoord;
                int fullDegrees;

                double decimalMinutes;
                int fullMinutes;

                double decimalSeconds;
                int fullSeconds;


                //Get full degrees
                fullDegrees = (int)Math.Floor(decimalDegrees);

                //get minutes
                decimalMinutes = (decimalDegrees - fullDegrees) * 60;
                fullMinutes = (int)Math.Floor(decimalMinutes);

                decimalSeconds = (decimalMinutes - fullMinutes) * 60;
                fullSeconds = (int)Math.Floor(decimalSeconds);

                //save the test results
                newresults.Dd = fullDegrees;
                newresults.Mm = fullMinutes;
                newresults.Mmm = decimalSeconds;
                newresults.Ss = fullSeconds;
                newresults.Sss = decimalSeconds;

            }

            return newresults;

        }



        //------------ CUSTOM PATTERN BUILDER--------------

        public struct CustomPatternIn
        {
            public string North;
            public string South;
            public string East;
            public string West;

            public string DegreeSymbol;
            public string MinuteSymbol;
            public string SecondSymbol;

            public bool CaseInsensitive;
            public bool AllowWhiteSpace;
            public bool PriorityOverDefaultPatterns;
            public bool DisableDefaultPatterns;

        }

        
        private struct CustomPattern
        {

            public ArrayList HemisphereIndicators;

            public string DegreeSymbol;
            public string MinuteSymbol;
            public string SecondSymbol;

            public bool CaseInsensitive;

        }

        //global variable to be used if a custom pattern is used
        private CustomPattern CustomPtrn;



        //escape some of the chars
        private string EscapeChars(string str)
        {
            // backslash - first so it is not messed when other escape chars are corrected for being used in a string
            str = str.Replace("\\", "\\\\");

            //dot and comma
            str = str.Replace(".", "\\.");
            str = str.Replace(",", "\\,");

            //brackets
            str = str.Replace("(", "\\(");
            str = str.Replace(")", "\\)");
            str = str.Replace("[", "\\[");
            str = str.Replace("]", "\\]");
            str = str.Replace("{", "\\{");
            str = str.Replace("}", "\\}");

            //other replacements
            str = str.Replace("^", "\\^");
            str = str.Replace("$", "\\$");
            str = str.Replace("+", "\\+");
            str = str.Replace("*", "\\*");
            str = str.Replace("?", "\\?");
            str = str.Replace("|", "\\|");

            return str;
        }


        //this implements sorting by using system.Icomparable - sorting is needed later when replacing
        private class CustomHemisphereIndicator : System.IComparable
        {
            //private variables
            private int m_length;
            private string m_name;
            private string m_indicator;
            private bool m_positive;

            //constructor
            public CustomHemisphereIndicator(string name, string indicator, int length, bool positive)
            {
                this.m_name = name;
                this.m_indicator = indicator;
                this.m_length = length;
                this.m_positive = positive;
            }

            //properties

            public string Name
            {
                get {return this.m_name;}
                set{this.m_name = value;}
            }

            public string Indicator
            {
                get{return this.m_indicator;}
                set{this.m_indicator = value;}
            }

            public int Length
            {
                get{return this.m_length;}
                set { this.m_length = value; }
            }


            public bool Positive
            {
                get { return this.m_positive; }
                set { this.m_positive = value; }
            }

            /* Less than zero if this instance is less than obj.
             * Zero if this instance is equal to obj. 
             * Greater than zero if this instance is greater than obj. 
             * 
             * This method uses the predefined method Int32.CompareTo
             * */

            public int CompareTo(object obj)
            {
            if(!(obj is CustomHemisphereIndicator))
                throw new InvalidCastException("This object is not of type CustomHemisphereIndicator");
  
            CustomHemisphereIndicator ind = (CustomHemisphereIndicator)obj;
            //no need to rewrite the code again, we have int.CompareTo ready to use
            return this.Length.CompareTo(ind.Length);
            }
        }



        //This adds custom pattern to a list of already predefined patterns
        //useful for batch conversions - allows for totally mixed input data (predefined & custom)
        public void AddCustomPattern(CustomPatternIn patternIn)
        {

            
            //new custom pattern object - to pass the needed data farther
            CustomPattern pattern = new CustomPattern();


            //keep indicators for parsing
            ArrayList indicators = new ArrayList();

            //north
            CustomHemisphereIndicator ind = new CustomHemisphereIndicator("North", patternIn.North, patternIn.North.Length,true);
            indicators.Add(ind);
            
            //south
            ind = new CustomHemisphereIndicator("South", patternIn.South, patternIn.South.Length, false);
            indicators.Add(ind);

            //east
            ind = new CustomHemisphereIndicator("East", patternIn.East, patternIn.East.Length, true);
            indicators.Add(ind);

            //west
            ind = new CustomHemisphereIndicator("West", patternIn.West, patternIn.West.Length, false);
            indicators.Add(ind);

            //sort the arraylist
            indicators.Sort();
            
            //add it to the pattern object
            pattern.HemisphereIndicators = indicators; 
            
            //case insensitive
            pattern.CaseInsensitive = patternIn.CaseInsensitive;

            //keep symbols for parsing
            pattern.DegreeSymbol = patternIn.DegreeSymbol;
            pattern.MinuteSymbol = patternIn.MinuteSymbol;
            pattern.SecondSymbol = patternIn.SecondSymbol;


            //save the data
            CustomPtrn = pattern;
            



            //----------------build custom patterns----------------

            //prepare hemisphere indicators
            string north = EscapeChars(patternIn.North);
            string south = EscapeChars(patternIn.South);
            string east = EscapeChars(patternIn.East);
            string west = EscapeChars(patternIn.West);

            //prepare symbols
            string degreesymbol = "";
            if (patternIn.DegreeSymbol != "")
            {
                degreesymbol = "(" + EscapeChars(patternIn.DegreeSymbol) + ")?";
            }

            string minutesymbol = "";
            if (patternIn.MinuteSymbol != "")
            {
                minutesymbol = "(" + EscapeChars(patternIn.MinuteSymbol) + ")?";
            }

            string secondsymbol = "";
            if (EscapeChars(patternIn.SecondSymbol) != "")
            {
                secondsymbol = "(" + EscapeChars(patternIn.SecondSymbol) + ")?";
            }


            //is the pattern to be case insensitive?
            string CaseInsensitive = "";
            if (patternIn.CaseInsensitive)
            {
                CaseInsensitive = "(?i)";
            }

            //allow whitespace
            string WhiteSpace = "";
            if (patternIn.AllowWhiteSpace == true)
            {
                WhiteSpace = "(\\s)*";
            }

            //hemisphere indicator
            string HemisphereIndicator = "";

            //add north if present
            if (north == "")
            {

                HemisphereIndicator += south;

            }
            else
            {
                HemisphereIndicator += north;

                if (south != "")
                {
                    HemisphereIndicator += "|" + south;
                }
            }

            //add east
            if (north == "" & south == "")
            {
                HemisphereIndicator += east;
            }
            else
            {
                if (east != "")
                {
                    HemisphereIndicator += "|" + east;
                }
            }

            //add west
            if (north == "" & south == "" & east == "")
            {
                HemisphereIndicator += west;
            }
            else
            {
                if (west != "")
                {
                    HemisphereIndicator += "|" + west;
                }
            }

            //add remaining bits if not empty
            if (HemisphereIndicator != "")
            {
                HemisphereIndicator = "(" + HemisphereIndicator + ")?";
            }

            ArrayList customPatterns = new ArrayList();

            //create custom patterns based on the specified user's input
            string[] ptrn;

            //Custom variation of DD.DDD
            ptrn = new string[2];
            ptrn[0] = "Custom variation of DD.DDD";
            ptrn[1] = 
                CaseInsensitive + "(^" +
                WhiteSpace + HemisphereIndicator + WhiteSpace +
                "(" +
                "(\\d{1,3}(\\.|\\,)?" + WhiteSpace + degreesymbol + WhiteSpace + "$)|(\\d{1,3}(\\.|\\,)\\d+" + WhiteSpace + degreesymbol + WhiteSpace + "$)" +
                ")" +
                "|(^" + WhiteSpace +
                "(" +
                "(\\d{1,3}(\\.|\\,)?" + WhiteSpace + degreesymbol + WhiteSpace + ")|(\\d{1,3}(\\.|\\,)\\d+" + WhiteSpace + degreesymbol + WhiteSpace + ")" +
                ")" +
                HemisphereIndicator + WhiteSpace + "$" +
                "))"
                ;
            customPatterns.Add(ptrn);

            //Custom variation of DD:MM.MMM
            ptrn = new string[2];
            ptrn[0] = "Custom variation of DD:MM.MMM";
            ptrn[1] = 
                CaseInsensitive + "(^" +
                WhiteSpace + HemisphereIndicator + WhiteSpace +
                "(" +
                "(\\d{1,3}" + WhiteSpace + degreesymbol + WhiteSpace + "$)|(\\d{1,3}" + WhiteSpace + degreesymbol + WhiteSpace + "\\d{1,2}(\\.|\\,)?" + WhiteSpace + minutesymbol + WhiteSpace + "$)|(\\d{1,3}" + WhiteSpace + degreesymbol + WhiteSpace + "\\d{1,2}(\\.|\\,)\\d+" + WhiteSpace + minutesymbol + WhiteSpace + "$)" +
                ")" +
                "|(^" + WhiteSpace +
                "(" +
                "(\\d{1,3}" + WhiteSpace + degreesymbol + WhiteSpace + ")|(\\d{1,3}" + WhiteSpace + degreesymbol + WhiteSpace + "\\d{1,2}(\\.|\\,)?" + WhiteSpace + minutesymbol + WhiteSpace + ")|(\\d{1,3}" + WhiteSpace + degreesymbol + WhiteSpace + "\\d{1,2}(\\.|\\,)\\d+" + WhiteSpace + minutesymbol + WhiteSpace + ")" +
                ")" +
                HemisphereIndicator + WhiteSpace + "$" +
                "))"
                ;
            customPatterns.Add(ptrn);
            
            //Custom variation of DD:MM:SS.SSS
            ptrn = new string[2];
            ptrn[0] = "Custom variation of DD:MM:SS.SSS";
            ptrn[1] =
                CaseInsensitive + "(^" +
                WhiteSpace + HemisphereIndicator + WhiteSpace +
                "(" +
                "(\\d{1,3}" + WhiteSpace + degreesymbol + WhiteSpace + "$)|(\\d{1,3}" + WhiteSpace + degreesymbol + WhiteSpace + "\\d{1,2}" + WhiteSpace + minutesymbol + WhiteSpace + "$)|(\\d{1,3}" + WhiteSpace + degreesymbol + WhiteSpace + "\\d{1,2}" + WhiteSpace + minutesymbol + WhiteSpace + "\\d{1,2}(\\.|\\,)?" + WhiteSpace + secondsymbol + WhiteSpace + "$)|(\\d{1,3}" + WhiteSpace + degreesymbol + WhiteSpace + "\\d{1,2}" + WhiteSpace + minutesymbol + WhiteSpace + "\\d{1,2}(\\.|\\,)\\d+" + WhiteSpace + secondsymbol + WhiteSpace + "$)" +
                ")" +
                "|(^" + WhiteSpace +
                "(" +
                "(\\d{1,3}" + WhiteSpace + degreesymbol + WhiteSpace + ")|(\\d{1,3}" + WhiteSpace + degreesymbol + WhiteSpace + "\\d{1,2}" + WhiteSpace + minutesymbol + WhiteSpace + ")|(\\d{1,3}" + WhiteSpace + degreesymbol + WhiteSpace + "\\d{1,2}" + WhiteSpace + minutesymbol + WhiteSpace + "\\d{1,2}(\\.|\\,)?" + WhiteSpace + secondsymbol + WhiteSpace + ")|(\\d{1,3}" + WhiteSpace + degreesymbol + WhiteSpace + "\\d{1,2}" + WhiteSpace + minutesymbol + WhiteSpace + "\\d{1,2}(\\.|\\,)\\d+" + WhiteSpace + secondsymbol + WhiteSpace + ")" +
                ")" +
                HemisphereIndicator + WhiteSpace + "$" +
                "))"
                ;
            customPatterns.Add(ptrn);
            
            //check if the default patterns are to be used
            if (patternIn.DisableDefaultPatterns)
            {
                patterns = customPatterns;
            }
            else //if all patterns are to be used check which set has the matching priority
            {

                //check if the custom patterns are to have priority over the default ones
                if (patternIn.PriorityOverDefaultPatterns)
                {

                    //add default patterns to the custom patterns
                    for (int i = 0; i < patterns.Count; i++)
                    {
                        customPatterns.Add(patterns[i]);

                    }

                    //swap array lists
                    patterns = customPatterns;

                }
                else
                {
                    //add custom patterns to the default patterns
                    for (int i = 0; i < customPatterns.Count; i++)
                    {
                        patterns.Add(customPatterns[i]);

                    }
                }
            }
        }
    }


/*
 * TODO:
 * clientside pattern matching for single coords
*/