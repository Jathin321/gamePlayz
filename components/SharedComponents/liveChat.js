import React from 'react';

const LiveChat = () => {
  const messages = [
    {
      id: 1,
      sender: 'You',
      message: 'Hey, how’s the tournament going?',
      timestamp: '10:15 AM',
      isCurrentUser: true,
    },
    {
      id: 2,
      sender: 'JohnDoe',
      message: 'It’s going great! Team Alpha is dominating!',
      timestamp: '10:16 AM',
      isCurrentUser: false,
    },
    {
      id: 3,
      sender: 'You',
      message: 'Yeah, they’re on fire!',
      timestamp: '10:17 AM',
      isCurrentUser: true,
    },
    {
      id: 4,
      sender: 'JaneSmith',
      message: 'Anyone watching the live stream?',
      timestamp: '10:18 AM',
      isCurrentUser: false,
    },
    {
      id: 5,
      sender: 'You',
      message: 'Hey, how’s the tournament going?',
      timestamp: '10:15 AM',
      isCurrentUser: true,
    },
    {
      id: 6,
      sender: 'JohnDoe',
      message: 'It’s going great! Team Alpha is dominating!',
      timestamp: '10:16 AM',
      isCurrentUser: false,
    },
    {
      id: 7,
      sender: 'You',
      message: 'Yeah, they’re on fire!',
      timestamp: '10:17 AM',
      isCurrentUser: true,
    },
    {
      id: 8,
      sender: 'JaneSmith',
      message: 'Anyone watching the live stream?',
      timestamp: '10:18 AM',
      isCurrentUser: false,
    },
  ];

  return (
    <div className="flex flex-col lg:m-12 h-[600px] bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 bg-violet-400 text-white">
        <h2 className="text-lg font-semibold">Tournament Live Chat</h2>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto ">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.isCurrentUser ? 'justify-end' : 'justify-start'
            } mb-3`}
          >
            <div
              className={`max-w-[70%] p-2 rounded-lg ${
                msg.isCurrentUser
                  ? 'bg-violet-700 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              {/* Message Content */}
              <div className="text-sm">{msg.message}</div>

              {/* Sender Name and Timestamp */}
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-400 dark:text-gray-300">
                  {msg.sender}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-300">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-gray-100 dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-800 transition-colors duration-300">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;