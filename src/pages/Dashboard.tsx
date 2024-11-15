import { useEffect, useState, useCallback  } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { debounce } from 'lodash';
import Spinner from '../components/Spinner';
import { fetchChats } from '../actions/chatActions';

function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { chats, loading, error, totalPages } = useSelector((state: RootState) => state.chat);

  const [nameFilter, setNameFilter] = useState('');
  const [page, setPage] = useState(1);

  const fetchDebouncedChats = useCallback(
    debounce((name) => {
      dispatch(fetchChats({ page, limit: 6, name }));
    }, 500),
    [dispatch, page]
  );

  useEffect(() => {
    fetchDebouncedChats(nameFilter);
    return fetchDebouncedChats.cancel;
  }, [nameFilter, page, fetchDebouncedChats]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value);
    setPage(1);
  };

  const goToChat = (id: number) => {
    navigate('/chat/' + id)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loading === 'pending') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner></Spinner>
      </div>
    );
  };

  return (
    <div className="container mx-auto my-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-center mb-6">Dashboard</h1>
        <button
          onClick={() => navigate('/chat/create')}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Create chat
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md text-center mb-6">
          Error loading chats: {error}
        </div>
      )}

      {/* Title Filter Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Filter by title"
          value={nameFilter}
          onChange={handleFilterChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Chat in Single Column */}
      <div className="grid gap-6 grid-cols-2">
        {Array.isArray(chats) && chats.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
              onClick={() => goToChat(chat.id)}
            >
              <div className="p-5">
                <h2 className="text-xl font-bold mb-2">{chat.name}</h2>
                <p className="text-gray-600 mb-4">{chat.type}</p>
              </div>
            </div>
          ))
        ) : (
          !loading && (
            <p className="text-center col-span-full text-gray-600">
              No chats available.
            </p>
          )
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${page === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
