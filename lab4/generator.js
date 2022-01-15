const fs = require('fs');
const crypto = require('crypto');
const argon2 = require('argon2');

let commonWords = fs.readFileSync('res/commonWords.txt', 'utf8').split('\r\n');
let top100Pas = fs.readFileSync('res/top100Passwords.txt', 'utf8').split('\r\n');
let top100kPas = fs.readFileSync('res/top100kPasswords.txt', 'utf8').split('\r\n');

const stongGeneratePassword = (passwordLengh) => {
	const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoprstuvwxyz!"#;%:?*()_+<>{}:';
	let passwordValue = '';
	// const passwordLengh = 8;
	for (let i=0; i < passwordLengh; i++) {
		let number = Math.floor(Math.random() * characters.length);
		passwordValue += characters.substring(number, number + 1);
	}
	return passwordValue;
}

// Generation of random numbers
const randomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
// console.log(randomInteger(1, 10))

async function generatePasswords () {
	const allPas = 100000;
	let password;
	let passwords = [];
	let passwordsMD5 = []
	let passwordsArgon2 = [];
	let hashMD5;
	let hashArgon2;
	const percent1 = Math.floor(randomInteger(5, 10) * top100Pas.length / 100);
	// console.log("percent1", percent1);
	const percent2 = Math.floor(randomInteger(50, 90) * top100kPas.length / 100);
	// console.log("percent2", percent2);
	const percent3 = Math.floor(randomInteger(1, 5) * commonWords.length / 100);
	// console.log("percent3", percent3);
	const ost = allPas - percent1 - percent2 - percent3;
	// console.log("ost", ost);

	for (let i=0; i < percent1; i++) {
		password = top100Pas[randomInteger(0, top100Pas.length - 1)]
		hashMD5 = crypto.createHash('md5').update(password).digest('hex');
		hashArgon2 = await argon2.hash(password, {type: argon2.argon2d});
		passwordsMD5.push(hashMD5);
		passwordsArgon2.push(hashArgon2);
		// passwords.push(password);
	}
	for (let i=0; i < percent2; i++) {
		password = top100kPas[randomInteger(0, top100kPas.length - 1)]
		hashMD5 = crypto.createHash('md5').update(password).digest('hex');
		hashArgon2 = await argon2.hash(password, {type: argon2.argon2d});
		passwordsMD5.push(hashMD5);
		passwordsArgon2.push(hashArgon2);
		// passwords.push(password);
	}
	for (let i=0; i < percent3; i++) {
		password = commonWords[randomInteger(0, commonWords.length - 1)] + stongGeneratePassword(4);
		hashMD5 = crypto.createHash('md5').update(password).digest('hex');
		hashArgon2 = await argon2.hash(password, {type: argon2.argon2d});
		passwordsMD5.push(hashMD5);
		passwordsArgon2.push(hashArgon2);
		// passwords.push(password);
	}
	for (let i=0; i < ost; i++) {
		password = stongGeneratePassword(10);
		hashMD5 = crypto.createHash('md5').update(password).digest('hex');
		hashArgon2 = await argon2.hash(password, {type: argon2.argon2d});
		passwordsMD5.push(hashMD5);
		passwordsArgon2.push(hashArgon2);
		// passwords.push(password);
	}

	fs.writeFileSync('./res/hashMD5.csv', passwordsMD5.join('\n'));
	fs.writeFileSync('./res/hashArgon2.csv', passwordsArgon2.join('\n'));
	// fs.writeFileSync('./res/commonWords.txt', passwords.join('\n'));
	
	console.log(passwords);
	console.log(passwordsMD5);
	console.log(passwordsArgon2)
	// return passwords;
}
hashArgon2.csv
generatePasswords();

// module.exports = {
// 	generatePasswords
// }
