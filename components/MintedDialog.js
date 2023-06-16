import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

export default function MintedDialog({ mintDataHash, txData }) {
  let [isOpen, setIsOpen] = useState(true);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const txDataHash = txData.to;
  const tokenId = parseInt(txData.logs[0].topics[3], 16);

  useEffect(() => {
    if (mintDataHash && txData) {
      openModal();
    }
  }, [mintDataHash, txData]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title className="text-2xl font-bold mb-4 text-red-500">
                  Mint Success
                </Dialog.Title>
                <div className="mb-4 text-gray-700">
                  <p>Congratulations! Your NFT has been successfully minted.</p>
                  <p>It will show up in your wallet in the next few minutes.</p>
                </div>
                <div className="mb-4 text-gray-700">
                  <p>
                    View on{" "}
                    <Link
                      href={`https://goerli.etherscan.io/tx/${mintDataHash}`}
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Etherscan
                    </Link>
                  </p>
                  <p>
                    View on{" "}
                    <Link
                      href={`https://testnets.opensea.io/assets/goerli/${txDataHash}/${tokenId}`}
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Opensea
                    </Link>
                  </p>
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
