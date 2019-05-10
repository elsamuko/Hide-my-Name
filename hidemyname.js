
// https://en.wikipedia.org/wiki/IDN_homograph_attack
// http://shapecatcher.com
var homographs = {
    'a' : ['\u0430',    // а CYRILLIC SMALL LETTER A
           '\u{1d5ba}'],// 𝖺 Mathematical sans-serif small a
    'b' : ['\u{1d5bb}'],// 𝖻 Mathematical sans-serif small b
    'c' : ['\u0441',    // с CYRILLIC SMALL LETTER ES
           '\u03f2',    // ϲ Greek lunate sigma symbol
           '\u{1d5bc}'],// 𝖼 Mathematical sans-serif small c
    'd' : ['\u{1d5bd}', // 𝖽 Mathematical sans-serif small d
           '\u217e'],   // ⅾ Small roman numeral five hundred
    'e' : ['\u0435',    // е CYRILLIC SMALL LETTER IE
           '\u{1d5be}'],// 𝖾 Mathematical sans-serif small e
    'f' : ['\u{1d5bf}'],// 𝖿 Mathematical sans-serif small f
    'g' : ['\u{1d5c0}', // 𝗀 Mathematical sans-serif small g
           '\u0581'],   // ց Armenian small letter co
        // '\u0261'],   // ɡ LATIN SMALL LETTER SCRIPT G
    'h' : ['\u0570',    // հ Armenian small letter ho
           '\u{1d5c1}'],// 𝗁 Mathematical sans-serif small h
        // '\u04bb'],   // һ CYRILLIC SMALL LETTER SHHA
    'i' : ['\u0456',    // і CYRILLIC SMALL LETTER BYELORUSSIAN-UKRAINIAN I
           '\u{1d5c2}', // 𝗂 Mathematical sans-serif small i
           '\u2170'],   // ⅰ Small roman numeral one
    'j' : ['\u0458',    // ј CYRILLIC SMALL LETTER JE
           '\u03f3',    // ϳ Greek letter yot
           '\u{1d5c3}'],// 𝗃 Mathematical sans-serif small j
    'k' : ['\u{1d5c4}'],// 𝗄 Mathematical sans-serif small k
    'l' : ['\u0049',    // I LATIN CAPITAL LETTER I
           '\u0196'],   // Ɩ Latin capital letter iota
    'm' : ['\u217f'],   // SMALL ROMAN NUMERAL ONE THOUSAND
    'n' : [],
    'o' : ['\u043e',    // CYRILLIC SMALL LETTER O
           '\u03bf'],   // GREEK SMALL LETTER OMICRON
    'p' : ['\u0440'],   // CYRILLIC SMALL LETTER ER
    'q' : [], // ['\u051b'], // CYRILLIC SMALL LETTER QA
    'r' : [],
    's' : ['\u0455'],   // CYRILLIC SMALL LETTER DZE
    't' : [],
    'u' : [], // ['\u057d'], // ARMENIAN SMALL LETTER SEH
    'v' : [],
    'w' : [], // ['\u051d'], // CYRILLIC SMALL LETTER WE
    'x' : ['\u0445'],   // CYRILLIC SMALL LETTER HA
    'y' : [], // ['\u04af'], // CYRILLIC SMALL LETTER STRAIGHT U
    'z' : [], // ['\u1d22'], // LATIN LETTER SMALL CAPITAL Z

    'A' : ['\u0410'],   // CYRILLIC CAPITAL LETTER A
    'B' : ['\u0412'],   // CYRILLIC CAPITAL LETTER VE
    'C' : ['\u0421'],   // CYRILLIC CAPITAL LETTER ES
    'D' : [],
    'E' : ['\u0415'],   // CYRILLIC CAPITAL LETTER IE
    'F' : [],
    'G' : [],
    'H' : ['\u041d'],   // CYRILLIC CAPITAL LETTER EN
    'I' : ['\u0406',    // CYRILLIC CAPITAL LETTER BYELORUSSIAN-UKRAINIAN I
            '\u04c0'],  // CYRILLIC LETTER PALOCHKA
    'J' : ['\u0408'],   // CYRILLIC CAPITAL LETTER JE
    'K' : ['\u041a'],   // CYRILLIC CAPITAL LETTER KA
    'L' : ['\u216c',    // ROMAN NUMERAL FIFTY
           '\u14aa'],   // CANADIAN SYLLABICS MA
    'M' : ['\u041c'],   // CYRILLIC CAPITAL LETTER EM
    'N' : [],
    'O' : ['\u041e',    // CYRILLIC CAPITAL LETTER O
           '\u039f'],   // GREEK CAPITAL LETTER OMICRON
    'P' : ['\u0420'],   // CYRILLIC CAPITAL LETTER ER
    'Q' : [], // ['\u051a'], // CYRILLIC CAPITAL LETTER QA
    'R' : [],
    'S' : ['\u0405'],   // CYRILLIC CAPITAL LETTER DZE
    'T' : ['\u0422'],   // CYRILLIC CAPITAL LETTER TE
    'U' : [],
    'V' : [],
    'W' : [], // ['\u051c'], // CYRILLIC CAPITAL LETTER WE
    'X' : ['\u0425'],   // CYRILLIC CAPITAL LETTER HA
    'Y' : ['\u04ae'],   // CYRILLIC CAPITAL LETTER STRAIGHT U
    'Z' : [],
    // ' ' : ['\u00a0',    //▕ ▏no-break space
    //        '\u2007']    //▕ ▏figure space
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

function toFiveHex(number) {
    var hex = number.toString(16);
    var padded = "0".repeat(5 - hex.length) + hex;
    return padded;
}

// bash-escape string
// via https://stackoverflow.com/a/10937446
function toUnicodeLiteral(str) {
    var result = "";

    for(var i = 0; i < str.length; ++i) {
        var cp = str.codePointAt(i);

        if(cp > 65535) {
            ++i; // 5 digit unicodes have length 2
            result += "\\U" + toFiveHex(cp);
        } else if(cp > 126 || cp < 32) {
            result += "\\u" + toFourHex(cp);
        } else {
            result += str[i];
        }
    }

    return result;
}

function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

function setTextEscaped(id,text) {
    document.getElementById(id).innerHTML = escapeHtml(text);
    document.getElementById(id + "parent").style.display = "block";
}
function setText(id,text) {
    document.getElementById(id).innerHTML = text;
    document.getElementById(id + "parent").style.display = "block";
}
function clearText(id) { 
    document.getElementById(id).innerHTML = "";
    document.getElementById(id + "parent").style.display = "none";
}

function hide() {
    var ascii   = document.getElementById("name").value;
    var graphed = hideMyName(ascii);
    if( ascii !== graphed ) {
        setTextEscaped("result", graphed);
        setTextEscaped("literal", "echo -e \"" + toUnicodeLiteral(graphed) + "\"");
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
