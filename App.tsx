
import React, { useState, useEffect } from 'react';
import { Tab } from './types';
import ChatInterface from './components/ChatInterface';
import ImageGenerator from './components/ImageGenerator';
import GamesHub from './components/GamesHub';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('chat');

  return (
    <div className="min-h-screen text-white relative">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full"></div>
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between glass px-6 py-3 rounded-full">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-robot text-white text-xs"></i>
            </div>
            <span className="font-bold text-xl tracking-tight">RISHU AI</span>
          </div>

          <div className="flex items-center gap-4">
            <NavButton 
              active={activeTab === 'chat'} 
              onClick={() => setActiveTab('chat')} 
              icon="fa-message" 
              label="Chat" 
            />
            <NavButton 
              active={activeTab === 'images'} 
              onClick={() => setActiveTab('images')} 
              icon="fa-image" 
              label="Images" 
            />
            <NavButton 
              active={activeTab === 'games'} 
              onClick={() => setActiveTab('games')} 
              icon="fa-gamepad" 
              label="Games" 
            />
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-4 max-w-5xl mx-auto relative z-10">
        {activeTab === 'chat' && <ChatInterface />}
        {activeTab === 'images' && <ImageGenerator />}
        {activeTab === 'games' && <GamesHub />}
      </main>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: string; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all ${
      active ? 'bg-white/10 text-white shadow-lg' : 'text-white/50 hover:text-white/80 hover:bg-white/5'
    }`}
  >
    <i className={`fa-solid ${icon} text-sm`}></i>
    <span className="text-sm font-medium hidden sm:inline">{label}</span>
  </button>
);

export default App;
