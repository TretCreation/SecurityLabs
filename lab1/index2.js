import fs from "fs";

const XORit = (text, key) => {
  let decrypted = [...text].map(element => {
    return element.charCodeAt(0) ^ key;
  });
  // UTF-16 to string
  return String.fromCharCode(...decrypted);
};

const reducer = (reducerSum, char) => {
  let charCode = char.charCodeAt(0);
  // pull mostly used chars
  return (charCode >= 32 && charCode <= 90) || (charCode >= 97 && charCode <= 122) ? ++reducerSum : --reducerSum;
}

const calculateQuotient = (text) => {
  let sum = [...text].reduce(reducer, 0);
  return sum;
};

const vig = (text, peakPosition) => {
  const blocks = new Array(peakPosition).fill("");
  for (let i = 0; i < text.length; i += peakPosition) {
    for (let j = 0; j < peakPosition; j++) {
      blocks[j] += text[(i + j) % text.length];
    }
  }

  const decodedBlocks = blocks.map((element) => {
    const versions = [];
    for (let key = 0; key < 255; key++) {
      const decryptedText = XORit(element, key);
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

    return findVersionWithBestQuotient.text;
  });

  let textConcat = "";
  for (let i = 0; i < decodedBlocks[0].length; i++) {
    for (let j = 0; j < decodedBlocks.length; j++) {
        textConcat += decodedBlocks[j][i];
    }
  }
  return textConcat;
};

const getCoincidence = (text) => {
  const peaks = new Array(text.length).fill(0);

  for (let i = 0; i < text.length; i++) {
    for (let j = 0; j < text.length; j++) {
      if (text[j] === text[(i + j) % text.length]) {
        peaks[i]++;
      }
    }
  }

  return peaks;
};

const decryptRepeatingKeyXOR = () => {
  const encryptedText = fs.readFileSync("./files/second_encrypted.txt", "utf8");

  const Buff = Buffer.from(encryptedText, "base64").toString();

  const coincidence = getCoincidence(Buff);

  fs.writeFileSync("./files/second_coincidences.txt", JSON.stringify(coincidence));

  const peakPosition = 3;
  const decryptedText = vig(Buff, peakPosition);

  console.log(decryptedText);
  fs.writeFileSync("./files/second_decrypted.txt", decryptedText);
};

decryptRepeatingKeyXOR();
