
// parameters
var withMathematicalUnicodes = false;
var withFullwidthUnicodes = false;
var withZeroWidthSpace = true;
var withSpaces = true;
var chance = 0.333;

var aMat = 0x1d5ba;
var zMat = 0x1d5d3;
var AMat = 0x1d5a0;
var ZMat = 0x1d5b9;
var zeroMat = 0x1d7e2;
var nineMat = 0x1d7eb;
var aFullwidth = 0xff41;
var zFullwidth = 0xff5a;
var AFullwidth = 0xff21;
var ZFullwidth = 0xff3a;

function isMathematicalUnicode(str) {
    var cp = str.codePointAt(0);

    if (cp >= aMat && cp <= zMat) {
        return true;
    }
    if (cp >= AMat && cp <= ZMat) {
        return true;
    }
    if (cp >= zeroMat && cp <= nineMat) {
        return true;
    }

    return false;
}

function isFullwidthUnicode(str) {
    var cp = str.codePointAt(0);

    if (cp >= aFullwidth && cp <= zFullwidth) {
        return true;
    }
    if (cp >= AFullwidth && cp <= ZFullwidth) {
        return true;
    }

    return false;
}

function hideMyName(ascii) {

    var filtered = {};

    Object.keys(homographs).forEach(key => {
        filtered[key] = [];

        for (let char of homographs[key]) {
            var cond1 = !withMathematicalUnicodes && isMathematicalUnicode(char);
            var cond2 = !withFullwidthUnicodes && isFullwidthUnicode(char);

            if (!(cond1 || cond2)) {
                filtered[key].push(char);
            }
        }
    });

    // insert ZERO WIDTH SPACE at random position
    if (withZeroWidthSpace) {
        var pos = Math.floor(Math.random() * ascii.length)
        ascii = ascii.substr(0, pos) + '\u200b' + ascii.substr(pos);
    }

    var graphed = Array.prototype.map.call(ascii, function (char) {

        var graphs = filtered[char];

        // x chance to replace original character
        var maybe = Math.random() < chance;

        if (graphs && graphs.length > 0 && maybe) {
            return graphs[Math.floor(Math.random() * graphs.length)];
            // return '<font color="red">' + char + graphs.join('') + "</font>";
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

    for (var i = 0; i < str.length; ++i) {
        var cp = str.codePointAt(i);

        if (cp > 65535) {
            ++i; // 5 digit unicodes have length 2
            result += "\\U000" + toFiveHex(cp);
        } else if (cp > 126 || cp < 32) {
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

function setTextEscaped(id, text) {
    document.getElementById(id).innerHTML = escapeHtml(text);
    document.getElementById(id + "parent").style.display = "block";
}
function setText(id, text) {
    document.getElementById(id).innerHTML = text;
    document.getElementById(id + "parent").style.display = "block";
}
function clearText(id) {
    document.getElementById(id).innerHTML = "";
    document.getElementById(id + "parent").style.display = "none";
}

function hide() {
    var ascii = document.getElementById("name").value;
    var graphed = hideMyName(ascii);
    if (ascii !== graphed) {
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

function toggleChance() {
    if (chance == 1) {
        chance = 0.333;
    } else {
        chance = 1;
    }
    console.log(`chance set to ${chance}`);
    return chance;
}

function toggleWithMathematicalUnicodes() {
    withMathematicalUnicodes = !withMathematicalUnicodes;
    console.log(`withMathematicalUnicodes set to ${withMathematicalUnicodes}`);
    return withMathematicalUnicodes;
}

function toggleWithFullwidthUnicodes() {
    withFullwidthUnicodes = !withFullwidthUnicodes;
    console.log(`withFullwidthUnicodes set to ${withFullwidthUnicodes}`);
    return withFullwidthUnicodes;
}

function toggleWithZeroWidthSpace() {
    withZeroWidthSpace = !withZeroWidthSpace;
    console.log(`withZeroWidthSpace set to ${withZeroWidthSpace}`);
    return withZeroWidthSpace;
}

function demo() {
    var lower = "the quick brown fox jumps over the lazy dog";
    var upper = "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG";
    var number = "0123456789";
    var graphedLower = hideMyName(lower);
    var graphedUpper = hideMyName(upper);
    var graphedNumber = hideMyName(number);
    setText("result", lower + "<br>" + upper + "<br>" + number + "<br>" +
        graphedLower + "<br>" + graphedUpper + "<br>" + graphedNumber);
    setText("literal", "echo -e \"" + toUnicodeLiteral(graphedLower) + "\\n"
        + toUnicodeLiteral(graphedUpper) + "\\n"
        + toUnicodeLiteral(graphedNumber) + "\"");
    clearText("error");
}
