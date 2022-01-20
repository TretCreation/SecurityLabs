import fs from "fs";

const replacements = {
  'L': 'E',
  'P': 'T',
  'Q': 'H',
  'U': 'R',
  'M': 'C',
  'V': 'I',
  'H': 'P',
  'E': 'A',
  'S': 'S',
  'T': 'L',
  'R': 'X',
  'B': 'W',
  'W': 'N',
  'C': 'Y',
  'Y': 'O',
  'A': 'U',
  'K': 'B',
  'F': 'D',
  'D': 'G',
  'G': 'F',
  'I': 'V',
  'N': 'K',
  'O': 'M',
  'X': 'Q',
  'Z': 'J'
};

const getFrequency = (text) => {
  const frequencies = [...text].reduce((charsObj, char) => {
    if (!charsObj[char]) {
      charsObj[char] = 0;
    };
    charsObj[char] = charsObj[char] + 1;
    return charsObj;
  }, {});

  return Object.entries(frequencies).sort((a, b) => (b[1] -a[1]));
};

const replaceChars = (text, replacements) => {
    return [...text].map((char) => replacements[char]).join("");
}

const decryptSubstitution = () => {
  const encryptedText = fs.readFileSync("./files/third_encrypted.txt", "utf8");

  console.log(getFrequency(encryptedText))
  const decryptedText = replaceChars(encryptedText, replacements)

  console.log(decryptedText);
  fs.writeFileSync("./files/third_decrypted.txt", decryptedText);
};

decryptSubstitution();