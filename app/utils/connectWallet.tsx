import Link from "next/link";
import { createAlchemyWeb3 } from '@alch/alchemy-web3';

import type { JSONBody } from "./pinata";
import { pinJSONToIPFS } from "./pinata";
import contractABI from '@/app/contract-abi.json'
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
if (!alchemyKey) {
  throw new Error("Alchemy key is not defined in environment variables.");
}

const web3 = createAlchemyWeb3(alchemyKey)

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0]
      }
      return obj
    } catch (err) {
      const errorMessage = (err as Error).message || 'An unknown error occurred';
      return {
        status: `😥 ${errorMessage}`,
        address: ''
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
          { " "}
              🦊{ " " }
                <Link href={ `https://metamask.io/download.html` }>
                  "You must install Metamask, a virtual Ethereum wallet, in your browser."
                </Link>
          </p>
        </span>
      ),
    };
  }
}

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({ method: 'eth_accounts' });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above."
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button."
        }
      }
    } catch (err) {
      const errorMessage = (err as Error).message || 'An unknown error occured';
      return {
        address: "",
        status: `😥 ${errorMessage}`
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
        <p>
        { " "}
            🦊{ " " }
              <Link href={ `https://metamask.io/download.html` }>
                You must install Metamask, a virtual Ethereum wallet, in your browser.
              </Link>
        </p>
        </span>
      )
    }
  }
}

export const mintNFT = async (JSONBody: JSONBody) => {

  const { url, name, description } = JSONBody;

  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting."
    }
  }

  //make pinata call
  const pinataResponse = await pinJSONToIPFS({ url, name, description });
  if (!pinataResponse.success) {
    return {
      sucess: false,
      status: "😢 Something went wrong while uploading your tokenURI."
    }
  }

  const tokenURI = pinataResponse.pinataUrl;

  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  const transactionParameters = {
    to: contractAddress,
    from: window.ethereum.selectedAddress,
    'data': window.contract.methods.mintNFT(window.ethereum.selectedAddress, tokenURI).encodeABI()

  }

  try {
    const txHash = await window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
    return {
      success: true,
      status: "✅ Check out your transaction on Etherscan: https://sepolia.etherscan.io/tx/" + txHash
    }
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something Went wrong!'
    return {
      success: false,
      status: `😥 ${errorMessage}`
    }
  }
}