import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from '../actions/messageActions';
import { AppDispatch, RootState } from '../store';
import { Message } from '../interfaces/message/Message';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

function ChatRoom() {
  let { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { messages, loading, error, totalPages } = useSelector((state: RootState) => state.message);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  const [socket, setSocket] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('receiveMessage-' + id, (newMessage: Message) => {
      console.log('New message received:', newMessage);
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (id && socket) {
      socket.emit('joinRoom', id);
      dispatch(fetchMessages({ chatId: id.toString(), request: { page, limit: 10 } }));
    }
  }, [dispatch, id, page, socket]);

  const sendMessage = () => {
    console.log('Sending message:', message);
    socket.emit('sendMessage', { chatId: id, content: message });
    setMessage('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-blue-600 text-white">
        <h1 className="text-xl font-semibold">Chat Room</h1>
        <button className="text-sm bg-blue-500 px-3 py-1 rounded hover:bg-blue-700 transition">
          Leave Chat
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading === 'pending' ? (
          <p className="text-center text-gray-500">Loading messages...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          [...messages, ...chatMessages].map((msg: Message, index) => (
            <div
              key={`${msg._id}-${index}`}
              className={`flex ${msg.senderId === 'currentUserId' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                  msg.senderId === 'currentUserId' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                }`}
              >
                <p>{msg.content}</p>
                <p>{msg.senderId}</p>
                <span className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mb-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setPage(index + 1)}
            className={`px-3 py-1 rounded ${page === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Message Input */}
      <div className="flex items-center px-4 py-2 bg-white border-t">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;
