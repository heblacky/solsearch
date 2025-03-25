import { FC, useState } from 'react';
import Head from 'next/head';
import SolanticsNavbar from '../components/solexplore-navbar';
import DefiDashboardPreview from '../components/defi-dashboard-preview';
import { useWallet } from '@solana/wallet-adapter-react';
import { getAddressInfo, isValidSolanaAddress, TokenInfo } from '../services/solana-service';

const Home: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { connected } = useWallet();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!connected) {
      setError('Please connect your wallet to search');
      return;
    }
    
    if (!searchQuery.trim()) {
      setError('Please enter a Solana address or token contract');
      return;
    }

    setError(null);
    setIsLoading(true);
    
    try {
      if (!isValidSolanaAddress(searchQuery)) {
        throw new Error('Invalid Solana address format');
      }
      
      const info = await getAddressInfo(searchQuery);
      setTokenInfo(info);
      
      if (!info) {
        throw new Error('Could not find information for this address');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setTokenInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleSearch = (address: string) => {
    if (!connected) {
      setError('Please connect your wallet to search');
      return;
    }
    
    setSearchQuery(address);
    const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
    setTimeout(() => handleSearch(fakeEvent), 100);
  };

  return (
    <div className="min-h-screen relative">
      <div className="animated-bg" />
      
      <Head>
        <title>Solantics | Solana Analytics & DeFi Explorer</title>
        <meta name="description" content="Advanced Solana analytics, DeFi insights and memecoin visualization with interactive dashboards" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <SolanticsNavbar />
      
      <main className="container mx-auto px-4 pt-10 pb-20">
        <section className="text-center mt-10 mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text tracking-tight leading-tight">
            Solantics Analytics
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-300 max-w-3xl mx-auto font-light">
            Advanced Solana ecosystem insights with DeFi analytics and visualizations
          </p>
          
          <form onSubmit={handleSearch} className="mb-2">
            <div className="search-bar flex">
              <input
                type="text"
                placeholder="Enter Solana address or token contract..."
                className="w-full bg-transparent text-white p-3 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={!connected}
              />
              <button 
                type="submit"
                className="connect-wallet-btn"
                disabled={!connected}
              >
                Search
              </button>
            </div>
          </form>
          
          {!connected && (
            <div className="text-yellow-400 mt-2 p-4 rounded-lg bg-yellow-900/20 border border-yellow-800">
              Please connect your wallet above to search
            </div>
          )}
          
          {error && (
            <div className="text-red-400 mt-2">
              {error}
            </div>
          )}
          
          <div className="flex flex-wrap justify-center gap-3 mt-4 text-sm text-gray-400">
            <span>Try: </span>
            <button 
              className="text-purple-400 hover:underline"
              onClick={() => handleExampleSearch('So11111111111111111111111111111111111111112')}
              disabled={!connected}
            >
              Wrapped SOL
            </button>
            <button 
              className="text-purple-400 hover:underline"
              onClick={() => handleExampleSearch('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263')}
              disabled={!connected}
            >
              BONK
            </button>
          </div>
        </section>
        
        {tokenInfo && connected && (
          <div className="glassmorphism p-6 rounded-lg mb-16">
            <h2 className="text-2xl font-bold mb-4 gradient-text">Token Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Basic Info</h3>
                <p><span className="text-gray-400">Name:</span> {tokenInfo.name || 'Unknown'}</p>
                <p><span className="text-gray-400">Symbol:</span> {tokenInfo.symbol || 'N/A'}</p>
                <p><span className="text-gray-400">Address:</span> {tokenInfo.address}</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Supply</h3>
                <p><span className="text-gray-400">Total Supply:</span> {tokenInfo.supply?.toLocaleString() || 'N/A'}</p>
                <p><span className="text-gray-400">Holders:</span> {tokenInfo.holderCount?.toLocaleString() || 'N/A'}</p>
                <p><span className="text-gray-400">Decimals:</span> {tokenInfo.decimals || 'N/A'}</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Market</h3>
                <p><span className="text-gray-400">Price:</span> ${tokenInfo.price?.toFixed(4) || 'N/A'}</p>
                <p><span className="text-gray-400">Market Cap:</span> ${tokenInfo.marketCap?.toLocaleString() || 'N/A'}</p>
                <p><span className="text-gray-400">24h Volume:</span> ${tokenInfo.volume24h?.toLocaleString() || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}
        
        <DefiDashboardPreview />
        
        <section id="features" className="mt-20 pt-10">
          <h2 className="text-3xl font-bold mb-10 text-center gradient-text tracking-tight">
            Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="info-card">
              <h3 className="text-xl font-semibold mb-3 gradient-text tracking-tight">Memecoin Tracking</h3>
              <p className="text-gray-300 font-light">Track any memecoin on Solana with live market data and ownership analysis</p>
            </div>
            
            <div className="info-card">
              <h3 className="text-xl font-semibold mb-3 gradient-text tracking-tight">Wallet Analysis</h3>
              <p className="text-gray-300 font-light">Analyze wallet holdings and transaction patterns to gain insights</p>
            </div>
            
            <div className="info-card">
              <h3 className="text-xl font-semibold mb-3 gradient-text tracking-tight">Beautiful Infographics</h3>
              <p className="text-gray-300 font-light">Visualize token data with charts and graphics</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="glassmorphism p-6 mt-12 mx-4 mb-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Solantics - All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
