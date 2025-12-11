import React from 'react';
import type { CampaignData, PlatformsState } from '../types';
import { TwitterIcon } from './icons/TwitterIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { QuoraIcon } from './icons/QuoraIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface CampaignFormProps {
  campaignData: CampaignData;
  setCampaignData: React.Dispatch<React.SetStateAction<CampaignData>>;
  platforms: PlatformsState;
  setPlatforms: React.Dispatch<React.SetStateAction<PlatformsState>>;
  onGenerate: () => void;
  isLoading: boolean;
  disabled: boolean;
}

const CampaignForm: React.FC<CampaignFormProps> = ({
  campaignData,
  setCampaignData,
  platforms,
  setPlatforms,
  onGenerate,
  isLoading,
  disabled,
}) => {
  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCampaignData({ ...campaignData, [e.target.name]: e.target.value });
  };

  const handlePlatformChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlatforms({ ...platforms, [e.target.name]: e.target.checked });
  };

  return (
    <div className="p-8 space-y-8">
      <div className="border-b border-gray-700/50 pb-4 mb-6">
         <h2 className="text-2xl font-bold text-white tracking-tight">Campaign Details</h2>
         <p className="text-gray-400 text-sm mt-1">Define your product and voice.</p>
      </div>
      
      <div>
        <label htmlFor="productDescription" className="block text-sm font-semibold text-purple-300 mb-2 uppercase tracking-wider">Product Description</label>
        <textarea
          id="productDescription"
          name="productDescription"
          rows={4}
          value={campaignData.productDescription}
          onChange={handleDataChange}
          className="w-full bg-gray-950/50 border border-gray-700 rounded-xl p-4 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition placeholder-gray-600 outline-none backdrop-blur-sm resize-none shadow-inner"
          placeholder="e.g., A sleek, noise-cancelling headphone for coders."
        />
      </div>

      <div>
        <label htmlFor="brandVoice" className="block text-sm font-semibold text-purple-300 mb-2 uppercase tracking-wider">Brand Voice</label>
        <textarea
          id="brandVoice"
          name="brandVoice"
          rows={3}
          value={campaignData.brandVoice}
          onChange={handleDataChange}
          className="w-full bg-gray-950/50 border border-gray-700 rounded-xl p-4 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition placeholder-gray-600 outline-none backdrop-blur-sm resize-none shadow-inner"
          placeholder="e.g., Professional, witty, and tech-savvy."
        />
      </div>

      <div>
        <label htmlFor="authorName" className="block text-sm font-semibold text-purple-300 mb-2 uppercase tracking-wider">Author Name</label>
        <input
          type="text"
          id="authorName"
          name="authorName"
          value={campaignData.authorName}
          onChange={handleDataChange}
          className="w-full bg-gray-950/50 border border-gray-700 rounded-xl p-4 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition placeholder-gray-600 outline-none backdrop-blur-sm shadow-inner"
          placeholder="e.g., Your Company Name"
        />
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-purple-300 mb-3 uppercase tracking-wider">Select Platforms</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Object.entries({twitter: TwitterIcon, instagram: InstagramIcon, linkedin: LinkedInIcon, facebook: FacebookIcon, quora: QuoraIcon}).map(([key, Icon]) => (
            <label key={key} htmlFor={key} className={`group flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all border ${platforms[key as keyof PlatformsState] ? 'bg-gradient-to-br from-purple-900/80 to-indigo-900/80 border-purple-500 shadow-lg shadow-purple-900/30' : 'bg-gray-800/30 border-gray-700 hover:bg-gray-700/50 hover:border-gray-600'}`}>
              <input
                type="checkbox"
                id={key}
                name={key}
                checked={platforms[key as keyof PlatformsState]}
                onChange={handlePlatformChange}
                className="hidden"
              />
              <div className={`p-1.5 rounded-full ${platforms[key as keyof PlatformsState] ? 'bg-white text-purple-600' : 'bg-gray-700 text-gray-400 group-hover:text-white'} transition-colors`}>
                 <Icon className="w-4 h-4" />
              </div>
              <span className="capitalize text-sm font-medium text-white select-none">{key}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading || disabled}
        className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_auto] text-white font-bold py-4 px-6 rounded-xl hover:bg-right transition-all duration-500 shadow-xl shadow-purple-900/40 hover:shadow-purple-700/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-white/10"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Magic...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5 mr-2" />
            Generate Campaign
          </>
        )}
      </button>
    </div>
  );
};

export default CampaignForm;