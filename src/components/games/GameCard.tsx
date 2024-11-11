import React from 'react';
import { Trophy } from 'lucide-react';

interface GameCardProps {
  title: string;
  description: string;
  reward: number;
  imageUrl: string;
  onPlay: () => void;
}

export default function GameCard({ title, description, reward, imageUrl, onPlay }: GameCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-indigo-600">
            <Trophy className="w-5 h-5 mr-2" />
            <span>{reward} coins reward</span>
          </div>
          <button
            onClick={onPlay}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Play Now
          </button>
        </div>
      </div>
    </div>
  );
}