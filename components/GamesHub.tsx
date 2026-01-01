
import React, { useState } from 'react';
import MathSprint from './Games/MathSprint';
import PatternRecall from './Games/PatternRecall';
import ColorClash from './Games/ColorClash';
import RiddleMaster from './Games/RiddleMaster';

const GamesHub: React.FC = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const games = [
    { 
      id: 'math', 
      name: 'Math Sprint', 
      desc: 'Test your calculation speed', 
      icon: 'fa-calculator', 
      color: 'from-orange-500 to-red-600' 
    },
    { 
      id: 'pattern', 
      name: 'Pattern Recall', 
      desc: 'Memory and sequence mastery', 
      icon: 'fa-th-large', 
      color: 'from-blue-500 to-indigo-600' 
    },
    { 
      id: 'color', 
      name: 'Color Clash', 
      desc: 'Cognitive focus training', 
      icon: 'fa-palette', 
      color: 'from-purple-500 to-pink-600' 
    },
    { 
      id: 'riddle', 
      name: 'Riddle Master', 
      desc: 'AI-powered logic puzzles', 
      icon: 'fa-brain', 
      color: 'from-emerald-500 to-teal-600' 
    },
  ];

  if (activeGame) {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => setActiveGame(null)}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <i className="fa-solid fa-arrow-left"></i>
          Back to Hub
        </button>
        {activeGame === 'math' && <MathSprint />}
        {activeGame === 'pattern' && <PatternRecall />}
        {activeGame === 'color' && <ColorClash />}
        {activeGame === 'riddle' && <RiddleMaster />}
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Mind Testing Center</h1>
        <p className="text-white/60">Challenge your brain with these 4 specialized training modules</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => setActiveGame(game.id)}
            className="group relative flex flex-col items-start p-8 glass rounded-3xl overflow-hidden hover:scale-[1.02] transition-all text-left border border-white/5"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${game.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`}></div>
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center mb-6 shadow-lg`}>
              <i className={`fa-solid ${game.icon} text-2xl`}></i>
            </div>
            <h3 className="text-xl font-bold mb-2">{game.name}</h3>
            <p className="text-white/50 text-sm">{game.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GamesHub;
