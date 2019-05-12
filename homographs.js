// https://en.wikipedia.org/wiki/IDN_homograph_attack
// https://unicode.org/cldr/utility/character.jsp
// http://shapecatcher.com

var homographs = {
  'a' : [ '\u{1d5ba}',    // 𝖺 MATHEMATICAL SANS-SERIF SMALL A
          '\uff41',       // ａ FULLWIDTH LATIN SMALL LETTER A
          '\u0430'    ],  // а CYRILLIC SMALL LETTER A
  'b' : [ '\u{1d5bb}',    // 𝖻 MATHEMATICAL SANS-SERIF SMALL B
          '\uff42'    ],  // ｂ FULLWIDTH LATIN SMALL LETTER B
  'c' : [ '\u{1d5bc}',    // 𝖼 MATHEMATICAL SANS-SERIF SMALL C
          '\uff43',       // ｃ FULLWIDTH LATIN SMALL LETTER C
          '\u0441',       // с CYRILLIC SMALL LETTER ES
          '\u03f2'    ],  // ϲ GREEK LUNATE SIGMA SYMBOL
  'd' : [ '\u{1d5bd}',    // 𝖽 MATHEMATICAL SANS-SERIF SMALL D
          '\uff44',       // ｄ FULLWIDTH LATIN SMALL LETTER D
          '\u217e'    ],  // ⅾ SMALL ROMAN NUMERAL FIVE HUNDRED
  'e' : [ '\u{1d5be}',    // 𝖾 MATHEMATICAL SANS-SERIF SMALL E
          '\uff45',       // ｅ FULLWIDTH LATIN SMALL LETTER E
          '\u0435'    ],  // е CYRILLIC SMALL LETTER IE
  'f' : [ '\u{1d5bf}',    // 𝖿 MATHEMATICAL SANS-SERIF SMALL F
          '\uff46'    ],  // ｆ FULLWIDTH LATIN SMALL LETTER F
  'g' : [ '\u{1d5c0}',    // 𝗀 MATHEMATICAL SANS-SERIF SMALL G
          '\uff47',       // ｇ FULLWIDTH LATIN SMALL LETTER G
          '\u0581',       // ց ARMENIAN SMALL LETTER CO
          '\u0261'    ],  // ɡ LATIN SMALL LETTER SCRIPT G
  'h' : [ '\u{1d5c1}',    // 𝗁 MATHEMATICAL SANS-SERIF SMALL H
          '\uff48',       // ｈ FULLWIDTH LATIN SMALL LETTER H
          '\u0570'    ],  // հ ARMENIAN SMALL LETTER HO
  'i' : [ '\u{1d5c2}',    // 𝗂 MATHEMATICAL SANS-SERIF SMALL I
          '\uff49',       // ｉ FULLWIDTH LATIN SMALL LETTER I
          '\u0456'    ],  // і CYRILLIC SMALL LETTER BYELORUSSIAN-UKRAINIAN I
  'j' : [ '\u{1d5c3}',    // 𝗃 MATHEMATICAL SANS-SERIF SMALL J
          '\uff4a',       // ｊ FULLWIDTH LATIN SMALL LETTER J
          '\u0458',       // ј CYRILLIC SMALL LETTER JE
          '\u03f3'    ],  // ϳ GREEK LETTER YOT
  'k' : [ '\u{1d5c4}',    // 𝗄 MATHEMATICAL SANS-SERIF SMALL K
          '\uff4b'    ],  // ｋ FULLWIDTH LATIN SMALL LETTER K
  'l' : [ '\u{1d5c5}',    // 𝗅 MATHEMATICAL SANS-SERIF SMALL L
          '\uff4c',       // ｌ FULLWIDTH LATIN SMALL LETTER L
          '\u0049',       // I LATIN CAPITAL LETTER I
          '\u0196'    ],  // Ɩ LATIN CAPITAL LETTER IOTA
  'm' : [ '\u{1d5c6}',    // 𝗆 MATHEMATICAL SANS-SERIF SMALL M
          '\uff4d',       // ｍ FULLWIDTH LATIN SMALL LETTER M
          '\u217f'    ],  // ⅿ SMALL ROMAN NUMERAL ONE THOUSAND
  'n' : [ '\u{1d5c7}',    // 𝗇 MATHEMATICAL SANS-SERIF SMALL N
          '\uff4e',       // ｎ FULLWIDTH LATIN SMALL LETTER N
          '\u0578'    ],  // ո ARMENIAN SMALL LETTER VO
  'o' : [ '\u{1d5c8}',    // 𝗈 MATHEMATICAL SANS-SERIF SMALL O
          '\uff4f',       // ｏ FULLWIDTH LATIN SMALL LETTER O
          '\u043e',       // о CYRILLIC SMALL LETTER O
          '\u03bf',       // ο GREEK SMALL LETTER OMICRON
          '\u0585'    ],  // օ ARMENIAN SMALL LETTER OH
  'p' : [ '\u{1d5c9}',    // 𝗉 MATHEMATICAL SANS-SERIF SMALL P
          '\uff50',       // ｐ FULLWIDTH LATIN SMALL LETTER P
          '\u0440'    ],  // р CYRILLIC SMALL LETTER ER
  'q' : [ '\u{1d5ca}',    // 𝗊 MATHEMATICAL SANS-SERIF SMALL Q
          '\uff51',       // ｑ FULLWIDTH LATIN SMALL LETTER Q
          '\u051b'    ],  // ԛ CYRILLIC SMALL LETTER QA
  'r' : [ '\u{1d5cb}',    // 𝗋 MATHEMATICAL SANS-SERIF SMALL R
          '\uff52'    ],  // ｒ FULLWIDTH LATIN SMALL LETTER R
  's' : [ '\u{1d5cc}',    // 𝗌 MATHEMATICAL SANS-SERIF SMALL S
          '\uff53',       // ｓ FULLWIDTH LATIN SMALL LETTER S
          '\u0455'    ],  // ѕ CYRILLIC SMALL LETTER DZE
  't' : [ '\u{1d5cd}',    // 𝗍 MATHEMATICAL SANS-SERIF SMALL T
          '\uff54'    ],  // ｔ FULLWIDTH LATIN SMALL LETTER T
  'u' : [ '\u{1d5ce}',    // 𝗎 MATHEMATICAL SANS-SERIF SMALL U
          '\uff55',       // ｕ FULLWIDTH LATIN SMALL LETTER U
          '\u057d'    ],  // ս ARMENIAN SMALL LETTER SEH
  'v' : [ '\u{1d5cf}',    // 𝗏 MATHEMATICAL SANS-SERIF SMALL V
          '\uff56',       // ｖ FULLWIDTH LATIN SMALL LETTER V
          '\u2174',       // ⅴ SMALL ROMAN NUMERAL FIVE
          '\u1d20'    ],  // ᴠ LATIN LETTER SMALL CAPITAL V
  'w' : [ '\u{1d5d0}',    // 𝗐 MATHEMATICAL SANS-SERIF SMALL W
          '\uff57',       // ｗ FULLWIDTH LATIN SMALL LETTER W
          '\u051d'    ],  // ԝ CYRILLIC SMALL LETTER WE
  'x' : [ '\u{1d5d1}',    // 𝗑 MATHEMATICAL SANS-SERIF SMALL X
          '\uff58',       // ｘ FULLWIDTH LATIN SMALL LETTER X
          '\u0445',       // х CYRILLIC SMALL LETTER HA
          '\u2179'    ],  // ⅹ SMALL ROMAN NUMERAL TEN
  'y' : [ '\u{1d5d2}',    // 𝗒 MATHEMATICAL SANS-SERIF SMALL Y
          '\uff59',       // ｙ FULLWIDTH LATIN SMALL LETTER Y
          '\u04af'    ],  // ү CYRILLIC SMALL LETTER STRAIGHT U
  'z' : [ '\u{1d5d3}',    // 𝗓 MATHEMATICAL SANS-SERIF SMALL Z
          '\uff5a',       // ｚ FULLWIDTH LATIN SMALL LETTER Z
          '\u1d22'    ],  // ᴢ LATIN LETTER SMALL CAPITAL Z
  'A' : [ '\u{1d5a0}',    // 𝖠 MATHEMATICAL SANS-SERIF CAPITAL A
          '\uff21',       // Ａ FULLWIDTH LATIN CAPITAL LETTER A
          '\u0410',       // А CYRILLIC CAPITAL LETTER A
          '\u0391',       // Α GREEK CAPITAL LETTER ALPHA
          '\u{10300}' ],  // 𐌀 OLD ITALIC LETTER A
  'B' : [ '\u{1d5a1}',    // 𝖡 MATHEMATICAL SANS-SERIF CAPITAL B
          '\uff22',       // Ｂ FULLWIDTH LATIN CAPITAL LETTER B
          '\u0412'    ],  // В CYRILLIC CAPITAL LETTER VE
  'C' : [ '\u{1d5a2}',    // 𝖢 MATHEMATICAL SANS-SERIF CAPITAL C
          '\uff23',       // Ｃ FULLWIDTH LATIN CAPITAL LETTER C
          '\u0421'    ],  // С CYRILLIC CAPITAL LETTER ES
  'D' : [ '\u{1d5a3}',    // 𝖣 MATHEMATICAL SANS-SERIF CAPITAL D
          '\uff24',       // Ｄ FULLWIDTH LATIN CAPITAL LETTER D
          '\u216e'    ],  // Ⅾ ROMAN NUMERAL FIVE HUNDRED
  'E' : [ '\u{1d5a4}',    // 𝖤 MATHEMATICAL SANS-SERIF CAPITAL E
          '\uff25',       // Ｅ FULLWIDTH LATIN CAPITAL LETTER E
          '\u0415'    ],  // Е CYRILLIC CAPITAL LETTER IE
  'F' : [ '\u{1d5a5}',    // 𝖥 MATHEMATICAL SANS-SERIF CAPITAL F
          '\uff26',       // Ｆ FULLWIDTH LATIN CAPITAL LETTER F
          '\ua4dd'    ],  // ꓝ LISU LETTER TSA
  'G' : [ '\u{1d5a6}',    // 𝖦 MATHEMATICAL SANS-SERIF CAPITAL G
          '\uff27',       // Ｇ FULLWIDTH LATIN CAPITAL LETTER G
          '\ua4d6'    ],  // ꓖ LISU LETTER GA
  'H' : [ '\u{1d5a7}',    // 𝖧 MATHEMATICAL SANS-SERIF CAPITAL H
          '\uff28',       // Ｈ FULLWIDTH LATIN CAPITAL LETTER H
          '\u041d'    ],  // Н CYRILLIC CAPITAL LETTER EN
  'I' : [ '\u{1d5a8}',    // 𝖨 MATHEMATICAL SANS-SERIF CAPITAL I
          '\uff29',       // Ｉ FULLWIDTH LATIN CAPITAL LETTER I
          '\u0406',       // І CYRILLIC CAPITAL LETTER BYELORUSSIAN-UKRAINIAN I
          '\u04c0'    ],  // Ӏ CYRILLIC LETTER PALOCHKA
  'J' : [ '\u{1d5a9}',    // 𝖩 MATHEMATICAL SANS-SERIF CAPITAL J
          '\uff2a',       // Ｊ FULLWIDTH LATIN CAPITAL LETTER J
          '\u0408'    ],  // Ј CYRILLIC CAPITAL LETTER JE
  'K' : [ '\u{1d5aa}',    // 𝖪 MATHEMATICAL SANS-SERIF CAPITAL K
          '\uff2b',       // Ｋ FULLWIDTH LATIN CAPITAL LETTER K
          '\u041a'    ],  // К CYRILLIC CAPITAL LETTER KA
  'L' : [ '\u{1d5ab}',    // 𝖫 MATHEMATICAL SANS-SERIF CAPITAL L
          '\uff2c',       // Ｌ FULLWIDTH LATIN CAPITAL LETTER L
          '\u216c',       // Ⅼ ROMAN NUMERAL FIFTY
          '\u14aa'    ],  // ᒪ CANADIAN SYLLABICS MA
  'M' : [ '\u{1d5ac}',    // 𝖬 MATHEMATICAL SANS-SERIF CAPITAL M
          '\uff2d',       // Ｍ FULLWIDTH LATIN CAPITAL LETTER M
          '\u041c'    ],  // М CYRILLIC CAPITAL LETTER EM
  'N' : [ '\u{1d5ad}',    // 𝖭 MATHEMATICAL SANS-SERIF CAPITAL N
          '\uff2e',       // Ｎ FULLWIDTH LATIN CAPITAL LETTER N
          '\u039d'    ],  // Ν GREEK CAPITAL LETTER NU
  'O' : [ '\u{1d5ae}',    // 𝖮 MATHEMATICAL SANS-SERIF CAPITAL O
          '\uff2f',       // Ｏ FULLWIDTH LATIN CAPITAL LETTER O
          '\u041e',       // О CYRILLIC CAPITAL LETTER O
          '\u039f'    ],  // Ο GREEK CAPITAL LETTER OMICRON
  'P' : [ '\u{1d5af}',    // 𝖯 MATHEMATICAL SANS-SERIF CAPITAL P
          '\uff30',       // Ｐ FULLWIDTH LATIN CAPITAL LETTER P
          '\u0420'    ],  // Р CYRILLIC CAPITAL LETTER ER
  'Q' : [ '\u{1d5b0}',    // 𝖰 MATHEMATICAL SANS-SERIF CAPITAL Q
          '\uff31',       // Ｑ FULLWIDTH LATIN CAPITAL LETTER Q
          '\u051a'    ],  // Ԛ CYRILLIC CAPITAL LETTER QA
  'R' : [ '\u{1d5b1}',    // 𝖱 MATHEMATICAL SANS-SERIF CAPITAL R
          '\uff32',       // Ｒ FULLWIDTH LATIN CAPITAL LETTER R
          '\ua4e3'    ],  // ꓣ LISU LETTER ZHA
  'S' : [ '\u{1d5b2}',    // 𝖲 MATHEMATICAL SANS-SERIF CAPITAL S
          '\uff33',       // Ｓ FULLWIDTH LATIN CAPITAL LETTER S
          '\u0405'    ],  // Ѕ CYRILLIC CAPITAL LETTER DZE
  'T' : [ '\u{1d5b3}',    // 𝖳 MATHEMATICAL SANS-SERIF CAPITAL T
          '\uff34',       // Ｔ FULLWIDTH LATIN CAPITAL LETTER T
          '\u0422'    ],  // Т CYRILLIC CAPITAL LETTER TE
  'U' : [ '\u{1d5b4}',    // 𝖴 MATHEMATICAL SANS-SERIF CAPITAL U
          '\uff35',       // Ｕ FULLWIDTH LATIN CAPITAL LETTER U
          '\u144c',       // ᑌ CANADIAN SYLLABICS TE
          '\u054d'    ],  // Ս ARMENIAN CAPITAL LETTER SEH
  'V' : [ '\u{1d5b5}',    // 𝖵 MATHEMATICAL SANS-SERIF CAPITAL V
          '\uff36',       // Ｖ FULLWIDTH LATIN CAPITAL LETTER V
          '\u142f'    ],  // ᐯ CANADIAN SYLLABICS PE
  'W' : [ '\u{1d5b6}',    // 𝖶 MATHEMATICAL SANS-SERIF CAPITAL W
          '\uff37',       // Ｗ FULLWIDTH LATIN CAPITAL LETTER W
          '\u051c'    ],  // Ԝ CYRILLIC CAPITAL LETTER WE
  'X' : [ '\u{1d5b7}',    // 𝖷 MATHEMATICAL SANS-SERIF CAPITAL X
          '\uff38',       // Ｘ FULLWIDTH LATIN CAPITAL LETTER X
          '\u0425'    ],  // Х CYRILLIC CAPITAL LETTER HA
  'Y' : [ '\u{1d5b8}',    // 𝖸 MATHEMATICAL SANS-SERIF CAPITAL Y
          '\uff39',       // Ｙ FULLWIDTH LATIN CAPITAL LETTER Y
          '\u04ae'    ],  // Ү CYRILLIC CAPITAL LETTER STRAIGHT U
  'Z' : [ '\u{1d5b9}',    // 𝖹 MATHEMATICAL SANS-SERIF CAPITAL Z
          '\uff3a'    ],  // Ｚ FULLWIDTH LATIN CAPITAL LETTER Z
  '0' : [ '\u{1d7e2}' ],  // 𝟢 MATHEMATICAL SANS-SERIF DIGIT ZERO
  '1' : [ '\u{1d7e3}' ],  // 𝟣 MATHEMATICAL SANS-SERIF DIGIT ONE
  '2' : [ '\u{1d7e4}' ],  // 𝟤 MATHEMATICAL SANS-SERIF DIGIT TWO
  '3' : [ '\u{1d7e5}' ],  // 𝟥 MATHEMATICAL SANS-SERIF DIGIT THREE
  '4' : [ '\u{1d7e6}' ],  // 𝟦 MATHEMATICAL SANS-SERIF DIGIT FOUR
  '5' : [ '\u{1d7e7}' ],  // 𝟧 MATHEMATICAL SANS-SERIF DIGIT FIVE
  '6' : [ '\u{1d7e8}' ],  // 𝟨 MATHEMATICAL SANS-SERIF DIGIT SIX
  '7' : [ '\u{1d7e9}' ],  // 𝟩 MATHEMATICAL SANS-SERIF DIGIT SEVEN
  '8' : [ '\u{1d7ea}' ],  // 𝟪 MATHEMATICAL SANS-SERIF DIGIT EIGHT
  '9' : [ '\u{1d7eb}' ],  // 𝟫 MATHEMATICAL SANS-SERIF DIGIT NINE
  ' ' : [ '\u00a0',       //   NO-BREAK SPACE
          '\u2004',       //   THREE-PER-EM SPACE
          '\u2005',       //   FOUR-PER-EM SPACE
          '\u2006',       //   SIX-PER-EM SPACE
          '\u2008',       //   PUNCTUATION SPACE
          '\u2009',       //   THIN SPACE
          '\u205F'    ],  //   MEDIUM MATHEMATICAL SPACE
};
