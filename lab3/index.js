import "dotenv/config";
import {createAccount} from "./api.js";
import lcgReverce from "./lcg.js";
import mtReverce from "./mt.js";

let accountData;
let id = process.env.START_ACCOUNT_ID;

do {
  const accountCreationResult = await createAccount(++id);
  console.log(`Trying to create Account with id=${id}`);
  if (accountCreationResult.status === 201) {
    accountData = accountCreationResult.data;
    console.log("Created Account data:", accountData);
    break;
  }
} while (true);

// lcg
const lgcResult = await lcgReverce(accountData);
console.log("lgc Result=", lgcResult);

// mt
// const mtResult = await mtReverce(accountData);
// console.log("mtResult=", mtResult);
