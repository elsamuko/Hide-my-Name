
// https://en.wikipedia.org/wiki/IDN_homograph_attack
// http://shapecatcher.com
var homographs = {
    'a' : ['\u0430'], // CYRILLIC SMALL LETTER A
    'b' : [],
    'c' : ['\u0441'], // CYRILLIC SMALL LETTER ES
    'd' : [],
    'e' : ['\u0435'], // CYRILLIC SMALL LETTER IE
    'f' : [],
    'g' : [], // ['\u0261'], // LATIN SMALL LETTER SCRIPT G
    'h' : [], // ['\u04bb'], // CYRILLIC SMALL LETTER SHHA
    'i' : ['\u0456'], // CYRILLIC SMALL LETTER BYELORUSSIAN-UKRAINIAN I
    'j' : ['\u0458'], // CYRILLIC SMALL LETTER JE
    'k' : [],
    'l' : [],
    'm' : [], // ['\u217f'], // SMALL ROMAN NUMERAL ONE THOUSAND
    'n' : [],
    'o' : ['\u043e','\u03bf'], // CYRILLIC SMALL LETTER O, GREEK SMALL LETTER OMICRON
    'p' : ['\u0440'], // CYRILLIC SMALL LETTER ER
    'q' : [], // ['\u051b'], // CYRILLIC SMALL LETTER QA
    'r' : [],
    's' : ['\u0455'], // CYRILLIC SMALL LETTER DZE
    't' : [],
    'u' : [], // ['\u057d'], // ARMENIAN SMALL LETTER SEH
    'v' : [],
    'w' : [], // ['\u051d'], // CYRILLIC SMALL LETTER WE
    'x' : ['\u0445'], // CYRILLIC SMALL LETTER HA
    'y' : [], // ['\u04af'], // CYRILLIC SMALL LETTER STRAIGHT U
    'z' : [], // ['\u1d22'], // LATIN LETTER SMALL CAPITAL Z

    'A' : ['\u0410'], // CYRILLIC CAPITAL LETTER A
    'B' : ['\u0412'], // CYRILLIC CAPITAL LETTER VE
    'C' : ['\u0421'], // CYRILLIC CAPITAL LETTER ES
    'D' : [],
    'E' : ['\u0415'], // CYRILLIC CAPITAL LETTER IE
    'F' : [],
    'G' : [],
    'H' : ['\u041d'], // CYRILLIC CAPITAL LETTER EN
    'I' : ['\u0406', '\u04c0'], // CYRILLIC CAPITAL LETTER BYELORUSSIAN-UKRAINIAN I, CYRILLIC LETTER PALOCHKA
    'J' : ['\u0408'], // CYRILLIC CAPITAL LETTER JE
    'K' : ['\u041a'], // CYRILLIC CAPITAL LETTER KA
    'L' : ['\u216c', '\u14aa'], // ROMAN NUMERAL FIFTY, CANADIAN SYLLABICS MA
    'M' : ['\u041c'], // CYRILLIC CAPITAL LETTER EM
    'N' : [],
    'O' : ['\u041e', '\u039f'], // CYRILLIC CAPITAL LETTER O, GREEK CAPITAL LETTER OMICRON
    'P' : ['\u0420'], // CYRILLIC CAPITAL LETTER ER
    'Q' : [], // ['\u051a'], // CYRILLIC CAPITAL LETTER QA
    'R' : [],
    'S' : ['\u0405'], // CYRILLIC CAPITAL LETTER DZE
    'T' : ['\u0422'], // CYRILLIC CAPITAL LETTER TE
    'U' : [],
    'V' : [],
    'W' : [], // ['\u051c'], // CYRILLIC CAPITAL LETTER WE
    'X' : ['\u0425'], // CYRILLIC CAPITAL LETTER HA
    'Y' : ['\u04ae'], // CYRILLIC CAPITAL LETTER STRAIGHT U
    'Z' : [],
};

function hideMyName(ascii) {
    var graphed = Array.prototype.map.call(ascii, function(char) {

        var graph = homographs[char];

        if(graph && graph.length > 0) {
            return graph[0];
        } else {
            return char;
        }
    }).join('');
    return graphed;
}

function toFourHex(number) {
    var hex = number.toString(16);
    var padded = "0".repeat(4 - hex.length) + hex;
    return padded;
}

// via https://stackoverflow.com/a/10937446
function toUnicodeLiteral(str) {
    var result = "";

    for(var i = 0; i < str.length; ++i) {
        var char = str.charCodeAt(i);

        if(char > 126 || char < 32) {
            result += "\\u" + toFourHex(char);
        } else {
            result += str[i];
        }
    }

    return result;
}

function setText(id,text) { document.getElementById(id).innerHTML = text; }
function clearText(id) { document.getElementById(id).innerHTML = "" }

function hide() {
    var ascii   = document.getElementById("name").value;
    var graphed = hideMyName(ascii);
    if( ascii !== graphed ) {
        setText("result", graphed);
        setText("literal", "echo -e \"" + toUnicodeLiteral(graphed) + "\"");
        clearText("error");
    } else {
        clearText("result");
        clearText("literal");
        var message = "Sorry, could not find any homographs for [" + ascii + "]";
        setText("error", message);
    }
}

function demo() {
    var lower = "the quick brown fox jumps over the lazy dog";
    var upper = "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG";
    var graphedLower = hideMyName(lower);
    var graphedUpper = hideMyName(upper);
    setText("result", lower + "<br>" + upper + "<br>" + graphedLower + "<br>" + graphedUpper );
    setText("literal", "echo -e \"" + toUnicodeLiteral(graphedLower) + "\\n" + toUnicodeLiteral(graphedUpper) + "\"");
    clearText("error");
}
