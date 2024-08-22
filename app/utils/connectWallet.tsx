import Link from "next/link";

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
            {" "}
            🦊{" "}
            <Link href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
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
            {" "}
            🦊{" "}
            <Link href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </Link>
          </p>
        </span>
      )
    }
  }
}