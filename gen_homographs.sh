#!/usr/bin/env bash

mkdir -p /tmp/unicodes

function getDescription {
    if [ ! -f "/tmp/unicodes/$1" ]; then
        local URL="https://unicode.org/cldr/utility/character.jsp?a=$1"
        lynx --dump "$URL" > "/tmp/unicodes/$1"
    fi
    sed '12q;d' "/tmp/unicodes/$1" | awk '{$1=$1};1'
}

KEYS=( "a" "b" "c" "d" "e" "f" "g" "h" "i" "j" "k" "l" "m" "n" "o" "p" "q" "r" "s" "t" "u" "v" "w" "x" "y" "z"
       "A" "B" "C" "D" "E" "F" "G" "H" "I" "J" "K" "L" "M" "N" "O" "P" "Q" "R" "S" "T" "U" "V" "W" "X" "Y" "Z" " " )

declare -A ALPHABET
ALPHABET['a']="1d5ba 0430"
ALPHABET['b']="1d5bb"
ALPHABET['c']="1d5bc 0441 03f2"
ALPHABET['d']="1d5bd 217e"
ALPHABET['e']="1d5be 0435"
ALPHABET['f']="1d5bf"
ALPHABET['g']="1d5c0 0581 0261"
ALPHABET['h']="1d5c1 0570" # 04bb
ALPHABET['i']="1d5c2 0456" # 2170
ALPHABET['j']="1d5c3 0458 03f3"
ALPHABET['k']="1d5c4"
ALPHABET['l']="1d5c5 0049 0196"
ALPHABET['m']="1d5c6 217f"
ALPHABET['n']="1d5c7 0578"
ALPHABET['o']="1d5c8 043e 03bf 0585"
ALPHABET['p']="1d5c9 0440"
ALPHABET['q']="1d5ca 051b"
ALPHABET['r']="1d5cb"
ALPHABET['s']="1d5cc 0455"
ALPHABET['t']="1d5cd"
ALPHABET['u']="1d5ce 057d"
ALPHABET['v']="1d5cf 2174 1d20"
ALPHABET['w']="1d5d0 051d"
ALPHABET['x']="1d5d1 0445 2179"
ALPHABET['y']="1d5d2 04af"
ALPHABET['z']="1d5d3 1d22"

ALPHABET['A']="1d5a0 ff21 0410 0391 10300"
ALPHABET['B']="1d5a1 ff22 0412"
ALPHABET['C']="1d5a2 ff23 0421"
ALPHABET['D']="1d5a3 ff24 216e"
ALPHABET['E']="1d5a4 ff25 0415"
ALPHABET['F']="1d5a5 ff26 a4dd"
ALPHABET['G']="1d5a6 ff27 a4d6"
ALPHABET['H']="1d5a7 ff28 041d"
ALPHABET['I']="1d5a8 ff29 0406 04c0"
ALPHABET['J']="1d5a9 ff2a 0408"
ALPHABET['K']="1d5aa ff2b 041a"
ALPHABET['L']="1d5ab ff2c 216c 14aa"
ALPHABET['M']="1d5ac ff2d 041c"
ALPHABET['N']="1d5ad ff2e 039d"
ALPHABET['O']="1d5ae ff2f 041e 039f"
ALPHABET['P']="1d5af ff30 0420"
ALPHABET['Q']="1d5b0 ff31 051a"
ALPHABET['R']="1d5b1 ff32 a4e3 1D216"
ALPHABET['S']="1d5b2 ff33 0405"
ALPHABET['T']="1d5b3 ff34 0422"
ALPHABET['U']="1d5b4 ff35 144c 054D"
ALPHABET['V']="1d5b5 ff36 142f"
ALPHABET['W']="1d5b6 ff37 051c"
ALPHABET['X']="1d5b7 ff38 0425"
ALPHABET['Y']="1d5b8 ff39 04ae"
ALPHABET['Z']="1d5b9 ff3a"

ALPHABET[' ']="00a0 2004 2005 2006 2008 2009 205F"

echo "// https://en.wikipedia.org/wiki/IDN_homograph_attack"
echo "// https://unicode.org/cldr/utility/character.jsp"
echo "// http://shapecatcher.com"
echo
echo "var homographs = {"

for LETTER in "${KEYS[@]}"; do
    VALS="${ALPHABET[$LETTER]}"
    if [ -z "$VALS" ]; then continue; fi
    echo -n "  '$LETTER' : ["
    FIRST=$(echo "$VALS" | awk '{print $1}')
    LAST=$(echo "$VALS" | awk '{print $NF}')
    for VAL in $VALS; do
        DESCRIPTION=$(getDescription "$VAL")
        STARTING=""
        CLOSING="   "
        COMMA=","
        if [ $VAL != $FIRST ]; then echo -ne "\n         "; fi
        if [ $VAL == $LAST ]; then COMMA=""; CLOSING="],  "; fi
        case ${#VAL} in
        4) echo -n " '\\u$VAL'$COMMA   "
           echo -ne " $CLOSING// \u$VAL $DESCRIPTION"
           ;;
        5) echo -n " '\\u{$VAL}'$COMMA"
           echo -ne " $CLOSING// \U$VAL $DESCRIPTION"
           ;;
        esac
    done
    echo
done

echo "};"
