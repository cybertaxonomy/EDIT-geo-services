/*
**  jquery.browser.js -- jQuery plugin for enhanced browser detection
**  Copyright (c) 2007 Ralf S. Engelschall <rse@engelschall.com> 
**  Licensed under GPL <http://www.gnu.org/licenses/gpl.txt>
**
**  $LastChangedDate: 2007-04-01 11:17:31 +0200 (Sun, 01 Apr 2007) $
**  $LastChangedRevision: 23 $
*/

/*
 *  Engine:  Gecko     IE       Opera   WebKit/KHTML  OmniWeb  CAB
 *  ------------------------------------------------------------------
 *  Product: Firefox   IE 7.0   Opera   Safari        OmniWeb  iCab
 *           SeaMonkey IE 6.0           Konqueror 
 *           Camino   
 *  ------------------------------------------------------------------
 *  System:  Windows   Windows  Windows MacOSX        MacOSX   MacOSX
 *           Unix               Unix    Unix
 *           MacOSX
 */

(function($) {
    /* the jQuery internal variables holding the browser information */
    $.browser.product$ = "NN";  /* product */
    $.browser.version$ = 0.0;   /* version */
    $.browser.engine$  = "NN";  /* underlying rendering engine */
    $.browser.system$  = "NN";  /* underlying operating system */

    /* the browser determination specification data structure */
    $.browser.product_spec$ = [
        {   /* OmniGroup OmniWeb */
            Name:       [ navigator.userAgent,  "(OmniWeb)"              ],
            Version:    [ navigator.appVersion, "OmniWeb/(\d+\.\d+)"     ],
            Engine:     "OmniWeb"
        },
        {   /* Apple Safari */
            Name:       [ navigator.vendor,     "AppleWebKit", "Safari"  ],
            Version:    [ navigator.appVersion, "Safari/(\d+\.\d+)"      ],
            Engine:     "KHTML/WebKit"
        },
        {   /* Opera */
            Name:       [ window.opera,         null, "Opera"            ],
            Version:    [ navigator.appVersion, "Opera\s+(\d+\.\d+)"     ],
            Engine:     "Opera"
        },
        {   /* iCab */
            Name:       [ navigator.vendor,     "(iCab)"                 ],
            Version:    [ navigator.appVersion, "iCab\s+(\d+\.\d+)"      ],
            Engine:     "CAB"
        },
        {   /* Konqueror */
            Name:       [ navigator.vendor,     "KDE", "Konqueror"       ],
            Version:    [ navigator.appVersion, "Konqueror/(\d+\.\d+)"   ],
            Engine:     "KHTML"
        },
        {   /* Mozilla Firefox */
            Name:       [ navigator.userAgent,  "(Firefox)"              ],
            Version:    [ navigator.appVersion, "Firefox/(\d+\.\d+)"     ],
            Engine:     "Gecko"
        },
        {   /* Camino */
            Name:       [ navigator.vendor,     "(Camino)"               ],
            Version:    [ navigator.appVersion, "Camino/(\d+\.\d+)"      ],
            Engine:     "Gecko"
        },
        {   /* AOL Netscape */
            Name:       [ navigator.userAgent,  "(Netscape)"             ],
            Version:    [ navigator.appVersion, "Netscape/(\d+\.\d+)"    ],
            Engine:     "Gecko"
        },
        {   /* Microsoft Internet Explorer */
            Name:       [ navigator.userAgent,  "(MSIE)"                 ],
            Version:    [ navigator.appVersion, "MSIE\s+(\d+\.\d+)"      ],
            Engine:     "MSIE"
        },
        {   /* Mozilla SeaMonkey */
            Name:       [ navigator.userAgent,  "Gecko", "SeaMonkey"     ],
            Version:    [ navigator.appVersion, "rv:(\d+\.\d+)"          ],
            Engine:     "Gecko"
        },
    ];

    /* the system determination specification data structure */
    $.browser.system_spec$ = [
        /* Windows */
        [ navigator.userAgent,  "(Windows|Win32|Win64)" ],
        /* MacOSX */
        [ navigator.userAgent,  "(Macintosh|Darwin|Apple)", "MacOSX" ],
        /* Unix */
        [ navigator.userAgent,  "(BSD|Linux|SunOS|IRIX|Unix)", "Unix" ]
    ];

    /* driver for the browser determination specification data structure */
    for (var i = 0; i < $.browser.product_spec$.length; i++) {
        var str = $.browser.product_spec$[i].Name[0];
        if ($.browser.product_spec$[i].Name[1] === null)
            var found = (typeof str !== "undefined");
        else {
            var regex = RegExp(".*" + $.browser.product_spec$[i].Name[1] + ".*");
            var subst = (typeof $.browser.product_spec$[i].Name[2] !== "undefined" ?
                         $.browser.product_spec$[i].Name[2] : "$1");
            var name = str.replace(regex, subst);
            var found = (name !== null && name != str);
        }
        if (found) {
            $.browser.product$ = name;
            $.browser.engine$ = $.browser.product_spec$[i].Engine;
            var str = $.browser.product_spec$[i].Version[0];
            var regex = RegExp(".*" + $.browser.product_spec$[i].Version[1] + ".*");
            var subst = (typeof $.browser.product_spec$[i].Version[2] !== "undefined" ?
                         $.browser.product_spec$[i].Version[2] : "$1");
            var version = str.replace(regex, subst);
            if (version !== null && version != str)
                $.browser.version$ = version;
            break;
        }
    }

    /* driver for the system determination specification data structure */
    for (var i = 0; i < $.browser.system_spec$.length; i++) {
        var str = $.browser.system_spec$[i][0];
        var regex = RegExp(".*" + $.browser.system_spec$[i][1] + ".*");
        var subst = (typeof $.browser.system_spec$[i][2] !== "undefined" ? 
                     $.browser.system_spec$[i][2] : "$1");
        var system = str.replace(regex, subst);
        if (system !== null && system != str) {
            $.browser.system$ = system;
            break;
        }
    }

    /* information access methods */
    $.browser.product = function (match) {
        if (typeof match !== "undefined")
            return ($.browser.product$ == match);
        else
            return $.browser.product$;
    };
    $.browser.version = function (match) {
        if (typeof match !== "undefined")
            return ($.browser.version$ == match);
        else
            return $.browser.version$;
    };
    $.browser.engine = function (match) {
        if (typeof match !== "undefined")
            return ($.browser.engine$ == match);
        else
            return $.browser.engine$;
    };
    $.browser.system = function (match) {
        if (typeof match !== "undefined")
            return ($.browser.system$ == match);
        else
            return $.browser.system$;
    };

})(jQuery);

