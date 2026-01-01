
import React, { useState, useEffect } from 'react';

const PatternRecall: React.FC = () => {
  const [gridSize] = useState(4);
  const [level, setLevel] = useState(3);
  const [pattern, setPattern] = useState<number[]>([]);
  const [userSelection, setUserSelection] = useState<number[]>([]);
  const [status, setStatus] = useState<'showing' | 'playing' | 'idle' | 'failed'>('idle');

  const startLevel = (nextLevel: number) => {
    const newPattern: number[] = [];
    while (newPattern.length < nextLevel) {
      const r = Math.floor(Math.random() * 16);
      if (!newPattern.includes(r)) newPattern.push(r);
    }
    setPattern(newPattern);
    setUserSelection([]);
    setStatus('showing');
    setTimeout(() => setStatus('playing'), 2000);
  };

  const handleTileClick = (idx: number) => {
    if (status !== 'playing') return;
    if (pattern.includes(idx)) {
      if (!userSelection.includes(idx)) {
        const next = [...userSelection, idx];
        setUserSelection(next);
        if (next.length === pattern.length) {
          setLevel(l => l + 1);
          setTimeout(() => startLevel(level + 1), 500);
        }
      }
    } else {
      setStatus('failed');
    }
  };

  return (
    <div className="glass p-12 rounded-3xl text-center max-w-lg mx-auto border border-white/10">
      <h2 className="text-2xl font-bold mb-2">Pattern Recall</h2>
      <p className="text-white/50 text-sm mb-8">Memorize the highlighted tiles</p>

      {status === 'idle' ? (
        <button onClick={() => startLevel(3)} className="w-full py-4 bg-blue-600 rounded-2xl font-bold">Start Memory Test</button>
      ) : status === 'failed' ? (
        <div className="space-y-6">
          <div className="text-4xl font-bold text-red-500">FAILED!</div>
          <p className="text-white/60">You reached level {level - 2}</p>
          <button onClick={() => { setLevel(3); startLevel(3); }} className="w-full py-4 bg-blue-600 rounded-2xl font-bold">Try Again</button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 16 }).map((_, i) => (
            <button
              key={i}
              onClick={() => handleTileClick(i)}
              className={`aspect-square rounded-xl transition-all duration-300 ${
                status === 'showing' && pattern.includes(i) 
                  ? 'bg-blue-400 scale-95 shadow-[0_0_15px_rgba(96,165,250,0.5)]' 
                  : userSelection.includes(i)
                  ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PatternRecall;
