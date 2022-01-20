import fs from "fs";

const XORit = (text, key) => {
  const decrypted = [];
  for (let i = 0; i < text.length; i = i + 2) {
    const xoredInt = parseInt(text.slice(i, i + 2), 16) ^ key;
    decrypted.push(xoredInt);
  }
  // UTF-16 to string
  return String.fromCharCode(...decrypted);
};

const reducer = (reducerSum, char) => {
  const charCode = char.charCodeAt(0);
  // pull mostly used chars
  return (charCode >= 32 && charCode <= 90) || (charCode >= 97 && charCode <= 122) ? ++reducerSum : --reducerSum;
}

const calculateQuotient = (text) => {
  return [...text].reduce(reducer, 0);
};

const decryptHexXor = () => {
  const encryptedText = fs.readFileSync("./files/first_encrypted.txt", "utf8");

  const versions = [];
  for (let key = 0; key < 255; key++) {
    const decryptedText = XORit(encryptedText, key);
    versions.push({
      quotient: calculateQuotient(decryptedText),
      text: decryptedText
    });
  };

  const findVersionWithBestQuotient = versions.reduce(
    (prev, curr) => {
      return prev.quotient > curr.quotient ? prev : curr;
    }
  );

  console.log(findVersionWithBestQuotient);
  fs.writeFileSync("./files/first_decrypted.txt", findVersionWithBestQuotient.text);
};

decryptHexXor();

