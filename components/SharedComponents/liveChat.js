import { useState, useEffect, useRef } from "react";
import {
  Send,
  Smile,
  Image as ImageIcon,
  ChevronDown,
  X,
  Users,
  UserCheck,
  CheckCheck,
  MoreHorizontal,
  Award,
  Calendar,
  ArrowDown,
  MessageSquare,
} from "lucide-react";

const LiveChat = () => {
  const [message, setMessage] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState("chat"); // 'chat', 'users'
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Simulated user data
  const onlineUsers = [
    {
      id: 1,
      name: "JohnDoe",
      avatar: "https://i.pravatar.cc/150?img=1",
      status: "online",
      isAdmin: false,
    },
    {
      id: 2,
      name: "JaneSmith",
      avatar: "https://i.pravatar.cc/150?img=5",
      status: "online",
      isAdmin: false,
    },
    {
      id: 3,
      name: "MikeJohnson",
      avatar: "https://i.pravatar.cc/150?img=8",
      status: "idle",
      isAdmin: true,
    },
    {
      id: 4,
      name: "SarahWilliams",
      avatar: "https://i.pravatar.cc/150?img=9",
      status: "online",
      isAdmin: false,
    },
    {
      id: 5,
      name: "DavidBrown",
      avatar: "https://i.pravatar.cc/150?img=12",
      status: "online",
      isAdmin: false,
    },
    {
      id: 6,
      name: "JessicaTaylor",
      avatar: "https://i.pravatar.cc/150?img=11",
      status: "idle",
      isAdmin: false,
    },
  ];

  // Simulated chat messages with more realistic data
  const messages = [
    {
      id: 1,
      sender: "You",
      avatar: "https://i.pravatar.cc/150?img=3",
      message:
        "Hey everyone! Just tuned in to the tournament. What did I miss?",
      timestamp: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
      status: "read",
      isCurrentUser: true,
    },
    {
      id: 2,
      sender: "JohnDoe",
      avatar: "https://i.pravatar.cc/150?img=1",
      message:
        "Team Alpha just took the lead with an amazing play! They're up 3-2 now.",
      timestamp: new Date(Date.now() - 840000).toISOString(), // 14 minutes ago
      reactions: [
        { emoji: "🔥", count: 3 },
        { emoji: "👏", count: 2 },
      ],
      isCurrentUser: false,
    },
    {
      id: 3,
      sender: "MikeJohnson",
      avatar: "https://i.pravatar.cc/150?img=8",
      message:
        "Welcome to the stream! We're currently in the second round of the tournament.",
      timestamp: new Date(Date.now() - 780000).toISOString(), // 13 minutes ago
      isAdmin: true,
      isCurrentUser: false,
    },
    {
      id: 4,
      sender: "You",
      avatar: "https://i.pravatar.cc/150?img=3",
      message: "Thanks! I was hoping to catch the first round too.",
      timestamp: new Date(Date.now() - 720000).toISOString(), // 12 minutes ago
      status: "read",
      isCurrentUser: true,
    },
    {
      id: 5,
      sender: "JaneSmith",
      avatar: "https://i.pravatar.cc/150?img=5",
      message:
        "The first round was intense! Team Bravo almost won but Team Alpha made a comeback in the last minute.",
      timestamp: new Date(Date.now() - 660000).toISOString(), // 11 minutes ago
      isCurrentUser: false,
    },
    {
      id: 6,
      sender: "JaneSmith",
      avatar: "https://i.pravatar.cc/150?img=5",
      message:
        "Oh, and did you see that clutch play by PlayerX? That was insane!",
      timestamp: new Date(Date.now() - 650000).toISOString(), // 10.8 minutes ago
      isCurrentUser: false,
    },
    {
      id: 7,
      sender: "DavidBrown",
      avatar: "https://i.pravatar.cc/150?img=12",
      message: "Anyone know when the third round starts?",
      timestamp: new Date(Date.now() - 540000).toISOString(), // 9 minutes ago
      isCurrentUser: false,
    },
    {
      id: 8,
      sender: "MikeJohnson",
      avatar: "https://i.pravatar.cc/150?img=8",
      message:
        "Third round will start in about 15 minutes! Teams are taking a short break.",
      timestamp: new Date(Date.now() - 480000).toISOString(), // 8 minutes ago
      isAdmin: true,
      isCurrentUser: false,
    },
    {
      id: 9,
      sender: "You",
      avatar: "https://i.pravatar.cc/150?img=3",
      message: "Perfect timing then! Looking forward to the next round.",
      timestamp: new Date(Date.now() - 420000).toISOString(), // 7 minutes ago
      status: "read",
      isCurrentUser: true,
    },
    {
      id: 10,
      sender: "SarahWilliams",
      avatar: "https://i.pravatar.cc/150?img=9",
      message:
        "I think Team Alpha has a good chance of winning this tournament. Their coordination is on another level!",
      timestamp: new Date(Date.now() - 360000).toISOString(), // 6 minutes ago
      reactions: [{ emoji: "💯", count: 4 }],
      isCurrentUser: false,
    },
    {
      id: 11,
      sender: "You",
      avatar: "https://i.pravatar.cc/150?img=3",
      message: "Definitely! Their strategy in the last game was brilliant.",
      timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
      status: "read",
      isCurrentUser: true,
    },
    {
      id: 12,
      sender: "JessicaTaylor",
      avatar: "https://i.pravatar.cc/150?img=11",
      message:
        "Has anyone seen the stats for PlayerZ? I heard they broke a record today.",
      timestamp: new Date(Date.now() - 240000).toISOString(), // 4 minutes ago
      isCurrentUser: false,
    },
    {
      id: 13,
      sender: "JohnDoe",
      avatar: "https://i.pravatar.cc/150?img=1",
      message:
        "Yes! PlayerZ got 32 kills in a single match, breaking the previous record of 28!",
      timestamp: new Date(Date.now() - 180000).toISOString(), // 3 minutes ago
      isCurrentUser: false,
    },
    {
      id: 14,
      sender: "MikeJohnson",
      avatar: "https://i.pravatar.cc/150?img=8",
      message:
        "Attention everyone! The next match will begin in 5 minutes. Get ready!",
      timestamp: new Date(Date.now() - 120000).toISOString(), // 2 minutes ago
      isAdmin: true,
      isCurrentUser: false,
    },
    {
      id: 15,
      sender: "You",
      avatar: "https://i.pravatar.cc/150?img=3",
      message: "Can't wait! 🎮",
      timestamp: new Date(Date.now() - 60000).toISOString(), // 1 minute ago
      status: "delivered",
      isCurrentUser: true,
    },
  ];

  // Scroll to bottom on load and when new messages come in
  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    } else {
      setShowScrollButton(true);
    }
  }, [messages, isAtBottom]);

  // Handle scroll to detect when to show scroll-to-bottom button
  // Update the scroll event handler
  useEffect(() => {
    const handleScroll = (e) => {
      if (!scrollContainerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } =
        scrollContainerRef.current;
      const bottomThreshold = 100; // pixels from bottom
      const isNearBottom =
        scrollHeight - scrollTop - clientHeight < bottomThreshold;

      // Update both states based on scroll position
      setIsAtBottom(isNearBottom);
      setShowScrollButton(!isNearBottom);

      // Don't stop propagation, let the event bubble up naturally
      // This allows the page to scroll when chat is at its limits
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / 60000);

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, you would add this message to your messages state
      // and possibly send it to your backend
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  // Group messages by the same sender if they're consecutive
  const groupedMessages = messages.reduce((acc, curr, i) => {
    const prevMessage = messages[i - 1];
    const isSameSender = prevMessage && prevMessage.sender === curr.sender;
    const isCloseInTime =
      prevMessage &&
      new Date(curr.timestamp) - new Date(prevMessage.timestamp) < 60000; // 1 minute

    if (isSameSender && isCloseInTime) {
      // Add to the previous group
      const lastGroup = acc[acc.length - 1];
      lastGroup.messages.push(curr);
      return acc;
    } else {
      // Create a new group
      acc.push({
        sender: curr.sender,
        avatar: curr.avatar,
        isCurrentUser: curr.isCurrentUser,
        isAdmin: curr.isAdmin,
        messages: [curr],
      });
      return acc;
    }
  }, []);

  // Handle the emoji picker toggle (simplified version)
  const handleEmojiClick = (emoji) => {
    setMessage((prev) => prev + emoji);
    setIsEmojiPickerOpen(false);
  };

  // Function to render reactions
  const renderReactions = (reactions) => {
    if (!reactions || reactions.length === 0) return null;

    return (
      <div className="flex space-x-1 mt-1">
        {reactions.map((reaction, index) => (
          <div
            key={index}
            className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-0.5"
          >
            <span>{reaction.emoji}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {reaction.count}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden h-[600px] lg:h-[700px] md:h-[600px]">
      {/* Mobile Tabs */}
      <div className="md:hidden flex border-b border-gray-700">
        <button
          onClick={() => setActiveSidebar("chat")}
          className={`flex-1 py-3 flex justify-center items-center ${
            activeSidebar === "chat"
              ? "border-b-2 border-purple-500 text-purple-500"
              : "text-gray-400"
          }`}
        >
          <MessageSquare className="w-5 h-5 mr-2" />
          <span>Chat</span>
        </button>
        <button
          onClick={() => setActiveSidebar("users")}
          className={`flex-1 py-3 flex justify-center items-center ${
            activeSidebar === "users"
              ? "border-b-2 border-purple-500 text-purple-500"
              : "text-gray-400"
          }`}
        >
          <Users className="w-5 h-5 mr-2" />
          <span>
            Online ({onlineUsers.filter((u) => u.status === "online").length})
          </span>
        </button>
      </div>

      {/* Users Sidebar - Hidden on mobile unless active */}
      <div
        className={`${
          activeSidebar !== "users" && "hidden md:block"
        } md:w-72 bg-gray-800 border-r border-gray-700 flex-shrink-0 overflow-hidden flex flex-col`}
      >
        <div className="p-4 border-b border-gray-700 bg-gray-800">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Users className="w-5 h-5 mr-2 text-purple-400" />
            Online Users
            <span className="ml-2 bg-purple-500 text-white text-xs rounded-full px-2 py-0.5">
              {onlineUsers.filter((u) => u.status === "online").length}
            </span>
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {onlineUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border border-gray-700"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${
                    user.status === "online" ? "bg-green-500" : "bg-yellow-500"
                  }`}
                ></span>
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium text-sm">
                    {user.name}
                  </span>
                  {user.isAdmin && (
                    <span className="text-xs bg-purple-500/20 text-purple-300 rounded-md px-1.5 py-0.5">
                      Admin
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tournament Info Section */}
        <div className="p-4 border-t border-gray-700 bg-gray-800/80">
          <h4 className="text-sm font-medium text-gray-400 mb-2">
            Tournament Info
          </h4>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-300">
              <Calendar className="w-4 h-4 text-purple-400 mr-2" />
              <span>Today, 2:00 PM - 6:00 PM</span>
            </div>
            <div className="flex items-center text-sm text-gray-300">
              <Award className="w-4 h-4 text-purple-400 mr-2" />
              <span>Prize Pool: ₹10,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area - Full width on mobile when chat is active */}
      <div
        className={`${
          activeSidebar !== "chat" && "hidden md:flex"
        } flex-1 flex flex-col overflow-hidden`}
      >
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-900/70 to-indigo-900/70 border-b border-gray-700">
          <div className="flex items-center">
            <div className="mr-3 p-2 bg-purple-500/20 rounded-lg">
              <MessageSquare className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Tournament Live Chat
              </h2>
              <div className="flex items-center text-xs text-gray-300">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></div>
                <span>{onlineUsers.length} users online • Chat is active</span>
              </div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div
          ref={scrollContainerRef}
          className="flex-1 p-4 overflow-y-auto bg-gradient-to-br from-gray-800 to-gray-900 space-y-6"
        >
          {groupedMessages.map((group, index) => (
            <div
              key={index}
              className={`flex ${
                group.isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              {!group.isCurrentUser && (
                <div className="flex-shrink-0 mr-3 mt-1">
                  <img
                    src={group.avatar}
                    alt={group.sender}
                    className="w-8 h-8 rounded-full object-cover border border-gray-700"
                  />
                </div>
              )}

              <div className={`max-w-[80%]`}>
                {/* Sender name */}
                <div
                  className={`flex items-center mb-1 ${
                    group.isCurrentUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <span
                    className={`text-xs ${
                      group.isCurrentUser ? "text-purple-400" : "text-gray-400"
                    } font-medium`}
                  >
                    {group.sender}
                  </span>
                  {group.isAdmin && (
                    <span className="ml-1 text-xs bg-purple-500/20 text-purple-300 rounded px-1.5">
                      Admin
                    </span>
                  )}
                </div>

                {/* Message bubbles */}
                <div className="space-y-1">
                  {group.messages.map((msg) => (
                    <div key={msg.id}>
                      <div
                        className={`px-4 py-2.5 rounded-2xl ${
                          group.isCurrentUser
                            ? "bg-gradient-to-r from-purple-700 to-indigo-700 text-white ml-auto"
                            : "bg-gray-700 text-gray-100"
                        } shadow-sm`}
                      >
                        <div className="">{msg.message}</div>
                      </div>

                      {/* Reactions */}
                      <div
                        className={`${
                          group.isCurrentUser ? "text-right" : "text-left"
                        }`}
                      >
                        {renderReactions(msg.reactions)}
                      </div>

                      {/* Timestamp and status */}
                      <div
                        className={`flex items-center mt-1 text-xs text-gray-400 ${
                          group.isCurrentUser ? "justify-end" : "justify-start"
                        }`}
                      >
                        <span>{formatTimestamp(msg.timestamp)}</span>

                        {/* Message status for current user */}
                        {group.isCurrentUser && msg.status && (
                          <span className="ml-1.5 flex items-center">
                            {msg.status === "sent" && (
                              <CheckCheck className="w-3 h-3 text-gray-400" />
                            )}
                            {msg.status === "delivered" && (
                              <CheckCheck className="w-3 h-3 text-blue-400" />
                            )}
                            {msg.status === "read" && (
                              <CheckCheck className="w-3 h-3 text-green-400" />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {group.isCurrentUser && (
                <div className="flex-shrink-0 ml-3 mt-1">
                  <img
                    src={group.avatar}
                    alt={group.sender}
                    className="w-8 h-8 rounded-full object-cover border border-gray-700"
                  />
                </div>
              )}
            </div>
          ))}

          {/* Auto-scroll anchor */}
          <div ref={messagesEndRef} />

          {/* Typing indicator */}
          <div className="flex items-center text-gray-400 text-sm">
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
              <div
                className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
            <span className="ml-2">JaneSmith is typing...</span>
          </div>
        </div>

        {/* Scroll to bottom button */}
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-24 right-6 md:right-6 p-2 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        )}

        {/* Chat Input */}
        <div className="p-3 bg-gray-800 border-t border-gray-700">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center space-x-2"
          >
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-purple-400 hover:bg-gray-700 rounded-full transition-colors"
              onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
            >
              <Smile className="w-5 h-5" />
            </button>

            <button
              type="button"
              className="p-2 text-gray-400 hover:text-purple-400 hover:bg-gray-700 rounded-full transition-colors"
            >
              <ImageIcon className="w-5 h-5" />
            </button>

            <div className="relative flex-1">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-4 py-2.5 bg-gray-700 text-white rounded-full border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />

              {/* Simple emoji picker - in a real app you'd use a proper emoji picker library */}
              {isEmojiPickerOpen && (
                <div className="absolute bottom-full mb-2 left-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-2 w-64">
                  <div className="flex justify-between items-center mb-2 pb-1 border-b border-gray-700">
                    <span className="text-sm text-gray-400">Emojis</span>
                    <button
                      onClick={() => setIsEmojiPickerOpen(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {[
                      "😀",
                      "😂",
                      "😊",
                      "😍",
                      "🥰",
                      "😎",
                      "🙄",
                      "😢",
                      "😭",
                      "😤",
                      "😠",
                      "🤔",
                      "👍",
                      "👎",
                      "❤️",
                      "🔥",
                      "👏",
                      "🎮",
                      "💯",
                      "🏆",
                      "🥇",
                    ].map((emoji, i) => (
                      <button
                        key={i}
                        onClick={() => handleEmojiClick(emoji)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-700 rounded"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className={`p-2.5 rounded-full ${
                message.trim()
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              } transition-all duration-200`}
              disabled={!message.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
