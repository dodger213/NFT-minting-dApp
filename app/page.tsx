'use client'
import { useState, useEffect } from 'react'
import { connectWallet, getCurrentWalletConnected, mintNFT } from '@/app/utils/connectWallet'

const Home = () => {

  //State variables
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [status, setStatus] = useState<any>('')
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [url, setUrl] = useState<string>('')

  useEffect(() => {
    //Check if wallet is already connected
    const fetchData = async () => {
      const { address, status } = await getCurrentWalletConnected();
      setWalletAddress(address);
      setStatus(status)
    }

    fetchData();
    addWalletListener();
  }, [])

  const connectWalletPressed = async () => {
    //If Metamask is installed, it returns the wallet address and current status
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWalletAddress(walletResponse.address);
  };

  const onMintPressed = async () => {
    //TODO: implement
    const { status } = await mintNFT({ url, name, description });
    setStatus(status);

  };

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWalletAddress("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  return (
    <div className='min-h-screen items-center flex-grow justify-center'>
      <div className="max-w-[80vh] max-h-[80vh] p-[60px] px-[100px] mx-auto text-left Minter">
        <button id="walletButton" className='py-2 px-4 max-h-[40px] border border-[#254cdd] text-[#254cdd] bg-white rounded-lg font-semibold cursor-pointer text-right float-right mb-12 leading-4' onClick={connectWalletPressed}>
          {walletAddress.length > 0 ? (
            "Connected: " +
            String(walletAddress).substring(0, 6) +
            "..." +
            String(walletAddress).substring(38)
          ) : (
            <span>Connect Wallet</span>
          )}
        </button>

        <br></br>
        <h1 id="title" className='my-8 font-bold text-2xl pt-8'>🧙‍♂️ Alchemy NFT Minter</h1>
        <p className="m-4 font-semibold text-lg">
          Simply add your asset's link, name, and description, then press "Mint."
        </p>
        <form>
          <h2 className='text-xl font-bold text-blue-500 mx-4 my-1'>🖼 Link to asset: </h2>
          <input
            type="text"
            className='mx-5 my-2 p-2 border-b-2 border-groove border-gray-300 text-base w-full leading-8 focus:outline-none focus:border-gray-600'
            placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
            onChange={(e) => setUrl(e.target.value)}
          />
          <h2 className='text-xl font-bold text-blue-500 mx-4 my-1'>🤔 Name: </h2>
          <input
            type="text"
            className='mx-5 my-2 p-2 border-b-2 border-groove border-gray-300 text-base w-full leading-8 focus:outline-none focus:border-gray-600'
            placeholder="e.g. My first NFT!"
            onChange={(e) => setName(e.target.value)}
          />
          <h2 className='text-xl font-bold text-blue-500 mx-4 my-1'>✍️ Description: </h2>
          <input
            type="text"
            className='mx-5 my-2 p-2 border-b-2 border-groove border-gray-300 text-base w-full leading-8 focus:outline-none focus:border-gray-600'
            placeholder="e.g. Even cooler than cryptokitties"
            onChange={(e) => setDescription(e.target.value)}
          />
        </form>
        <button id="mintButton" className='py-2 px-4 mx-auto max-h-[40px] border border-[#254cdd] rounded-lg font-semibold cursor-pointer mt-10 bg-[#254cdd] text-white' onClick={onMintPressed}>
          Mint NFT
        </button>

        <p id="status" className='my-4 text-red-500'>
          {status}
        </p>

      </div>
    </div>
  );
}

export default Home