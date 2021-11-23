const { assert } = require('console');
const cryptojs = require('crypto-js');

let username = "fabrice";
let password = "1234";

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
// To be more stringent in adhering to RFC 3986 (which reserves !, ', (, ), and *), even though these 
// characters have no formalized URI delimiting uses, the following can be safely used:
function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
      return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    });
}


// if you pass a string into btoa() containing characters that occupy more than one byte, you will get an error
// that's why we use percent/URI encoding before, to make sure that every character uses only one byte:
let secretPassPhrase = fixedEncodeURIComponent(password) + fixedEncodeURIComponent(username);
secretPassPhrase = btoa(secretPassPhrase);  // MTIzNGZhYnJpY2U=
console.log('secretPassPhrase', secretPassPhrase);

let key = secretPassPhrase; // master password as secret key

//let txtMsg = "testurl1";  // U2FsdGVkX19etA7fv6vhGvcdygLyibluA4ynkkw6enw=
let txtMsg = "testurl2";  // U2FsdGVkX1+BidxTT7UX3fLpaNwB4UlKzTQowZVpH8I=

let encodedTxtMsg = btoa(fixedEncodeURIComponent(txtMsg));
console.log('encodedTxtMsg', encodedTxtMsg);

let ciphertext = cryptojs.AES.encrypt(encodedTxtMsg, key).toString();
console.log('ciphertext', ciphertext);

let bytes = cryptojs.AES.decrypt(ciphertext, key);
let originaltext = bytes.toString(cryptojs.enc.Utf8);
console.log('originaltext', originaltext);

let decodedTxtMsg = decodeURIComponent(atob(originaltext));
console.log('decodedTxtMsg', decodedTxtMsg);

console.log(txtMsg === decodedTxtMsg); 