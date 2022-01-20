import "dotenv/config";
import fetch from "node-fetch";

const callAPI = async route => {
    // console.log(route);
    const response = await fetch(process.env.URL + route);
    const data = await response.json();
    return {
        status: response.status,
        data: data
    };
};

export const createAccount = (id) => callAPI(`/createacc?id=${id}`);
export const gamble = (mode, id, bet, number) => (callAPI(`/play${mode}?id=${id}&bet=${bet}&number=${number}`));