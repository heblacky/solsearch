import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState, useEffect } from 'react';

export const ConnectWalletButton: FC = () => {
  const { wallet, publicKey, connected } = useWallet();
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    if (publicKey) {
      setAddress(publicKey.toBase58());
    }
  }, [publicKey]);

  return (
    <div className="relative">
      <WalletMultiButton className="connect-wallet-btn" />
      {connected && address && (
        <div className="absolute right-0 mt-2 p-2 glassmorphism text-sm">
          Connected: {address.slice(0, 4)}...{address.slice(-4)}
        </div>
      )}
    </div>
  );
};

export default ConnectWalletButton; 