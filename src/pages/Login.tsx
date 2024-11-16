import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { login } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(login({ username, password }));
  
    if (login.fulfilled.match(resultAction)) {
      localStorage.setItem('auth', JSON.stringify(resultAction.payload));
      navigate('/dashboard');
    }
  };

  return (
    <div className="container mx-auto px-4 my-8 flex justify-center">
      <div className="w-full max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center mb-6">Sign In</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter password"
              required
            />
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">Remember me</label>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition duration-200"
            disabled={loading === 'pending'}
          >
            {loading === 'pending' ? <Spinner></Spinner> : 'Sign In'}
          </button>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
