import { useState } from "react";

function ConnectWalletButton() {
  const [isConnected, setIsConnected] = useState(false);

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }

  // return (
  //   <>
  //     <button
  //       className="h-[40px] px-4 py-2 text-white font-semibold bg-gray-800 rounded transition-colors duration-200 ease-in-out hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 active:bg-gray-600"
  //     >
  //       Connect Wallet
  //     </button>
  //   </>
  // );

  return (
    <div>
      {isConnected ? (
        <button className="h-[40px] px-4 py-2 text-white font-semibold bg-gray-800 rounded transition-colors duration-200 ease-in-out hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 active:bg-gray-600">
          Wallet Connected!
        </button>
      ) : (
        <button
          className="h-[40px] px-4 py-2 text-white font-semibold bg-gray-800 rounded transition-colors duration-200 ease-in-out hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 active:bg-gray-600"
          onClick={() => connect()}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default ConnectWalletButton;
