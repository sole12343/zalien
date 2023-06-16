import { useState, useEffect } from "react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ethers } from "ethers";
import { abi } from "../zalien-abi.js";
import MintDialog from "./MintDialog.js";
import MintedDialog from "./MintedDialog.js";

const privatePrice = 0.069;
const publicPrice = 0.096;

const MintComponent = () => {
  const [quantity, setQuantity] = useState(1);
  const [mintCost, setMintCost] = useState(0);
  const [totalMinted, setTotalMinted] = useState(0);
  const [mintStatus, setMintStatus] = useState(0);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const { address, isConnected } = useAccount();

  // mainnet 0x467415edF9FEe95F206b44Fc4DFBb34F55FaA352
  const contractConfig = {
    address: "0x95FE1fDFf3C83abaB78123df3788BA51cEcC4481",
    abi,
  };

  const { data: totalSupplyData } = useContractRead({
    ...contractConfig,
    functionName: "totalSupply",
  });

  useEffect(() => {
    if (totalSupplyData) {
      setTotalMinted(ethers.toNumber(totalSupplyData));
    }
  }, [totalSupplyData]);

  const { data: publicMintStatusData } = useContractRead({
    ...contractConfig,
    functionName: "publicMintStatus",
  });

  useEffect(() => {
    if (publicMintStatusData) {
      setMintStatus(ethers.toNumber(publicMintStatusData));
    }
  }, [publicMintStatusData]);

  useEffect(() => {
    if (mintStatus === 1 || mintStatus === 2) {
      setMintCost((privatePrice * quantity).toFixed(3));
    } else if (mintStatus === 3) {
      setMintCost((publicPrice * quantity).toFixed(3));
    } else if (mintStatus === 0 || mintStatus === 4) {
      setMintCost(0);
    }
  }, [quantity, mintStatus]);

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite({
    ...contractConfig,
    functionName: "mint",
    args: [quantity],
    account: address,
    value: ethers.parseEther(mintCost.toString()),
  });

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  const isMinted = txSuccess;

  // blupchip mint
  const {
    data: bluechipMintData,
    write: bluechipMint,
    isLoading: isBluechipMintLoading,
    isSuccess: isBluechipMintStarted,
    error: bluechipMintError,
  } = useContractWrite({
    ...contractConfig,
    functionName: "blueChipMint",
    args: [quantity],
    account: address,
    value: ethers.parseEther(mintCost.toString()),
  });

  const {
    data: bluechipTxData,
    isSuccess: bluechipTxSuccess,
    error: bluechipTxError,
  } = useWaitForTransaction({
    hash: bluechipMintData?.hash,
  });

  const isBluechipMinted = bluechipTxSuccess;

  return (
    <div className="text-white min-h-screen mt-28 flex flex-col">
      <h2 className="text-4xl md:text-6xl font-almendra text-center">
        Create your own{" "}
        <span className="text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text font-black">
          Zaliens
        </span>
      </h2>

      <div className="text-center mt-10 mb-5">
        <p className="text-xl md:text-2xl font-inter text-gray-400">
          Tips: Limited to 3 NFTs per wallet.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center p-4 mx-auto md:flex-row">
        <div className="flex-shrink-0">
          <img
            src="/images/zalien-gift.gif"
            alt="zalien-gift"
            className="w-full md:w-auto"
            style={{ maxWidth: "400px" }}
          />
        </div>

        <div className="flex flex-col ml-8 mt-8 md:mt-0 md:ml-12">
          <div className="flex flex-col md:flex-row md:items-center mb-4">
            <div className="text-sm uppercase tracking-wider">Mint Status:</div>
            <div className="text-2xl mt-1 font-bold ml-24">
              {mintStatus === 0 && (
                <p className="text-lg mt-1 font-bold">Not Active</p>
              )}
              {mintStatus === 1 && (
                <p className="text-lg mt-1 font-bold">Bluechip Mint</p>
              )}
              {mintStatus === 2 && (
                <p className="text-lg mt-1 font-bold">Allowlist Mint</p>
              )}
              {mintStatus === 3 && (
                <p className="text-lg mt-1 font-bold">Public Mint</p>
              )}
              {mintStatus === 4 && (
                <p className="text-lg mt-1 font-bold">Closed</p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center mb-4">
            <div className="text-sm uppercase tracking-wider">
              Current Mint:
            </div>
            <p className="text-lg ml-20">{totalMinted} / 4200</p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center mb-4">
            <label
              htmlFor="quantity"
              className="text-sm uppercase tracking-wider mb-2 md:mb-0 md:mr-7"
            >
              Select Quantity:
            </label>
            <select
              id="quantity"
              className="form-select rounded-md bg-white text-black px-4 h-8 w-full md:w-40"
              value={quantity}
              onChange={handleQuantityChange}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <div className="text-sm uppercase tracking-wider">Mint Cost:</div>
            <div className="ml-0 md:ml-20 bg-white text-black rounded-md px-4 py-1 w-full md:w-40">
              {mintCost} ETH
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            {mounted
              ? isConnected && (
                  <button
                    disabled={isMintLoading || (isMintStarted && !isMinted)}
                    className="mt-12 w-full py-3 px-4 bg-purple-500 text-white font-bold rounded-lg shadow-md hover:bg-purple-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
                    data-mint-loading={isMintLoading}
                    data-mint-started={isMintStarted}
                    onClick={() => mint?.()}
                  >
                    {isMintLoading && "Waiting for approval"}
                    {isMintStarted && !isMinted ? (
                      <div>
                        Minting{"  "}
                        <span className="loading loading-dots loading-xs"></span>
                      </div>
                    ) : (
                      (!isMintLoading || isMinted) && "White List Mint"
                    )}
                  </button>
                )
              : null}
            {mounted
              ? isConnected && (
                  <button
                    disabled={
                      isBluechipMintLoading ||
                      (isBluechipMintStarted && !isBluechipMinted)
                    }
                    className="mt-12 w-full py-3 px-4 bg-purple-500 text-white font-bold rounded-lg shadow-md hover:bg-purple-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
                    data-mint-loading={isBluechipMintLoading}
                    data-mint-started={isBluechipMintStarted}
                    onClick={() => bluechipMint?.()}
                  >
                    {isBluechipMintLoading && "Waiting for approval"}
                    {isBluechipMintStarted && !isBluechipMinted ? (
                      <div>
                        Minting{"  "}
                        <span className="loading loading-dots loading-xs"></span>
                      </div>
                    ) : (
                      (!isBluechipMintLoading || isBluechipMinted) &&
                      "Bluechip Mint"
                    )}
                  </button>
                )
              : null}
            {mounted
              ? isConnected && (
                  <button
                    disabled={isMintLoading || (isMintStarted && !isMinted)}
                    className="mt-12 w-full py-3 px-4 bg-purple-500 text-white font-bold rounded-lg shadow-md hover:bg-purple-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
                    data-mint-loading={isMintLoading}
                    data-mint-started={isMintStarted}
                    onClick={() => mint?.()}
                  >
                    {isMintLoading && "Waiting for approval"}
                    {isMintStarted && !isMinted ? (
                      <div>
                        Minting{"  "}
                        <span className="loading loading-dots loading-xs"></span>
                      </div>
                    ) : (
                      (!isMintLoading || isMinted) && "Public Mint"
                    )}
                  </button>
                )
              : null}
            {mounted
              ? !isConnected && (
                  <p className="mt-12">Please Connect your Wallet!</p>
                )
              : null}

            {mounted
              ? mintError && <MintDialog errorMessage={mintError.message} />
              : null}

            {mounted
              ? bluechipMintError && (
                  <MintDialog errorMessage={bluechipMintError.message} />
                )
              : null}

            {mounted
              ? isMinted &&
                mintData &&
                txData && (
                  <>
                    <MintedDialog
                      mintDataHash={mintData.hash}
                      txData={txData}
                    />
                  </>
                )
              : null}

            {mounted
              ? isBluechipMinted &&
                bluechipMintData && (
                  <>
                    <MintedDialog
                      mintDataHash={bluechipMintData.hash}
                      txData={bluechipTxData}
                    />
                  </>
                )
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintComponent;
