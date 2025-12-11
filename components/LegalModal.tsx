import React from 'react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const contentMap: Record<string, React.ReactElement> = {
  "About": (
    <div className="space-y-4">
      <p className="text-lg">Welcome to <strong>Doodax</strong>, the premier destination for AI-driven marketing solutions.</p>
      <p>Our mission is to empower creators and businesses with tools that simplify the complex world of social media strategy. We believe in the democratization of high-quality marketing copy.</p>
      <div className="bg-gray-800 p-4 rounded-md mt-4 border border-gray-700">
        <p><strong>Website:</strong> <a href="https://doodax.com" className="text-purple-400 hover:underline">doodax.com</a></p>
        <p><strong>Email:</strong> <a href="mailto:hsini.web@gmail.com" className="text-purple-400 hover:underline">hsini.web@gmail.com</a></p>
      </div>
    </div>
  ),
  "Contact": (
    <div className="space-y-4">
      <p>We'd love to hear from you. Whether you have a feature request, a bug report, or a business proposal.</p>
      <div className="bg-gray-800 p-6 rounded-md border border-gray-700">
        <div className="mb-4">
           <span className="block text-gray-400 text-xs uppercase tracking-wider mb-1">Direct Email</span>
           <a href="mailto:hsini.web@gmail.com" className="text-purple-300 hover:text-white font-mono text-lg transition-colors">hsini.web@gmail.com</a>
        </div>
        <div>
           <span className="block text-gray-400 text-xs uppercase tracking-wider mb-1">Developer</span>
           <a href="https://github.com/hsinidev" target="_blank" rel="noreferrer" className="text-purple-300 hover:text-white font-mono text-lg transition-colors">github.com/hsinidev</a>
        </div>
      </div>
    </div>
  ),
  "Guide": (
    <div className="space-y-4">
      <h4 className="font-bold text-xl text-purple-300">How to use the generator:</h4>
      <ol className="list-decimal pl-5 space-y-4 text-gray-300">
        <li><strong className="text-white block">1. Input Details</strong> Enter your product details in the text area. Be descriptive for best results.</li>
        <li><strong className="text-white block">2. Set Tone</strong> Define your brand voice (e.g., "Professional", "Funny", "Dark").</li>
        <li><strong className="text-white block">3. Choose Platforms</strong> Toggle the icons for the social networks you want to target.</li>
        <li><strong className="text-white block">4. Generate</strong> Click the button and wait for the AI to craft your campaign.</li>
        <li><strong className="text-white block">5. Copy & Post</strong> Use the copy buttons to take the content to your social media apps.</li>
      </ol>
    </div>
  ),
  "Privacy Policy": (
    <div className="space-y-4 text-sm">
      <h4 className="font-bold text-lg text-white">Your Privacy Matters</h4>
      <p>At Doodax, we take your privacy seriously. We do not store the content you generate. All API calls are processed securely via Google Gemini and are stateless.</p>
      <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.</p>
      <div className="bg-gray-800 p-3 rounded text-xs text-gray-400">
        Contact for privacy concerns: hsini.web@gmail.com
      </div>
    </div>
  ),
  "Terms of Service": (
    <div className="space-y-4 text-sm">
      <p>By using this service, you agree not to generate harmful, illegal, abusive, or sexually explicit content.</p>
      <p>The AI generation is provided "as is" without warranty of any kind. Doodax is not responsible for the performance of the generated content on social media platforms.</p>
      <p>We reserve the right to terminate access to the service for misuse.</p>
    </div>
  ),
  "DMCA": (
    <div className="space-y-4 text-sm">
      <p>We respect intellectual property rights. If you believe your copyright has been infringed by content generated or displayed on this site, please contact us immediately.</p>
      <p><strong>Contact:</strong> hsini.web@gmail.com</p>
    </div>
  )
};

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0f172a] border border-purple-500/30 rounded-2xl shadow-2xl max-w-2xl w-full transform transition-all p-8 relative overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-600/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
             <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              {title}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-white transition-colors bg-gray-800 hover:bg-gray-700 rounded-full p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>

        {/* Big Caution Section */}
        <div className="bg-red-950/30 border border-red-500/50 p-4 mb-6 rounded-lg shadow-[0_0_15px_rgba(239,68,68,0.1)]">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-500 mt-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-bold text-red-400 uppercase tracking-wide">Google Compliance & Legal Notice</h3>
              <p className="text-xs text-red-200/80 mt-1 leading-relaxed">
                 Strict adherence to content policies is required. Information presented here is for transparency and compliance with Google's data protection and AI usage standards. Please review the specific section below carefully before proceeding.
              </p>
            </div>
          </div>
        </div>

        <div className="text-gray-300 overflow-y-auto custom-scrollbar pr-2 leading-relaxed flex-grow">
          {contentMap[title] || <p>Loading information...</p>}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-800 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-200 transition-colors shadow-lg text-sm"
          >
            Close & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;