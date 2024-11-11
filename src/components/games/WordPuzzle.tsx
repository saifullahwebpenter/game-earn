import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Trophy, ArrowLeft } from 'lucide-react';

const WORDS = [
  { word: 'GAMING', hint: 'What we love to do' },
  { word: 'PUZZLE', hint: 'Brain teaser' },
  { word: 'PLAYER', hint: 'Someone who participates' },
  { word: 'POINTS', hint: 'You earn these' },
];

export default function WordPuzzle() {
  const navigate = useNavigate();
  const [currentWord, setCurrentWord] = useState(WORDS[0]);
  const [scrambled, setScrambled] = useState('');
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    scrambleWord();
  }, [currentWord]);

  const scrambleWord = () => {
    const shuffled = currentWord.word
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
    setScrambled(shuffled);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.toUpperCase() === currentWord.word) {
      toast.success('Correct!');
      setScore(s => s + 1);
      if (score + 1 === WORDS.length) {
        toast.success('Congratulations! You completed all words!');
      } else {
        setCurrentWord(WORDS[score + 1]);
      }
      setGuess('');
    } else {
      toast.error('Try again!');
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/games')}
            className="flex items-center text-gray-600 hover:text-indigo-600"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Games
          </button>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Score: {score}/{WORDS.length}</span>
            <span className="flex items-center text-indigo-600">
              <Trophy className="w-5 h-5 mr-2" />
              75 coins reward
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold mb-6">Unscramble the Word</h2>
          <p className="text-gray-600 mb-4">Hint: {currentWord.hint}</p>
          <p className="text-4xl font-mono mb-8">{scrambled}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your guess"
            />
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}