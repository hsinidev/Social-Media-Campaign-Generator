
import React from 'react';
import type { CampaignResponse, InstagramPost } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { TwitterIcon } from './icons/TwitterIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { QuoraIcon } from './icons/QuoraIcon';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface CampaignResultsProps {
  response: CampaignResponse | null;
  isLoading: boolean;
  error: string | null;
}

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = React.useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button onClick={copyToClipboard} className="text-gray-400 hover:text-white transition-colors" title="Copy to clipboard">
      {copied ? <span className="text-xs text-green-400">Copied!</span> : <ClipboardIcon className="w-4 h-4" />}
    </button>
  );
};

const CampaignResults: React.FC<CampaignResultsProps> = ({ response, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[500px] bg-gray-800 rounded-lg p-8">
        <svg className="animate-spin h-12 w-12 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-lg text-gray-300">Generating your campaign...</p>
        <p className="text-sm text-gray-500">The AI is thinking ✨</p>
      </div>
    );
  }

  if (error) {
    return <div className="flex items-center justify-center h-full min-h-[500px] bg-red-900/20 border border-red-500 text-red-300 rounded-lg p-8">{error}</div>;
  }

  if (!response) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[500px] bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
         <SparklesIcon className="w-16 h-16 text-gray-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-300">Your Campaign Awaits</h3>
        <p className="text-gray-500 mt-2">Fill in the details on the left and click "Generate Campaign" to see the magic happen.</p>
      </div>
    );
  }

  const hasContent = response.tweets.length > 0 || response.instagram_posts.length > 0 || response.linkedin_post || response.facebook_post || response.quora_answer;

  if (!hasContent) {
     return (
        <div className="flex flex-col items-center justify-center h-full min-h-[500px] bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-300">No Platforms Selected</h3>
            <p className="text-gray-500 mt-2">Please select at least one social media platform to generate content.</p>
        </div>
     )
  }

  return (
    <div className="space-y-6">
      {response.tweets.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle><TwitterIcon className="w-6 h-6 mr-2" /> Twitter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {response.tweets.map((tweet, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-md flex justify-between items-start">
                <p className="text-gray-300 whitespace-pre-wrap">{tweet}</p>
                <CopyButton text={tweet} />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {response.instagram_posts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle><InstagramIcon className="w-6 h-6 mr-2" /> Instagram</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {response.instagram_posts.map((post: InstagramPost, index: number) => (
              <div key={index} className="bg-gray-800 p-4 rounded-md space-y-3">
                <div className="flex justify-between items-start">
                   <p className="text-gray-300 whitespace-pre-wrap">{post.caption}</p>
                   <CopyButton text={post.caption} />
                </div>
                <div className="bg-gray-700/50 p-3 rounded-md border-l-4 border-purple-500">
                    <p className="font-semibold text-sm text-purple-300 flex items-center"><LightbulbIcon className="w-4 h-4 mr-2" /> Image Idea</p>
                    <p className="text-gray-400 text-sm mt-1">{post.image_idea}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      
      {response.linkedin_post && (
        <Card>
          <CardHeader>
            <CardTitle><LinkedInIcon className="w-6 h-6 mr-2" /> LinkedIn</CardTitle>
            <CopyButton text={response.linkedin_post} />
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 whitespace-pre-wrap">{response.linkedin_post}</p>
          </CardContent>
        </Card>
      )}

      {response.facebook_post && (
        <Card>
          <CardHeader>
            <CardTitle><FacebookIcon className="w-6 h-6 mr-2" /> Facebook</CardTitle>
            <CopyButton text={response.facebook_post} />
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 whitespace-pre-wrap">{response.facebook_post}</p>
          </CardContent>
        </Card>
      )}

      {response.quora_answer && (
        <Card>
          <CardHeader>
            <CardTitle><QuoraIcon className="w-6 h-6 mr-2" /> Quora</CardTitle>
            <CopyButton text={response.quora_answer} />
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 whitespace-pre-wrap">{response.quora_answer}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CampaignResults;
