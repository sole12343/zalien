import { useState, useEffect } from "react";
import { ethers, toNumber } from "ethers";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const DynamicVideoComponent = dynamic(() => import("../VideoComponent"), {
  ssr: false,
});

export default function Card() {
  const [totalSupply, setTotalSupply] = useState(0);
  const [status, setStatus] = useState(0);

  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/mint");
  };

  useEffect(() => {
    async function fetchStatus() {
      // Create an Ethereum Provider object
      const provider = new ethers.AlchemyProvider(
        "mainnet",
        process.env.alchemyId
      );

      // Create a contract object
      const contractAddress = "0x467415edF9FEe95F206b44Fc4DFBb34F55FaA352";
      const contractABI = [
        {
          inputs: [],
          name: "totalSupply",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "publicMintStatus",
          outputs: [
            {
              internalType: "enum Zalien.EPublicMintStatus",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ]; // Add the contract's ABI
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );

      // Get totalSupply and status
      const totalSupply = await contract.totalSupply();
      const status = await contract.publicMintStatus();

      // Update state
      setTotalSupply(toNumber(totalSupply));
      setStatus(toNumber(status));
    }

    fetchStatus();
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-900 p-5 rounded-lg shadow-md hover:shadow-lg max-w-sm mx-auto text-white">
      <div className="w-full overflow-hidden rounded-t-lg">
        {/* <DynamicVideoComponent /> */}
        <img
          src="/images/zalien-gift.gif"
          alt="zalien-gift"
          className="w-full md:w-auto"
          style={{ maxWidth: "400px" }}
        />
      </div>
      <div className="flex flex-col justify-between items-center w-full mt-4 text-center">
        <div className="mb-2">
          <p className="text-sm uppercase tracking-wider">Current Mint</p>
          <p className="text-2xl mt-1 font-bold">{totalSupply} / 4200</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-wider">Status</p>
          {status === 0 && (
            <p className="text-2xl mt-1 font-bold">Not Active</p>
          )}
          {status === 1 && (
            <p className="text-2xl mt-1 font-bold">Bluechip Mint</p>
          )}
          {status === 2 && (
            <p className="text-2xl mt-1 font-bold">Allowlist Mint</p>
          )}
          {status === 3 && (
            <p className="text-2xl mt-1 font-bold">Public Mint</p>
          )}
          {status === 4 && <p className="text-2xl mt-1 font-bold">Closed</p>}
        </div>
      </div>
      <div className="mt-6 w-full">
        <button
          onClick={handleButtonClick}
          className="w-full py-3 px-4 bg-purple-500 text-white font-bold rounded-b-lg shadow-md hover:bg-purple-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
        >
          Go to Mint
        </button>
      </div>
    </div>
  );
}
