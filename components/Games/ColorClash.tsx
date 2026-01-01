
import React, { useState, useEffect } from 'react';

const COLORS = [
  { name: 'RED', class: 'text-red-500', bg: 'bg-red-600' },
  { name: 'BLUE', class: 'text-blue-500', bg: 'bg-blue-600' },
  { name: 'GREEN', class: 'text-green-500', bg: 'bg-green-600' },
  { name: 'YELLOW', class: 'text-yellow-400', bg: 'bg-yellow-500' },
  { name: 'PURPLE', class: 'text-purple-500', bg: 'bg-purple-600' },
];

const ColorClash: React.FC = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [current, setCurrent] = useState({ text: 0, color: 0 });
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'ended'>('idle');

  const next = () => {
    setCurrent({
      text: Math.floor(Math.random() * COLORS.length),
      color: Math.floor(Math.random() * COLORS.length),
    });
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) setGameState('ended');
  }, [gameState, timeLeft]);

  const handleAnswer = (colorIdx: number) => {
    if (colorIdx === current.color) {
      setScore(s => s + 1);
      next();
    } else {
      setScore(s => Math.max(0, s - 1));
      next();
    }
  };

  return (
    <div className="glass p-12 rounded-3xl text-center max-w-lg mx-auto border border-white/10">
      <h2 className="text-2xl font-bold mb-2">Color Clash</h2>
      <p className="text-white/50 text-sm mb-8">Click the button matching the TEXT COLOR, not the word.</p>

      {gameState === 'idle' ? (
        <button onClick={() => { setScore(0); setTimeLeft(20); next(); setGameState('playing'); }} className="w-full py-4 bg-purple-600 rounded-2xl font-bold">Start Focus Test</button>
      ) : gameState === 'ended' ? (
        <div className="space-y-6">
          <div className="text-6xl font-black text-purple-500">{score}</div>
          <p className="text-white/60">Final Focus Score</p>
          <button onClick={() => { setScore(0); setTimeLeft(20); next(); setGameState('playing'); }} className="w-full py-4 bg-purple-600 rounded-2xl font-bold">Try Again</button>
        </div>
      ) : (
        <div className="space-y-12">
          <div className="text-xl font-bold text-white/50">TIME: {timeLeft}s | SCORE: {score}</div>
          <div className={`text-7xl font-black tracking-widest ${COLORS[current.color].class}`}>
            {COLORS[current.text].name}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {COLORS.map((c, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={`py-4 rounded-xl font-bold text-sm ${c.bg} hover:opacity-80 transition-opacity`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorClash;
