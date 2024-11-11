import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Trophy, ArrowLeft, Timer } from 'lucide-react';

export default function QuickMath() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [problem, setProblem] = useState({ question: '', answer: 0 });
  const [input, setInput] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);

  const generateProblem = () => {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    const num1 = Math.floor(Math.random() * 12) + 1;
    const num2 = Math.floor(Math.random() * 12) + 1;
    
    let answer = 0;
    let question = '';
    
    switch(operation) {
      case '+':
        answer = num1 + num2;
        question = `${num1} + ${num2}`;
        break;
      case '-':
        answer = num1 - num2;
        question = `${num1} - ${num2}`;
        break;
      case '*':
        answer = num1 * num2;
        question = `${num1} × ${num2}`;
        break;
    }
    
    setProblem({ question, answer });
  };

  useEffect(() => {
    generateProblem();
    const timer = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          clearInterval(timer);
          setIsGameOver(true);
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userAnswer = Number(input);
    
    if (userAnswer === problem.answer) {
      setScore(s => s + 1);
      toast.success('Correct!');
      generateProblem();
    } else {
      toast.error('Wrong answer!');
    }
    
    setInput('');
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
            <span className="flex items-center text-gray-600">
              <Timer className="w-5 h-5 mr-2" />
              {timeLeft}s
            </span>
            <span className="text-gray-600">Score: {score}</span>
            <span className="flex items-center text-indigo-600">
              <Trophy className="w-5 h-5 mr-2" />
              100 coins reward
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          {!isGameOver ? (
            <>
              <h2 className="text-4xl font-bold mb-8">{problem.question}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="number"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full p-3 text-center text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your answer"
                  autoFocus
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Submit
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
              <p className="text-xl mb-6">Final Score: {score}</p>
              <div className="space-x-4">
                <button
                  onClick={() => window.location.reload()}
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
    </div>
  );
}