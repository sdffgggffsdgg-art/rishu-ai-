
import React, { useState, useEffect } from 'react';
import { getGeminiResponse } from '../../services/gemini';

const RiddleMaster: React.FC = () => {
  const [riddle, setRiddle] = useState<{ q: string, a: string } | null>(null);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);

  const fetchRiddle = async () => {
    setLoading(true);
    setFeedback(null);
    setUserInput('');
    try {
      const response = await getGeminiResponse("Generate a short, challenging riddle. Format the output as JSON: { \"q\": \"The riddle text\", \"a\": \"The single word answer\" }");
      const data = JSON.parse(response || '{}');
      setRiddle(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiddle();
  }, []);

  const checkAnswer = () => {
    if (!riddle) return;
    const isCorrect = userInput.toLowerCase().includes(riddle.a.toLowerCase());
    if (isCorrect) {
      setFeedback("Correct! You're a genius! ✨");
      setScore(s => s + 1);
    } else {
      setFeedback(`Not quite. The answer was "${riddle.a}".`);
    }
  };

  return (
    <div className="glass p-12 rounded-3xl text-center max-w-2xl mx-auto border border-white/10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Riddle Master</h2>
        <div className="bg-emerald-500/20 text-emerald-400 px-4 py-1 rounded-full text-xs font-bold">SCORE: {score}</div>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center gap-4">
          <i className="fa-solid fa-brain text-4xl text-emerald-500 animate-pulse"></i>
          <p className="text-white/40">AI is thinking of a riddle...</p>
        </div>
      ) : riddle ? (
        <div className="space-y-8">
          <div className="text-xl leading-relaxed font-medium italic text-white/90">"{riddle.q}"</div>
          
          {!feedback ? (
            <div className="space-y-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                placeholder="Type your answer..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 text-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button onClick={checkAnswer} className="w-full py-4 bg-emerald-600 rounded-2xl font-bold">Submit Answer</button>
            </div>
          ) : (
            <div className="space-y-6 animate-in zoom-in-95 duration-300">
              <div className={`text-lg font-bold ${feedback.includes('Correct') ? 'text-emerald-400' : 'text-red-400'}`}>
                {feedback}
              </div>
              <button onClick={fetchRiddle} className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-bold transition-colors">Next Riddle</button>
            </div>
          )}
        </div>
      ) : (
        <button onClick={fetchRiddle} className="w-full py-4 bg-emerald-600 rounded-2xl font-bold">Start Game</button>
      )}
    </div>
  );
};

export default RiddleMaster;
