import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Trophy, ArrowLeft } from 'lucide-react';

const CARDS = [
  '🎮', '🎲', '🎯', '🎪',
  '🎨', '🎭', '🎪', '🎨',
  '🎭', '🎯', '🎲', '🎮'
];

export default function MemoryMatch() {
  const navigate = useNavigate();
  const [cards, setCards] = useState(CARDS.sort(() => Math.random() - 0.5));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (matched.length === cards.length) {
      setIsComplete(true);
      toast.success('Congratulations! You completed the game!');
    }
  }, [matched, cards.length]);

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setMatched([...matched, ...newFlipped]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const resetGame = () => {
    setCards(CARDS.sort(() => Math.random() - 0.5));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setIsComplete(false);
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/games')}
            className="flex items-center text-gray-600 hover:text-indigo-600"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Games
          </button>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Moves: {moves}</span>
            <span className="flex items-center text-indigo-600">
              <Trophy className="w-5 h-5 mr-2" />
              50 coins reward
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <button
              key={index}
              onClick={() => handleCardClick(index)}
              className={`aspect-square text-4xl flex items-center justify-center rounded-xl transition-all transform ${
                flipped.includes(index) || matched.includes(index)
                  ? 'bg-white rotate-0'
                  : 'bg-indigo-600 rotate-180'
              }`}
            >
              <span className={flipped.includes(index) || matched.includes(index) ? '' : 'invisible'}>
                {card}
              </span>
            </button>
          ))}
        </div>

        {isComplete && (
          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Game Complete! 🎉
            </h3>
            <div className="space-x-4">
              <button
                onClick={resetGame}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Play Again
              </button>
              <button
                onClick={() => navigate('/games')}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Back to Games
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}