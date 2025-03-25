import { FC, useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import SolExploreNavbar from '../components/solexplore-navbar';
import TokenInfographics from '../components/token-infographics';
import DefiFeatures from '../components/defi-features';
import TokenNetwork from '../components/token-network';
import DefiDashboardPreview from '../components/defi-dashboard-preview';
import NewsletterSignup from '../components/newsletter-signup';
import { getAddressInfo, isValidSolanaAddress, TokenInfo } from '../services/solana-service';

const Home: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
      
      <SolExploreNavbar />
      
      <main className="container mx-auto px-4 pt-10 pb-20">
        <section className="text-center mt-10 mb-16">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 gradient-text tracking-tight leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Solantics Analytics
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-10 text-gray-300 max-w-3xl mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Advanced Solana ecosystem insights with DeFi analytics and beautiful visualizations
          </motion.p>
          
          <motion.form 
            onSubmit={handleSearch}
            className="mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="search-bar flex">
              <input
                type="text"
                placeholder="Enter Solana address or token contract..."
                className="w-full bg-transparent text-white p-3 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="connect-wallet-btn"
              >
                Search
              </button>
            </div>
          </motion.form>
          
          {error && (
            <motion.div 
              className="text-red-400 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}
          
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mt-4 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span>Try: </span>
            <button 
              className="text-purple-400 hover:underline"
              onClick={() => handleExampleSearch('So11111111111111111111111111111111111111112')}
            >
              Wrapped SOL
            </button>
            <button 
              className="text-purple-400 hover:underline"
              onClick={() => handleExampleSearch('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263')}
            >
              BONK
            </button>
          </motion.div>
        </section>
        
        <TokenInfographics tokenInfo={tokenInfo} isLoading={isLoading} />
        
        <DefiFeatures />
        
        <TokenNetwork />
        
        <DefiDashboardPreview />
        
        <section id="features" className="mt-20 pt-10">
          <motion.h2 
            className="text-3xl font-bold mb-10 text-center gradient-text tracking-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Features
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div 
              className="info-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-3 gradient-text tracking-tight">Memecoin Tracking</h3>
              <p className="text-gray-300 font-light">Track any memecoin on Solana with live market data and ownership analysis</p>
            </motion.div>
            
            <motion.div 
              className="info-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-3 gradient-text tracking-tight">Wallet Analysis</h3>
              <p className="text-gray-300 font-light">Analyze wallet holdings and transaction patterns to gain insights</p>
            </motion.div>
            
            <motion.div 
              className="info-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-3 gradient-text tracking-tight">Beautiful Infographics</h3>
              <p className="text-gray-300 font-light">Visualize token data with animated, interactive charts and graphics</p>
            </motion.div>
          </div>
        </section>
      </main>
      
      <NewsletterSignup />
      
      <footer className="glassmorphism p-6 mt-12 mx-4 mb-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} SolExplore - All rights reserved
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <svg 
                className="w-6 h-6 fill-current" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22.162 5.656a8.384 8.384 0 01-2.402.658A4.196 4.196 0 0021.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 00-7.126 3.814 11.874 11.874 0 01-8.62-4.37 4.168 4.168 0 00-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 01-1.894-.523v.052a4.185 4.185 0 003.355 4.101 4.21 4.21 0 01-1.89.072A4.185 4.185 0 007.97 16.65a8.394 8.394 0 01-6.191 1.732 11.83 11.83 0 006.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 002.087-2.165z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
