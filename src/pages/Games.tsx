import React from 'react';
import GameCard from '../components/games/GameCard';
import { useNavigate } from 'react-router-dom';

export default function Games() {
  const navigate = useNavigate();

  const games = [
    {
      id: 1,
      title: 'Memory Match',
      description: 'Test your memory by matching pairs of cards. Complete levels to earn coins!',
      reward: 50,
      imageUrl: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80&w=1974',
    },
    {
      id: 2,
      title: 'Word Puzzle',
      description: 'Solve word puzzles and expand your vocabulary while earning rewards.',
      reward: 75,
      imageUrl: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?auto=format&fit=crop&q=80&w=2070',
    },
    {
      id: 3,
      title: 'Quick Math',
      description: 'Race against time to solve math problems and earn coins.',
      reward: 100,
      imageUrl: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&q=80&w=1974',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Available Games</h1>
        <p className="text-gray-600">Choose a game to play and earn coins!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <GameCard
            key={game.id}
            title={game.title}
            description={game.description}
            reward={game.reward}
            imageUrl={game.imageUrl}
            onPlay={() => navigate(`/games/${game.id}`)}
          />
        ))}
      </div>
    </div>
  );
}