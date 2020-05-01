
// Class to validate RUT 
// (new RutValidator()).validate('11974840-2')  ->   true
class RutValidator {
  // ES6 required

  constructor() {}

  // Validate the last digit of a rut (digito verificador) "xxxxxxxx-X"
  dv(T) {
    var M = 0,
      S = 1;
    for (; T; T = Math.floor(T / 10)) S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
    return S ? S - 1 : "K";
  }

  // Validate if a rut is valid. // "XXXXXXXX-X"
  validate(rut) {
    if (rut.length <= 8) return false;

    if (!/^[0-9]+-[0-9kK]{1}$/.test(rut)) return false;

    var tmp = rut.split("-");
    var digv = tmp[1];
    var rutPart = tmp[0];
    if (digv == "k") digv = "K";

    return this.dv(rutPart) == digv;
  }
}

// pad the left part of a string with a filler char
// pardEnd('123', 5, '*')  ->  '**123' 
function padStart(text, len, c) {
  c = c || '0';
  while (text.length < len) {
    text = c + text;
  }
  return text;
}

// pad the right part of a string with a filler char
// pardEnd('123', 5, '*')  ->  '123**'  
function padEnd(text, len, c) {
  c = c || '0';
  while (text.length < len) {
    text = text + c;
  }
  return text;
}

// Format an integer number:   formatNumber(123456789, '.')  ->  '123.456.789'
function formatNumber(num, tSep = '.') {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${tSep}`)
}

// Minimum and Maximum are inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a single valid RUT
function generateRUT(min, max) {
  const num = getRandomInt(min, max);
  const chars = "0123456789K".split('');
  const rutVal = new RutValidator();
  for (let c in chars) {
      const rut = `${num}-${c}`;
      // console.log(rut);
      if (rutVal.validate(rut)) {
          return rut;
      }
  }
  return null;
}
