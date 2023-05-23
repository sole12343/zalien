import { useState, useEffect } from "react";

export default function Card() {
  const [seconds, setSeconds] = useState(99999);
  const [currentSupply, setCurrentSupply] = useState(0);
  const [totalSupply, setTotalSupply] = useState(4200);

  useEffect(() => {
    const mintIntervalId = setInterval(() => {
      if (currentSupply < totalSupply) {
        setCurrentSupply((currentSupply) => currentSupply + 1);
      }
    }, 2000);

    return () => clearInterval(mintIntervalId);
  }, [currentSupply, totalSupply]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}h:${minutes}m:${remainingSeconds}s`;
  };

  useEffect(() => {
    const countdownIntervalId = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);

    return () => clearInterval(countdownIntervalId);
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-900 p-5 rounded-lg shadow-md hover:shadow-lg max-w-sm mx-auto text-white">
      <div className="w-full overflow-hidden rounded-t-lg">
        <video
          className="w-full h-auto object-cover"
          src="/videos/bored&dangerous.mp4"
          alt="bored&dangerous"
          autoPlay
          loop
          muted
        ></video>
      </div>
      <div className="flex flex-col justify-between items-center w-full mt-4 text-center">
        <div className="mb-2">
          <p className="text-sm uppercase tracking-wider">Current Mint</p>
          <p className="text-2xl mt-1 font-bold">
            {currentSupply}/{totalSupply}
          </p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-wider">Ends in</p>
          <p className="text-2xl mt-1 font-bold">{formatTime(seconds)}</p>
        </div>
      </div>
      <div className="mt-6 w-full">
        <button className="w-full py-3 px-4 bg-purple-500 text-white font-bold rounded-b-lg shadow-md hover:bg-purple-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75">
          Mint Now
        </button>
      </div>
    </div>
  );
}
