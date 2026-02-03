import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import BackgroundHearts from './components/BackgroundHearts';
import ProposalCard from './components/ProposalCard';
import SuccessCard from './components/SuccessCard';

const App: React.FC = () => {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-rose-950 via-pink-800 to-rose-400 flex items-center justify-center selection:bg-rose-500 selection:text-white">
      
      {/* Dynamic Background */}
      <BackgroundHearts />

      {/* Main Content Layer */}
      <div className="relative z-10 w-full flex justify-center items-center px-4">
        <AnimatePresence mode="wait">
          {!accepted ? (
            <ProposalCard key="proposal" onAccept={() => setAccepted(true)} />
          ) : (
            <SuccessCard key="success" />
          )}
        </AnimatePresence>
      </div>

      {/* Footer / Credits */}
      <div className="absolute bottom-4 text-white/30 text-xs font-sans pointer-events-none">
         Made with ❤️
      </div>
    </div>
  );
};

export default App;