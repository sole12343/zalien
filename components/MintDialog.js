import { Dialog, Transition } from "@headlessui/react";
import { ethers } from "ethers";
import { Fragment, useEffect, useState } from "react";

export default function MintDialog({ errorMessage }) {
  let [isOpen, setIsOpen] = useState(true);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const matchError = (error) => {
    const mintRegex =
      /The contract function "mint" reverted with the following reason:\n(.+?)\n\nContract Call:/;
    const bluechipMintRegex =
      /The contract function "blueChipMint" reverted with the following reason:\n(.+?)\n\nContract Call:/;
    const signatureRegex = /Request Arguments:[\s\S]+?\n\nDetails: (.+)/;
    const balanceRegex =
      /insufficient funds for gas \* price \+ value: address [\w]+ have ([\d]+) want ([\d]+)/;

    const mintMatch = error.match(mintRegex);
    if (mintMatch?.[1]) {
      return mintMatch[1];
    }
    const bluechipMintMatch = error.match(bluechipMintRegex);
    if (bluechipMintMatch?.[1]) {
      return bluechipMintMatch[1];
    }

    const signatureMatch = error.match(signatureRegex);
    if (signatureMatch?.[1]) {
      return signatureMatch[1];
    }

    const balanceMatch = error.match(balanceRegex);
    if (balanceMatch?.[1] && balanceMatch?.[2]) {
      const accountBalance = ethers
        .formatEther(balanceMatch[1])
        .substring(0, 5);
      const requiredBalance = ethers
        .formatEther(balanceMatch[2])
        .substring(0, 5);
      return `Insufficient funds. Account balance: ${accountBalance} ETH . Required balance: ${requiredBalance} ETH .`;
    }

    return "";
  };

  useEffect(() => {
    if (errorMessage && matchError(errorMessage)) {
      openModal();
    }
  }, [errorMessage]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold mb-4 text-red-500"
                  >
                    Mint Error
                  </Dialog.Title>
                  <div className="mb-4">
                    <p className="text-gray-700">{matchError(errorMessage)}</p>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm font-medium"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
