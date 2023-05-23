import { ConnectButton } from "@rainbow-me/rainbowkit";

export const RainbowConnectButton = () => {
  return (
    <div>
      <ConnectButton 
        accountStatus="full"
        chainStatus="full"
        showBalance={true}
      />
    </div>
  );
};
