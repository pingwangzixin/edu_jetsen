;(function() {
 
/*
 * Natural Sort algorithm for Javascript - Version 0.7 - Released under MIT license
 * Author: Jim Palmer (based on chunking idea from Dave Koelle)
 * Contributors: Mike Grier (mgrier.com), Clint Priest, Kyle Adams, guillermo
 * See: http://js-naturalsort.googlecode.com/svn/trunk/naturalSort.js
 */
	jQuery.extend(jQuery.fn.dataTableExt.oSort, {
		"chinese-string-asc" : function(s1, s2) {
			s1= String(s1).replace(/<[\s\S]*?>/g, ""); // 去除html标记
			s1 = s1.replace(/&nbsp;/ig, ""); // 去除空格
			s2 = String(s2).replace(/<[\s\S]*?>/g, ""); // 去除html标记
			s2 = s2.replace(/&nbsp;/ig, "");
			var n = s1.localeCompare(s2,"zh");
			return n;

		},

		"chinese-string-desc" : function(s1, s2) {
			s1= String(s1).replace(/<[\s\S]*?>/g, ""); // 去除html标记
			s1 = s1.replace(/&nbsp;/ig, ""); // 去除空格
			s2 = String(s2).replace(/<[\s\S]*?>/g, ""); // 去除html标记
			s2 = s2.replace(/&nbsp;/ig, "");
			var n = s1.localeCompare(s2);
			return s2.localeCompare(s1,"zh");
		}
	});
function naturalSort (a, b, html) {
    var re = /(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi,
        sre = /(^[ ]*|[ ]*$)/g,
        dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
        hre = /^0x[0-9a-f]+$/i,
        ore = /^0/,
        htmre = /(<([^>]+)>)/ig,
        // convert all to strings and trim()
        x = a.toString().replace(sre, '') || '',
        y = b.toString().replace(sre, '') || '';
        // remove html from strings if desired
        if (!html) {
            x = x.replace(htmre, '');
            y = y.replace(htmre, '');
        }
        // chunk/tokenize
    var xN = x.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
        yN = y.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
        // numeric, hex or date detection
        xD = parseInt(x.match(hre), 10) || (xN.length !== 1 && x.match(dre) && Date.parse(x)),
        yD = parseInt(y.match(hre), 10) || xD && y.match(dre) && Date.parse(y) || null;
 
    // first try and sort Hex codes or Dates
    if (yD) {
        if ( xD < yD ) {
            return -1;
        }
        else if ( xD > yD ) {
            return 1;
        }
    }
 
    // natural sorting through split numeric strings and default strings
    for(var cLoc=0, numS=Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {
        // find floats not starting with '0', string or 0 if not defined (Clint Priest)
        var oFxNcL = !(xN[cLoc] || '').match(ore) && parseFloat(xN[cLoc], 10) || xN[cLoc] || 0;
        var oFyNcL = !(yN[cLoc] || '').match(ore) && parseFloat(yN[cLoc], 10) || yN[cLoc] || 0;
        // handle numeric vs string comparison - number < string - (Kyle Adams)
        if (isNaN(oFxNcL) !== isNaN(oFyNcL)) {
            return (isNaN(oFxNcL)) ? 1 : -1;
        }
        // rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
        else if (typeof oFxNcL !== typeof oFyNcL) {
            oFxNcL += '';
            oFyNcL += '';
        }
        if (oFxNcL < oFyNcL) {
            return -1;
        }
        if (oFxNcL > oFyNcL) {
            return 1;
        }
    }
    return 0;
}
 
jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "natural-asc": function ( a, b ) {
    	if(a==='缺考'){
    		a=-999999999;
    	}
    	
    	if(b==='缺考'){
    		b=-999999999;
    	}
    	
    	if(a==='未录入'){
    		a=999999999;
    	}	    	
    	if(b==='未录入'){
    		b=999999999;
    	}
    	
        return naturalSort(a,b,true);
    },
 
    "natural-desc": function ( a, b ) {
    	if(a==='缺考'){
    		a=-999999998;
    	}
    	if(b==='缺考'){
    		b=-999999998;
    	}
    	
    	if(a==='未录入'){
    		a=-999999999;
    	}
    	
    	if(b==='未录入'){
    		b=-999999999;
    	}
        return naturalSort(a,b,true) * -1;
    },
 
    "natural-nohtml-asc": function( a, b ) {
        return naturalSort(a,b,false);
    },
 
    "natural-nohtml-desc": function( a, b ) {
        return naturalSort(a,b,false) * -1;
    }
} );
 
}());