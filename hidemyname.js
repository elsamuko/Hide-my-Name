
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
