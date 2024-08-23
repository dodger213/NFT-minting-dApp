import axios from 'axios'


require('dotenv').config();

export type JSONBody = {
  url: string,
  name: string,
  description: string
}
const key = process.env.NEXT_PUBLIC_PINATA_KEY;
const secret = process.env.NEXT_PUBLIC_PINATA_SECRET;
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;

export const pinJSONToIPFS = async (JSONBody: JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  //making axios POST request to Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      }
    })
    .then((response) => {
      return {
        success: true,
        pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
      };
    })
    .catch((error) => {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }

    });
};
