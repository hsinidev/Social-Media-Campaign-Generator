import React, { useState, useCallback } from 'react';
import type { CampaignData, CampaignResponse, PlatformsState } from './types';
import { generateCampaign } from './services/geminiService';
import CampaignForm from './components/CampaignForm';
import CampaignResults from './components/CampaignResults';
import GalaxyBackground from './components/GalaxyBackground';
import LegalModal from './components/LegalModal';
import SeoArticle from './components/SeoArticle';
import { SparklesIcon } from './components/icons/SparklesIcon';

export default function App() {
  const [campaignData, setCampaignData] = useState<CampaignData>({
    productDescription: 'A productivity app that uses AI to organize your tasks and schedule.',
    brandVoice: 'Witty, helpful, and slightly futuristic.',
    authorName: 'Code Vibe Assistant',
  });

  const [platforms, setPlatforms] = useState<PlatformsState>({
    twitter: true,
    instagram: true,
    linkedin: false,
    facebook: false,
    quora: false,
  });

  const [campaignResponse, setCampaignResponse] = useState<CampaignResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Modal State
  const [modalTitle, setModalTitle] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (title: string) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setCampaignResponse(null);
    try {
      const response = await generateCampaign(campaignData, platforms);
      setCampaignResponse(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [campaignData, platforms]);

  return (
    <div className="min-h-screen text-gray-100 font-sans relative flex flex-col">
      <GalaxyBackground />
      <LegalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalTitle} />

      <main className="container mx-auto px-4 py-12 relative z-10 max-w-6xl flex-grow">
        
        {/* Centralized Header */}
        <header className="text-center mb-16 flex flex-col items-center justify-center">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8 shadow-xl hover:scale-105 transition-transform duration-300 group cursor-default">
             <SparklesIcon className="w-5 h-5 text-purple-400 mr-2 group-hover:text-pink-400 transition-colors" />
             <span className="text-purple-200 font-medium tracking-wide text-xs uppercase group-hover:text-white transition-colors">AI-Powered Marketing Engine</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-200 via-pink-300 to-indigo-300 text-transparent bg-clip-text drop-shadow-2xl mb-6 leading-tight max-w-4xl tracking-tight">
            Social Media Campaign Generator
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            Craft <span className="text-white font-medium border-b border-purple-500/50">viral campaigns</span> with the power of artificial intelligence. Simplify your workflow, engage your audience, and scale your brand voice instantly.
          </p>
        </header>

        {/* Main Application Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-24">
          <div className="lg:col-span-4">
            <div className="sticky top-8 backdrop-blur-xl bg-gray-900/60 rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden ring-1 ring-white/10 transition-all hover:shadow-purple-900/20">
               <CampaignForm
                campaignData={campaignData}
                setCampaignData={setCampaignData}
                platforms={platforms}
                setPlatforms={setPlatforms}
                onGenerate={handleGenerate}
                isLoading={isLoading}
                disabled={!campaignData.productDescription || !campaignData.brandVoice || !campaignData.authorName}
              />
            </div>
          </div>

          <div className="lg:col-span-8">
            <CampaignResults
              response={campaignResponse}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
        
        {/* Extensive SEO Article */}
        <SeoArticle />

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-800/50 bg-black/60 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            
            {/* Footer Left */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Doodax
              </h3>
              <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                Automating creativity for the modern web. Built for speed, privacy, and scale.
              </p>
              <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400 font-medium pt-2">
                {['About', 'Contact', 'Guide', 'Privacy Policy', 'Terms of Service', 'DMCA'].map((item) => (
                  <button 
                    key={item}
                    onClick={() => openModal(item)}
                    className="hover:text-purple-400 transition-colors duration-200 relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Footer Right */}
            <div className="flex flex-col items-start md:items-end gap-3">
              <a 
                href="https://github.com/hsinidev"
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col items-end text-right"
              >
                <span className="text-gray-500 text-xs uppercase tracking-wider mb-1">Developed & Designed by</span>
                <span className="text-white font-bold tracking-wide group-hover:text-purple-400 transition-colors">HSINI MOHAMED</span>
              </a>
              
              <a 
                href="https://github.com/hsinidev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center space-x-2 text-xs text-purple-300 hover:text-white transition-all bg-purple-900/20 hover:bg-purple-600/80 px-4 py-2 rounded-full border border-purple-500/30 hover:border-purple-400"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                <span>github.com/hsinidev</span>
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-gray-800 text-xs text-gray-600">
             <p>&copy; {new Date().getFullYear()} Doodax. All rights reserved.</p>
             <p className="mt-2 md:mt-0">Powered by Google Gemini</p>
          </div>
        </div>
      </footer>
    </div>
  );
}