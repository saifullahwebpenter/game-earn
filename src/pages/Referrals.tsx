import React from 'react';
import { Users, Copy, Share2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

export default function Referrals() {
  const { user } = useAuthStore();
  const referralCode = 'USER123'; // This should come from user's data

  const referrals = [
    { id: 1, email: 'friend1@example.com', status: 'active', joinedDate: '2024-03-08' },
    { id: 2, email: 'friend2@example.com', status: 'pending', joinedDate: '2024-03-09' },
  ];

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success('Referral code copied to clipboard!');
  };

  const shareReferralLink = () => {
    const referralLink = `${window.location.origin}/auth?ref=${referralCode}`;
    navigator.share({
      title: 'Join Gaming Platform',
      text: 'Join me on this awesome gaming platform!',
      url: referralLink,
    }).catch(() => {
      navigator.clipboard.writeText(referralLink);
      toast.success('Referral link copied to clipboard!');
    });
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Referral Program</h1>
        <p className="text-gray-600">Invite friends and earn rewards together</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Referral Code Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-6">
            <Users className="w-8 h-8 text-indigo-600 mr-3" />
            <h3 className="text-lg font-semibold">Your Referral Code</h3>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <code className="text-xl font-mono">{referralCode}</code>
              <button
                onClick={copyReferralCode}
                className="p-2 text-gray-600 hover:text-indigo-600"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>

          <button
            onClick={shareReferralLink}
            className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Referral Link
          </button>
        </div>

        {/* Referral List */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-6">Your Referrals</h3>
          <div className="space-y-4">
            {referrals.map((referral) => (
              <div
                key={referral.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{referral.email}</p>
                  <p className="text-sm text-gray-600">Joined: {referral.joinedDate}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    referral.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {referral.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}