import {gamble} from "./api.js";
import {MersenneTwister19937} from "random-js";
import moment from "moment";

const mtReverce = async account => {
  let timeStamp = moment(account.deletionTime).subtract(1, "hour").utc().unix();
  console.log("timeStamp", timeStamp);

  const mt = MersenneTwister19937.seed(timeStamp);

  while (account.money && account.money < 1000000) {
    let fraudRealNumber = Math.abs(mt.next());
    console.log("fraudRealNumber: ", fraudRealNumber);

    const fraudGamble = await gamble("Mt", account.id, 100, fraudRealNumber);
    console.log("fraudGamble: ", fraudGamble);

    account.money = fraudGamble.data.account.money;
  }

  return Boolean(account.money);
}

export default mtReverce;
