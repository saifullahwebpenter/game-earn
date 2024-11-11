import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import Games from './pages/Games';
import Tasks from './pages/Tasks';
import Wallet from './pages/Wallet';
import Referrals from './pages/Referrals';
import Auth from './pages/Auth';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import MemoryMatch from './components/games/MemoryMatch';
import WordPuzzle from './components/games/WordPuzzle';
import QuickMath from './components/games/QuickMath';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/1" element={<MemoryMatch />} />
          <Route path="/games/2" element={<WordPuzzle />} />
          <Route path="/games/3" element={<QuickMath />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/referrals" element={<Referrals />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;