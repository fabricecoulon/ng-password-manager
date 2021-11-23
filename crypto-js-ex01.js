const { assert } = require('console');
const cryptojs = require('crypto-js');

let key = 'secret!'; // master password as secret key

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
// To be more stringent in adhering to RFC 3986 (which reserves !, ', (, ), and *), even though these 
// characters have no formalized URI delimiting uses, the following can be safely used:
function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
      return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    });
}

let txtMsg = "äö'ö'ä@£$€$1234"; // "12345678901234567890123456789012"; //32-bytes long

let encodedTxtMsg = fixedEncodeURIComponent(txtMsg);
console.log('encodedTxtMsg', encodedTxtMsg);

let ciphertext = cryptojs.AES.encrypt(encodedTxtMsg, key).toString();
console.log('ciphertext', ciphertext);

let bytes = cryptojs.AES.decrypt(ciphertext, key);
let originaltext = bytes.toString(cryptojs.enc.Utf8);
console.log('originaltext', originaltext);

let decodedTxtMsg = decodeURIComponent(originaltext);
console.log('decodedTxtMsg', decodedTxtMsg);

console.log(txtMsg === decodedTxtMsg); 