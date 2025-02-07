import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Navbar from './Navbar';

const Communication = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [userName, setUserName] = useState('');
  const [userList, setUserList] = useState([]);  // List of users
  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    // Listen for chat messages
    newSocket.on('chatMessage', (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    });

    // Listen for the updated list of connected users
    newSocket.on('userList', (users) => {
      setUserList(users);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Retrieve userName from sessionStorage when the component loads
    const storedUserName = sessionStorage.getItem('userName');
    
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (socket && message.trim() !== '') {
      socket.emit('chatMessage', { user: userName, message });
      setMessage('');
    }
  };

  const handleSetUserName = () => {
    if (socket && userName.trim() !== '') {
      socket.emit('setName', userName);  // Emit the user's name to the server
      // Store userName in sessionStorage
      sessionStorage.setItem('userName', userName);
    }
  };

  return (
    <div className="flex gap-4 w-screen min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full p-4">
        <h1 className="text-2xl font-bold mb-4">Chat Room</h1>

        {/* Set User Name if not set */}
        {!userName && (
          <div className="mb-4">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className="p-2 border rounded"
            />
            <button
              onClick={handleSetUserName}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Set Name
            </button>
          </div>
        )}

        {/* List of Users */}
        <div className="w-full max-w-md mb-4">
          <h3 className="font-bold">Connected Users:</h3>
          <ul>
            {userList.map((user, index) => (
              <li key={index} className="bg-gray-200 p-2 rounded mb-2">{user}</li>
            ))}
          </ul>
        </div>

        <div className="w-full max-w-md h-96 overflow-y-auto border p-2 bg-gray-100">
  {chat.map((msg, index) => (
    <div key={index} className="p-2 bg-white my-2 rounded shadow">
      {/* Render the user and message separately */}
      <strong>{msg.user}:</strong> {msg.message}
    </div>
  ))}
</div>

        {/* Send Message */}
        <form onSubmit={handleSendMessage} className="flex w-full max-w-md mt-4 gap-2">
          <input
            type="text"
            className="flex-1 border p-2 rounded"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Communication;
