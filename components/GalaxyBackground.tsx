import React from 'react';

const GalaxyBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#050510]">
      {/* Deep Space Base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1a40] via-[#050510] to-black opacity-90"></div>
      
      {/* Stars Layer */}
      <div className="stars opacity-70"></div>
      
      {/* Twinkling Layer */}
      <div className="twinkling opacity-30"></div>
      
      {/* Nebula/Color Accents - Multi-colored immersive effect */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow delay-1000"></div>
      <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-pink-900/10 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow delay-2000"></div>

      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-cyan-900/10 mix-blend-overlay"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#050510] to-transparent"></div>
      
      {/* Animated Clouds */}
      <div className="clouds opacity-10 mix-blend-color-dodge"></div>
    </div>
  );
};

export default GalaxyBackground;