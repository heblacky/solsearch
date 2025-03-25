import { FC } from 'react';
import Link from 'next/link';
import ConnectWalletButton from './connect-wallet-button';
import { motion } from 'framer-motion';

// Logo component that combines blockchain and magnifying glass
const BlockchainSearchLogo: FC = () => {
  return (
    <svg 
      width="40" 
      height="40" 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="text-white"
    >
      {/* Magnifying glass handle */}
      <motion.path 
        d="M32 32L24 24" 
        stroke="url(#logoGradient)" 
        strokeWidth="3" 
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      />

      {/* Blockchain nodes */}
      <motion.circle 
        cx="12" cy="15" r="3" 
        fill="url(#logoGradient)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
      <motion.circle 
        cx="20" cy="10" r="3" 
        fill="url(#logoGradient)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      />
      <motion.circle 
        cx="18" cy="20" r="3" 
        fill="url(#logoGradient)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      />
      <motion.circle 
        cx="10" cy="25" r="3" 
        fill="url(#logoGradient)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      />

      {/* Connections between nodes */}
      <motion.path 
        d="M12 15L20 10M20 10L18 20M18 20L10 25M10 25L12 15" 
        stroke="url(#logoGradient)" 
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />

      {/* Magnifying glass circle */}
      <motion.circle 
        cx="16" cy="16" r="10" 
        stroke="url(#logoGradient)" 
        strokeWidth="2.5" 
        fill="transparent"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Gradient definition */}
      <defs>
        <linearGradient id="logoGradient" x1="8" y1="8" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="0.5" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const SolExploreNavbar: FC = () => {
  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <motion.div
              className="mr-2 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <BlockchainSearchLogo />
            </motion.div>
            <motion.span 
              className="text-2xl font-bold gradient-text tracking-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              SolExplore
            </motion.span>
          </Link>
        </div>
        
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="text-white hover:text-purple-400 transition-colors font-medium">
            Home
          </Link>
          <Link href="#features" className="text-white hover:text-purple-400 transition-colors font-medium">
            Features
          </Link>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400 transition-colors"
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
        
        <div className="flex items-center gap-4">
          <ConnectWalletButton />
          <button className="md:hidden text-white">
            <svg 
              className="w-6 h-6 fill-current" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default SolExploreNavbar; 