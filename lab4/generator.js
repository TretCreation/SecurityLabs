const fs = require('fs');
const crypto = require('crypto');
const argon2 = require('argon2');

const commonWords = fs.readFileSync('res/commonWords.txt', 'utf8').split('\r\n');
const top100Pas = fs.readFileSync('res/top100Passwords.txt', 'utf8').split('\r\n');
const top100kPas = fs.readFileSync('res/top100kPasswords.txt', 'utf8').split('\r\n');

const passwords = []
const passwordsMD5 = []
const passwordsArgon2 = [];

const generateStongPassword = (passwordLengh) => {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoprstuvwxyz!"#;%:?*()_+<>{}:';
  let passwordValue = '';
  for (let i=0; i < passwordLengh; i++) {
    let number = Math.floor(Math.random() * characters.length);
    passwordValue += characters.substring(number, number + 1);
  }
  return passwordValue;
}

// Generation of random numbers
const getRandomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

const getPercent = async (percent, data, salt = "", strongPasswordOnly = false) => {
  for (let i = 0; i < percent; i++) {
    const password = strongPasswordOnly
      ? generateStongPassword(10)
      : data[getgetRandomInteger(0, data.length - 1)] + salt;
    passwordsMD5.push(crypto.createHash('md5').update(password).digest('hex'));
    passwordsArgon2.push(await argon2.hash(password, {type: argon2.argon2d}));
    // passwords.push(password);
  }
}

async function generatePasswords () {
  const allPas = 100000;
  const percent1 = Math.floor(getRandomInteger(5, 10) * top100Pas.length / 100);
  // console.log("percent1", percent1);
  const percent2 = Math.floor(getRandomInteger(50, 90) * top100kPas.length / 100);
  // console.log("percent2", percent2);
  const percent3 = Math.floor(getRandomInteger(1, 5) * commonWords.length / 100);
  // console.log("percent3", percent3);
  const ost = allPas - percent1 - percent2 - percent3;
  // console.log("ost", ost);

  await getPercent(percent1, top100Pas);
  await getPercent(percent2, top100kPas);
  await getPercent(percent3, commonWords, generateStongPassword(4));
  await getPercent(ost, [], "", true);

  fs.writeFileSync('./res/hashMD5.csv', passwordsMD5.join('\n'));
  fs.writeFileSync('./res/hashArgon2.csv', passwordsArgon2.join('\n'));
  fs.writeFileSync('./res/commonWords.txt', passwords.join('\n'));

  console.log(passwords);
  console.log(passwordsMD5);
  console.log(passwordsArgon2)
  // return passwords;
}
generatePasswords();