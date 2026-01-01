
import React, { useState, useEffect } from 'react';

const MathSprint: React.FC = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [problem, setProblem] = useState({ q: '', a: 0 });
  const [userInput, setUserInput] = useState('');
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'ended'>('idle');

  const generateProblem = () => {
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * 3)];
    let n1, n2;
    if (op === '*') {
      n1 = Math.floor(Math.random() * 12) + 2;
      n2 = Math.floor(Math.random() * 12) + 2;
    } else {
      n1 = Math.floor(Math.random() * 50) + 1;
      n2 = Math.floor(Math.random() * 50) + 1;
    }
    const a = eval(`${n1} ${op} ${n2}`);
    setProblem({ q: `${n1} ${op === '*' ? '×' : op} ${n2}`, a });
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameState('ended');
    }
  }, [gameState, timeLeft]);

  const start = () => {
    setScore(0);
    setTimeLeft(30);
    generateProblem();
    setGameState('playing');
  };

  const handleInput = (val: string) => {
    setUserInput(val);
    if (parseInt(val) === problem.a) {
      setScore(s => s + 1);
      setUserInput('');
      generateProblem();
    }
  };

  return (
    <div className="glass p-12 rounded-3xl text-center max-w-lg mx-auto border border-white/10">
      {gameState === 'idle' && (
        <div className="space-y-6">
          <i className="fa-solid fa-calculator text-5xl text-orange-500 mb-4"></i>
          <h2 className="text-2xl font-bold">Math Sprint</h2>
          <p className="text-white/60">Solve as many simple equations as you can in 30 seconds.</p>
          <button onClick={start} className="w-full py-4 bg-orange-600 rounded-2xl font-bold">Start Sprint</button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="space-y-8">
          <div className="flex justify-between items-center px-4">
            <div className="text-sm font-bold text-white/50">SCORE: {score}</div>
            <div className={`text-xl font-bold ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-orange-400'}`}>
              00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </div>
          </div>
          <div className="text-6xl font-black py-8 tracking-wider">{problem.q}</div>
          <input
            autoFocus
            type="number"
            value={userInput}
            onChange={(e) => handleInput(e.target.value)}
            className="w-full bg-white/5 border-2 border-orange-500/30 rounded-2xl py-6 text-center text-4xl font-bold focus:outline-none focus:border-orange-500 transition-all"
            placeholder="?"
          />
        </div>
      )}

      {gameState === 'ended' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Time's Up!</h2>
          <div className="text-6xl font-black text-orange-500">{score}</div>
          <p className="text-white/60">Total Problems Solved</p>
          <button onClick={start} className="w-full py-4 bg-orange-600 rounded-2xl font-bold">Play Again</button>
        </div>
      )}
    </div>
  );
};

export default MathSprint;
