const fs = require('fs');

let commonWords = fs.readFileSync('res/commonWords.txt', 'utf8');
commonWords = commonWords.split('\r\n');
let top100Pas = fs.readFileSync('res/top100Passwords.txt', 'utf8');
top100Pas = top100Pas.split('\r\n');
let top100kPas = fs.readFileSync('res/top100kPasswords.txt', 'utf8')
top100kPas = top100kPas.split('\r\n');

const generatePassword = () => {
	let characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoprstuvwxyz!"#;%:?*()_+<>{}:';
	let passwordValue = '';
	let passwordLengh = 8;
	for (let i=0; i < passwordLengh; i++) {
		let number = Math.floor(Math.random() * characters.length);
		passwordValue += characters.substring(number, number + 1);
	}
	return passwordValue;
}