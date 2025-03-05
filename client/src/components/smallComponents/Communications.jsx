import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axiosInstance from "../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";

const socket = io("http://localhost:3000");

const Communications = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [ID, setId] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken) {
        setId(decodedToken.id);
      }
    }
  }, []);

  const currentUserId = ID;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/communication/users");
        
        // Fetch unread message count for each user
        const usersWithUnread = await Promise.all(
          response.data
            .filter((user) => user.ID !== currentUserId)
            .map(async (user) => {
              const unreadResponse = await axiosInstance.get(
                `/communication/unread/${currentUserId}/${user.ID}`
              );
              return { ...user, unreadCount: unreadResponse.data.count };
            })
        );

        setUsers(usersWithUnread);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [currentUserId]);

  useEffect(() => {
    if (!selectedUser?.ID || !currentUserId) return;

    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get(
          `/communication/messages/${currentUserId}/${selectedUser.ID}`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    // Clear unread count when chat is opened
    axiosInstance.post(`/communication/read/${currentUserId}/${selectedUser.ID}`)
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.ID === selectedUser.ID ? { ...user, unreadCount: 0 } : user
          )
        );
      })
      .catch((error) => console.error("Error marking messages as read:", error));

    const handleNewMessage = (data) => {
      if (
        (data.receiver_id === currentUserId && data.sender_id === selectedUser.ID) ||
        (data.sender_id === currentUserId && data.receiver_id === selectedUser.ID)
      ) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on("chatMessage", handleNewMessage);

    return () => {
      socket.off("chatMessage", handleNewMessage);
    };
  }, [selectedUser?.ID, currentUserId]);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const sendMessage = async () => {
    if (!message.trim() || !selectedUser) return;

    const newMessage = {
      sender_id: currentUserId,
      receiver_id: selectedUser.ID,
      message,
      timestamp: new Date().toISOString(),
    };

    try {
      await axiosInstance.post("/communication/messages", newMessage);
      socket.emit("sendMessage", newMessage);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <h2 className="text-xl font-semibold text-center mb-4">Chat</h2>

      <input
        type="text"
        placeholder="Search Users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-2 p-2 border rounded-lg w-full"
      />

      <div className="flex h-full">
        <div className="w-1/3 bg-white shadow p-4 overflow-auto">
          {users
            .filter((user) =>
`${user.Role} ${user.FirstName} ${user.LastName}`.toLowerCase().includes(search.toLowerCase())

            )
            .map((user) => (
              <p
                key={user.ID}
                className={`cursor-pointer p-2 rounded-lg flex justify-between items-center hover:bg-gray-200 ${
                  selectedUser?.ID === user.ID ? "bg-gray-300" : ""
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <span className="text-gray-600">
                  {user.FirstName} {user.LastName} <small>({user.Role})</small>
                </span>
                {user.unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {user.unreadCount}
                  </span>
                )}
              </p>
            ))}
        </div>

        <div className="w-2/3 bg-white shadow p-4 flex flex-col">
          {selectedUser ? (
            <>
              <h3 className="font-bold mb-2">
                Chat with ({selectedUser.Role}) {selectedUser.FirstName} {selectedUser.LastName}
              </h3>

              <div className="flex-1 overflow-auto">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 flex ${
                      msg.sender_id === currentUserId ? "justify-end" : "justify-start"
                    }`}
                  >
                    <p
                      className={`p-3 rounded-lg shadow ${
                        msg.sender_id === currentUserId
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      {msg.message}
                    </p>
                  </div>
                ))}
                  <div ref={messagesEndRef} />

              </div>

              <div className="mt-4 flex">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  onKeyDown={handleKeyPress} // Send message on Enter key

                  className="flex-1 p-2 border rounded-lg focus:outline-none"
                />
                <button
                  onClick={sendMessage}
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center">Select a user to start chatting</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Communications;
