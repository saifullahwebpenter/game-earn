import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Target, Users, Wallet } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const stats = [
    { 
      title: 'Balance', 
      value: `${user?.balance || 0} coins`, 
      icon: Wallet,
      color: 'bg-green-100 text-green-600',
      onClick: () => navigate('/wallet')
    },
    { 
      title: 'Active Tasks', 
      value: '3', 
      icon: Target,
      color: 'bg-blue-100 text-blue-600',
      onClick: () => navigate('/tasks')
    },
    { 
      title: 'Games Played', 
      value: '12', 
      icon: Trophy,
      color: 'bg-purple-100 text-purple-600',
      onClick: () => navigate('/games')
    },
    { 
      title: 'Referrals', 
      value: '2', 
      icon: Users,
      color: 'bg-orange-100 text-orange-600',
      onClick: () => navigate('/referrals')
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.email}</h1>
        <p className="text-gray-600">Here's an overview of your gaming journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <button
            key={stat.title}
            onClick={stat.onClick}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="ml-4 text-left">
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Completed Memory Match</p>
                <p className="text-sm text-gray-600">2 minutes ago</p>
              </div>
              <span className="text-green-600 font-medium">+50 coins</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Daily Login Bonus</p>
                <p className="text-sm text-gray-600">1 hour ago</p>
              </div>
              <span className="text-green-600 font-medium">+10 coins</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/games')}
              className="p-4 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100"
            >
              Play Games
            </button>
            <button
              onClick={() => navigate('/wallet')}
              className="p-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
            >
              Top Up Wallet
            </button>
            <button
              onClick={() => navigate('/tasks')}
              className="p-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
            >
              View Tasks
            </button>
            <button
              onClick={() => navigate('/referrals')}
              className="p-4 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100"
            >
              Invite Friends
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}