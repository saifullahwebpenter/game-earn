import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GamepadIcon, 
  CheckSquare, 
  Wallet, 
  Users, 
  LogOut 
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Layout() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/games', icon: GamepadIcon, label: 'Games' },
    { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
    { to: '/wallet', icon: Wallet, label: 'Wallet' },
    { to: '/referrals', icon: Users, label: 'Referrals' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="h-full flex flex-col">
          <div className="p-4">
            <h1 className="text-xl font-bold text-indigo-600">Gaming Platform</h1>
          </div>
          
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 rounded-lg ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}