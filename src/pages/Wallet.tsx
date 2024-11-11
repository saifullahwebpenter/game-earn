import React, { useState } from 'react';
import { Wallet, CreditCard, History } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

export default function WalletPage() {
  const [amount, setAmount] = useState('10');
  const { user } = useAuthStore();

  const topUpAmounts = ['10', '20', '50', '100'];
  const transactions = [
    { id: 1, type: 'Top Up', amount: 50, date: '2024-03-10', status: 'completed' },
    { id: 2, type: 'Game Reward', amount: 25, date: '2024-03-09', status: 'completed' },
    { id: 3, type: 'Task Reward', amount: 30, date: '2024-03-08', status: 'completed' },
  ];

  const handleTopUp = async () => {
    try {
      // Implement payment gateway integration here
      toast.success(`Successfully topped up ${amount} coins`);
    } catch (error) {
      toast.error('Top up failed. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>
        <p className="text-gray-600">Manage your coins and top up your account</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Balance and Top Up Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-6">
            <Wallet className="w-8 h-8 text-indigo-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Current Balance</p>
              <p className="text-3xl font-bold text-gray-900">1,000 coins</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Top Up Coins</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {topUpAmounts.map((value) => (
                <button
                  key={value}
                  onClick={() => setAmount(value)}
                  className={`p-4 rounded-lg border ${
                    amount === value
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                      : 'border-gray-200 hover:border-indigo-600'
                  }`}
                >
                  {value} coins
                </button>
              ))}
            </div>
            <button
              onClick={handleTopUp}
              className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Top Up Now
            </button>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-6">
            <History className="w-8 h-8 text-indigo-600 mr-3" />
            <h3 className="text-lg font-semibold">Transaction History</h3>
          </div>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{transaction.type}</p>
                  <p className="text-sm text-gray-600">{transaction.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'Top Up' ? 'text-green-600' : 'text-indigo-600'
                  }`}>
                    {transaction.type === 'Top Up' ? '+' : '+'}{transaction.amount} coins
                  </p>
                  <p className="text-sm text-gray-600 capitalize">{transaction.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}