import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate, Link } from 'react-router-dom';

function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  const username = useSelector((state: RootState) => state.auth.username);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setDropdownOpen(false);
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side - AppName and Dashboard Link */}
        <div className="flex items-center space-x-6">
          <span className="text-white text-xl font-semibold">AppName</span>
          <Link
            to="/dashboard"
            className="text-gray-300 hover:text-white text-lg font-semibold transition-colors duration-200"
          >
            Dashboard
          </Link>
        </div>

        {/* Right Side - Username Dropdown with Avatar */}
        <div className="relative flex items-center">
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <img
                src="/path/to/avatar.jpg"
                alt="User Avatar"
                className="w-8 h-8 rounded-full border border-gray-300"
              />
              <button
                onClick={toggleDropdown}
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {username}
              </button>
            </div>
          ) : (
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;