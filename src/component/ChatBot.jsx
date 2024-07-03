import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [currentUser, setCurrentUser] = useState('User1');

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      console.log('Received message:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const message = { user: currentUser, text: input };
      console.log('Sending message:', message);
      socket.emit('sendMessage', message);
      setInput('');
      setCurrentUser(currentUser === 'User1' ? 'User2' : 'User1');
    }
  };

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
      <div className="p-4 mb-4 overflow-y-scroll border border-gray-300 rounded-lg h-96">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-4 p-2 rounded-lg ${msg.user === 'User1' ? 'bg-green-100 text-left' : 'bg-purple-100 text-right'}`}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
