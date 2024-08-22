const connectWallet = async () => {
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
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
}

export default connectWallet;