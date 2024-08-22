'use client'
import { useState, useEffect } from 'react'

const Home = () => {
  //State variables
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [url, setUrl] = useState<string>('')

  useEffect(() => {
    //Todo
    const fetchData = async () => {

    }

    fetchData();
  }, [])

  const connectWalletPressed = async () => {
    //TODO: implement

  };

  const onMintPressed = async () => {
    //TODO: implement

  };

  return (
    <div className='m-4 w-full min-h-screen items-center flex-grow justify-center'>
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
        <p className="m-4 font-semibold text-xl">
          Simply add your asset's link, name, and description, then press "Mint."
        </p>
        <form>
          <h2>🖼 Link to asset: </h2>
          <input
            type="text"
            className='border-b-2 border-groove border-gray-300 text-base w-full leading-8 focus:outline-none focus:border-gray-600'
            placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
            onChange={(e) => setUrl(e.target.value)}
          />
          <h2>🤔 Name: </h2>
          <input
            type="text"
            className='border-b-2 border-groove border-gray-300 text-base w-full leading-8 focus:outline-none focus:border-gray-600'
            placeholder="e.g. My first NFT!"
            onChange={(e) => setName(e.target.value)}
          />
          <h2>✍️ Description: </h2>
          <input
            type="text"
            className='border-b-2 border-groove border-gray-300 text-base w-full leading-8 focus:outline-none focus:border-gray-600'
            placeholder="e.g. Even cooler than cryptokitties ;)"
            onChange={(e) => setDescription(e.target.value)}
          />
        </form>
        <button id="mintButton" className='py-2 px-4 max-h-[40px] border border-[#254cdd] text-[#254cdd] bg-white rounded-lg font-semibold cursor-pointer mt-10 bg-[#254cdd] text-white py-2 px-4 rounded-lg' onClick={onMintPressed}>
          Mint NFT
        </button>
        <p id="status" className='text-red-500'>
          {status}
        </p>
      </div>
    </div>
  );
}

export default Home