const { encrypt, decrypt } = require('./crypto');
require('dotenv').config();

const secretKey = process.env.SECRETKEY;

const hash = encrypt(secretKey);

console.log(hash);

const text = decrypt(hash);

console.log(text);