import {gamble} from "./api.js";
import util from "util";
import {exec} from 'child_process';

const execPromice = util.promisify(exec);

const getA = async (numbers, m) => {
  const {stdout} = await execPromice(`python -c "print((${numbers[2]} - ${numbers[1]}) * pow(${numbers[1]} - ${numbers[0]}, -1, ${m}) % ${m})"`);
  return Number(stdout);
}

const getC = (numbers, a, m) => {
  return (numbers[1] - numbers[0] * a) % m;
}

const generateNextLcg = (realNumber, a, c, m) => {
  console.log("[realNumber, a, c, m]: ", [realNumber, a, c, m]);
  return (a * realNumber + c) % m;
}

const collectedRealNumbers = new Array(3);
const m = Math.pow(2, 32);

const lcgReverce = async accountData => {
  let realNumber;
  for (let i = 0; i < collectedRealNumbers.length; ++i) {
    const gambleResult = await gamble("Lcg", accountData.id, 1, 123456);
    realNumber = gambleResult.data.realNumber;
    collectedRealNumbers[i] = realNumber;
  }
  console.log("collectedRealNumbers: ", collectedRealNumbers);

  const a = await getA(collectedRealNumbers, m);
  const c = getC(collectedRealNumbers, a, m);
  console.log("[a, c]: ", [a, c]);

  while (accountData.money > 100 && accountData.money < 1000000) {
    let fraudRealNumber = generateNextLcg(realNumber, a, c, m);
    console.log("fraudRealNumber: ", fraudRealNumber);

    const fraudGambleResult = await gamble("Lcg", accountData.id, 100, fraudRealNumber);
    console.log("fraudGambleResult: ", fraudGambleResult);

    if (fraudGambleResult.status !== 200) {
      console.log("validation error, skipping...");
      realNumber = fraudRealNumber;
    } else {
      accountData.money = fraudGambleResult.data.account.money;
      realNumber = fraudGambleResult.data.realNumber;
    }
  }

  return accountData.money >= 1000000;
}

export default lcgReverce;