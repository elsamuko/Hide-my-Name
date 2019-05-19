
// parameters
var withMathematicalUnicodes = true;
var withFullwidthUnicodes = true;
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

    console.log(filtered);

    var graphed = Array.prototype.map.call(ascii, function (char) {

        var graph = filtered[char];
        var selection = document.getElementById("selector-chance").value;

        // 1/3 chance to replace original character (do this per default)
        var maybe = Math.random() < chance;

        if (selection == "2") {
            maybe = true; // optionally, replace letters always
        }

        if (graph && graph.length > 0 && maybe) {
            return graph[Math.floor(Math.random() * graph.length)];
            // return '<font color="red">' + char + graph.join('') + "</font>";
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
