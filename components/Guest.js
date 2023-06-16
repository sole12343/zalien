import Image from "next/image";

const Guest = () => {
  const contractAddress = "0x467415edf9fee95f206b44fc4dfbb34f55faa352";
  const etherscanLink = `https://etherscan.io/address/${contractAddress}`;
  const twitterLink = "https://twitter.com/0xTycoon";
  const twitterHandle = "@0xTycoon";

  return (
    <div className="flex flex-col items-center md:flex-row justify-between mt-40 mx-4 md:mx-80">
      <div className="flex flex-col items-center md:items-start">
        <h1 className="text-3xl md:text-6xl font-almendra text-white">
          Special{" "}
          <span className="text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text leading-[106px] font-black">
            Guest
          </span>
        </h1>
        <div className="mt-4">
          <p className="text-gray-400 text-base md:text-lg mt-12">
            VERIFIED CONTRACT ADDRESS:
          </p>
          <a
            href={etherscanLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 text-base md:text-lg underline"
          >
            {contractAddress}
          </a>
          <p className="text-gray-400 text-base md:text-lg mt-2">
            VERIFIED BY CRYPTOPUNKS #4513 {" "}
            <a
              href={twitterLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 text-base md:text-lg underline"
            >
              {twitterHandle}
            </a>
          </p>
        </div>
      </div>
      <div className="mt-8 ml-16 md:mt-0">
        <Image src="/images/punk.png" alt="Guest" width={400} height={400} />
      </div>
    </div>
  );
};

export default Guest;
