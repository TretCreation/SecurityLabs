const fs = require('fs');

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

const generatePasswords = () => {
	const allPas = 100000;
	let password;
	let passwords = [];
	const percent1 = Math.floor(randomInteger(5, 10) * top100Pas.length / 100);
	console.log("percent1", percent1);
	const percent2 = Math.floor(randomInteger(50, 90) * top100kPas.length / 100);
	console.log("percent2", percent2);
	const percent3 = Math.floor(randomInteger(1, 5) * commonWords.length / 100);
	console.log("percent3", percent3);
	const ost = allPas - percent1 - percent2 - percent3;
	console.log("ost", ost);

	for (let i=0; i < percent1; i++) {
		password = top100Pas[randomInteger(0, top100Pas.length - 1)]
		passwords.push(password);
	}
	for (let i=0; i < percent2; i++) {
		password = top100kPas[randomInteger(0, top100kPas.length - 1)]
		passwords.push(password);
	}
	for (let i=0; i < percent3; i++) {
		password = commonWords[randomInteger(0, commonWords.length - 1)] + stongGeneratePassword(4);
		passwords.push(password);
	}
	for (let i=0; i < ost; i++) {
		password = stongGeneratePassword(10);
		passwords.push(password);
	}

	fs.writeFileSync('./res/arrPas.txt', passwords.join('\n'));
	return passwords;
}

generatePasswords();