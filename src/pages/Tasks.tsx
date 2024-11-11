import React from 'react';
import { CheckCircle, Clock, Trophy } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Tasks() {
  const tasks = [
    {
      id: 1,
      title: 'Complete 5 Games',
      description: 'Play and finish 5 different games',
      reward: 100,
      progress: 3,
      total: 5,
      status: 'in-progress',
    },
    {
      id: 2,
      title: 'Invite Friends',
      description: 'Invite 3 friends to join the platform',
      reward: 150,
      progress: 1,
      total: 3,
      status: 'in-progress',
    },
    {
      id: 3,
      title: 'Daily Login',
      description: 'Log in for 7 consecutive days',
      reward: 200,
      progress: 7,
      total: 7,
      status: 'completed',
    },
  ];

  const handleClaimReward = (taskId: number) => {
    toast.success('Reward claimed successfully!');
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
        <p className="text-gray-600">Complete tasks to earn additional coins</p>
      </div>

      <div className="grid gap-6">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  {task.status === 'completed' && (
                    <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                  )}
                </div>
                <p className="text-gray-600 mb-4">{task.description}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-indigo-600">
                    <Trophy className="w-5 h-5 mr-2" />
                    <span>{task.reward} coins</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>Progress: {task.progress}/{task.total}</span>
                  </div>
                </div>
              </div>
              {task.status === 'completed' && (
                <button
                  onClick={() => handleClaimReward(task.id)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Claim Reward
                </button>
              )}
            </div>
            {task.status === 'in-progress' && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${(task.progress / task.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}