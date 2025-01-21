import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Navbar from './Navbar';

const Communication = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  // Initialize Socket.IO connection
  useEffect(() => {
    const newSocket = io('http://localhost:3000/api/communication'); // Update with your server URL
    setSocket(newSocket);

    // Listen for incoming messages
    newSocket.on('chatMessage', (message) => {
      setChat((prevChat) => [...prevChat, message]);
    });

    return () => newSocket.close();
  }, []);

  // Handle message submission
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (socket && message.trim() !== '') {
      socket.emit('chatMessage', message); // Send message to server
      setMessage(''); // Clear input
    }
  };

  return (
    <div className='flex gap-4 w-screen min-h-screen'>
      <Navbar />
      <div className='flex flex-col items-center justify-center w-full p-4'>
        <h1 className='text-2xl font-bold mb-4'>Chat Room</h1>
        <div className='w-full max-w-md h-96 overflow-y-auto border p-2 bg-gray-100'>
          {chat.map((msg, index) => (
            <div key={index} className='p-2 bg-white my-2 rounded shadow'>
              {msg}
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSendMessage}
          className='flex w-full max-w-md mt-4 gap-2'
        >
          <input
            type='text'
            className='flex-1 border p-2 rounded'
            placeholder='Type a message...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type='submit'
            className='bg-blue-500 text-white px-4 py-2 rounded'
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Communication;
