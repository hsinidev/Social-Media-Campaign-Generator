
import React, { useState, useCallback } from 'react';
import type { CampaignData, CampaignResponse, PlatformsState } from './types';
import { generateCampaign } from './services/geminiService';
import CampaignForm from './components/CampaignForm';
import CampaignResults from './components/CampaignResults';
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
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <main className="container mx-auto px-4 py-8">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-4">
             <SparklesIcon className="w-10 h-10 text-purple-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              Social Media Campaign Generator
            </h1>
          </div>
          <p className="mt-4 text-lg text-gray-400">
            Craft viral campaigns with AI. Fill the details, select your platforms, and let the magic happen.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
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

          <div className="lg:col-span-8">
            <CampaignResults
              response={campaignResponse}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
        
        <footer className="text-center mt-12 text-gray-500">
          <p>Powered by Gemini & HSINI MOHAMED</p>
        </footer>
      </main>
    </div>
  );
}
