
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
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-6 sticky top-8">
      <h2 className="text-2xl font-bold text-white">Campaign Details</h2>
      
      <div>
        <label htmlFor="productDescription" className="block text-sm font-medium text-gray-300 mb-1">Product Description</label>
        <textarea
          id="productDescription"
          name="productDescription"
          rows={4}
          value={campaignData.productDescription}
          onChange={handleDataChange}
          className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
          placeholder="e.g., A sleek, noise-cancelling headphone for coders."
        />
      </div>

      <div>
        <label htmlFor="brandVoice" className="block text-sm font-medium text-gray-300 mb-1">Brand Voice</label>
        <textarea
          id="brandVoice"
          name="brandVoice"
          rows={3}
          value={campaignData.brandVoice}
          onChange={handleDataChange}
          className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
          placeholder="e.g., Professional, witty, and tech-savvy."
        />
      </div>

      <div>
        <label htmlFor="authorName" className="block text-sm font-medium text-gray-300 mb-1">Author Name</label>
        <input
          type="text"
          id="authorName"
          name="authorName"
          value={campaignData.authorName}
          onChange={handleDataChange}
          className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
          placeholder="e.g., Your Company Name"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Select Platforms</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Object.entries({twitter: TwitterIcon, instagram: InstagramIcon, linkedin: LinkedInIcon, facebook: FacebookIcon, quora: QuoraIcon}).map(([key, Icon]) => (
            <label key={key} htmlFor={key} className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors ${platforms[key as keyof PlatformsState] ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
              <input
                type="checkbox"
                id={key}
                name={key}
                checked={platforms[key as keyof PlatformsState]}
                onChange={handlePlatformChange}
                className="hidden"
              />
              <Icon className="w-5 h-5" />
              <span className="capitalize text-sm font-medium">{key}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading || disabled}
        className="w-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-300"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
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
