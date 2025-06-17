"use client";

import { useState, useEffect, useRef } from "react";
import {
  Send,
  Smile,
  Image as ImageIcon,
  ChevronDown,
  X,
  ShieldCheck,
  CheckCheck,
  MoreHorizontal,
  Award,
  Calendar,
  ArrowDown,
  MessageSquare,
  Loader2,
  Info,
  BookOpen,
} from "lucide-react";
import {
  getLiveChatMessages,
  sendLiveChatMessage,
} from "@/actions/prismaActions";
import { getUserId } from "@/actions/auth";
import { supabase } from "@/util/supabase";

const LiveChat = ({ scrimId }) => {
  const [message, setMessage] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState("chat"); // 'chat', 'guidelines'
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Real data states
  const [dbMessages, setDbMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Chat channel reference
  const chatChannel = useRef(null);

  // Fetch current user ID on component mount
  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const { success, userId: currentUserId } = await getUserId();
        if (success) {
          setUserId(currentUserId);
        } else {
          setError("Failed to get current user");
        }
      } catch (err) {
        console.log("Error fetching user:", err);
        setError("Failed to get current user");
      }
    }

    fetchCurrentUser();
  }, []);

  // Modify your fetchMessages function to set the flag when done
  useEffect(() => {
    async function fetchMessages() {
      if (!scrimId) return;

      setIsLoading(true);
      try {
        const { success, messages, error } = await getLiveChatMessages(
          "scrims",
          scrimId
        );

        if (success) {
          // Transform messages to match our component's expected format
          const formattedMessages = messages.map((msg) => ({
            id: msg.id,
            sender: msg.sender.username,
            avatar: msg.sender.profilePic || "https://i.pravatar.cc/150?img=3",
            message: msg.content,
            timestamp: msg.createdAt,
            isCurrentUser: msg.sender.id === userId,
            isAdmin: false, // You could add an admin check here if needed
          }));

          setDbMessages(formattedMessages);

          // Set the flag to true after messages are loaded successfully
          initialLoadComplete.current = true;
        } else {
          setError(error);
        }
      } catch (err) {
        console.log("Error fetching messages:", err);
        setError("Failed to load messages");
      } finally {
        setIsLoading(false);
      }
    }

    if (scrimId && userId) {
      fetchMessages();
      setupRealtimeConnection();
    }
  }, [scrimId, userId]);

  // Set up Supabase broadcast channel for this specific scrim
  const setupRealtimeConnection = () => {
    if (!scrimId || !userId) return;

    // Clean up any existing channel
    if (chatChannel.current) {
      supabase.removeChannel(chatChannel.current);
    }

    // Create a specific channel for this scrim chat
    const channel = supabase.channel(`scrim-chat-${scrimId}`, {
      config: {
        broadcast: {
          self: false, // Don't receive our own messages (we handle them in optimistic UI)
        },
      },
    });

    // Listen for new messages
    channel
      .on("broadcast", { event: "new-message" }, ({ payload }) => {
        // Only process if it's not from the current user
        if (payload.senderId !== userId) {
          const newMessage = {
            id: payload.id,
            sender: payload.senderName,
            avatar: payload.senderAvatar || "https://i.pravatar.cc/150?img=3",
            message: payload.message,
            timestamp: payload.timestamp,
            isCurrentUser: false,
            isAdmin: payload.isAdmin || false,
          };

          setDbMessages((prev) => [...prev, newMessage]);

          // Auto-scroll ONLY if user is already at bottom
          if (isUserAtBottom()) {
            setTimeout(scrollToBottom, 100);
          }
        }
      })
      .subscribe((status) => {
        console.log(`Chat subscription status: ${status}`);
        setIsConnected(status === "SUBSCRIBED");
      });

    chatChannel.current = channel;

    // Cleanup function for useEffect
    return () => {
      if (chatChannel.current) {
        supabase.removeChannel(chatChannel.current);
      }
    };
  };

  // Helper function to get user details - you'd need to implement this
  const getUserDetails = async (userId) => {
    // Placeholder - in reality you would fetch from your backend
    return {
      success: true,
      username: "You",
      profilePic: "https://i.pravatar.cc/150?img=3",
    };
  };

  const initialLoadComplete = useRef(false);

  // Add this function to check if user is at the bottom - place it before the return statement
  const isUserAtBottom = () => {
    if (!scrollContainerRef.current) return true;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const bottomThreshold = 100; // pixels from bottom
    return scrollHeight - scrollTop - clientHeight < bottomThreshold;
  };

  // Add this useEffect to scroll to bottom after messages are loaded and rendered
  useEffect(() => {
    // Only scroll automatically in two cases:
    // 1. Initial load is complete (first batch of messages)
    // 2. User is already at the bottom when new messages arrive
    if (dbMessages.length > 0 && (initialLoadComplete.current || isUserAtBottom())) {
      // Use a small timeout to ensure DOM has been updated
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
    
    // Reset the initial load flag after first load
    if (initialLoadComplete.current) {
      initialLoadComplete.current = false;
    }
    
    // Update the showScrollButton state based on current scroll position
    if (scrollContainerRef.current) {
      setShowScrollButton(!isUserAtBottom());
    }
  }, [dbMessages]);

  // Scroll to bottom on initial render
  useEffect(() => {
    scrollToBottom();
    setIsAtBottom(true);
  }, []);

  // Check if we should show scroll button when new messages arrive
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;
    const bottomThreshold = 100; // pixels from bottom
    const isNearBottom =
      scrollHeight - scrollTop - clientHeight < bottomThreshold;

    setShowScrollButton(!isNearBottom);
    setIsAtBottom(isNearBottom);
  }, [dbMessages]);

  // Handle scroll to detect when to show scroll-to-bottom button
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const isAtBottom = isUserAtBottom();
      setIsAtBottom(isAtBottom);
      setShowScrollButton(!isAtBottom);
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

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim() || !userId || !scrimId) return;

    // Get current timestamp
    const timestamp = new Date().toISOString();
    const messageId = `temp-${Date.now()}`;

    // Optimistic UI update - add message immediately
    const optimisticMessage = {
      id: messageId,
      sender: "You",
      avatar: "https://i.pravatar.cc/150?img=3", // Placeholder
      message: message.trim(),
      timestamp,
      status: "sent",
      isCurrentUser: true,
    };

    setDbMessages((prev) => [...prev, optimisticMessage]);
    setMessage("");

    try {
      // 1. Save to database
      const {
        success,
        message: newMessage,
        error,
      } = await sendLiveChatMessage(userId, message.trim(), "scrims", scrimId);

      if (!success) {
        console.log("Failed to send message:", error);
        return;
      }

      // 2. Broadcast to channel for real-time updates to other users
      if (chatChannel.current) {
        await chatChannel.current.send({
          type: "broadcast",
          event: "new-message",
          payload: {
            id: newMessage.id,
            senderId: userId,
            senderName: newMessage.sender.username,
            senderAvatar: newMessage.sender.profilePic,
            message: newMessage.content,
            timestamp: newMessage.createdAt,
            isAdmin: false, // Update as needed
          },
        });
      }

      // 3. Update optimistic UI with real data
      setDbMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? {
                id: newMessage.id,
                sender: newMessage.sender.username,
                avatar:
                  newMessage.sender.profilePic ||
                  "https://i.pravatar.cc/150?img=3",
                message: newMessage.content,
                timestamp: newMessage.createdAt,
                status: "delivered",
                isCurrentUser: true,
              }
            : msg
        )
      );

      // If user was already at bottom before sending, scroll to the new bottom
      if (isAtBottom) {
        setTimeout(scrollToBottom, 100);
      }
    } catch (err) {
      console.log("Error sending message:", err);
    }
  };

  // Group messages by the same sender if they're consecutive
  const groupedMessages = (dbMessages.length > 0 ? dbMessages : []).reduce(
    (acc, curr, i) => {
      const prevMessage = dbMessages[i - 1];
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
    },
    []
  );

  // Handle the emoji picker toggle
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
    <div className="flex flex-col md:flex-row bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden h-[570px] lg:h-[610px] md:h-[600px]">
      {/* {renderConnectionStatus()} */}
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
          onClick={() => setActiveSidebar("guidelines")}
          className={`flex-1 py-3 flex justify-center items-center ${
            activeSidebar === "guidelines"
              ? "border-b-2 border-purple-500 text-purple-500"
              : "text-gray-400"
          }`}
        >
          <BookOpen className="w-5 h-5 mr-2" />
          <span>Guidelines</span>
        </button>
      </div>

      {/* Guidelines Sidebar - Hidden on mobile unless active */}
      <div
        className={`${
          activeSidebar !== "guidelines" && "hidden md:block"
        } md:w-72 bg-gray-800 border-r border-gray-700 flex-shrink-0 flex flex-col overflow-scroll scrollbar-hide`}
      >
        <div className="p-4 border-b border-gray-700 bg-gray-800 flex-shrink-0">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <ShieldCheck className="w-5 h-5 mr-2 text-purple-400" />
            Chat Guidelines
          </h3>
        </div>

        {/* Improved scrolling container */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-2 scroll-smooth custom-scrollbar">
          <div className="space-y-4 pb-3">
            {/* Guidelines content (unchanged) */}
            <div className="bg-gray-700/50 p-3 rounded-lg border-l-4 border-purple-500">
              <h4 className="text-white text-sm font-medium mb-1">
                Be Respectful
              </h4>
              <p className="text-gray-300 text-xs">
                Treat others with respect. Harassment, hate speech, or bullying
                will not be tolerated.
              </p>
            </div>

            {/* Other guidelines remain the same */}
            <div className="bg-gray-700/50 p-3 rounded-lg border-l-4 border-blue-500">
              <h4 className="text-white text-sm font-medium mb-1">
                Stay On Topic
              </h4>
              <p className="text-gray-300 text-xs">
                Keep conversations related to the current scrim or tournament.
              </p>
            </div>

            {/* Add other guidelines as before */}
            <div className="bg-gray-700/50 p-3 rounded-lg border-l-4 border-purple-500">
              <h4 className="text-white text-sm font-medium mb-1">
                Be Respectful
              </h4>
              <p className="text-gray-300 text-xs">
                Treat others with respect. Harassment, hate speech, or bullying
                will not be tolerated.
              </p>
            </div>

            <div className="bg-gray-700/50 p-3 rounded-lg border-l-4 border-blue-500">
              <h4 className="text-white text-sm font-medium mb-1">
                Stay On Topic
              </h4>
              <p className="text-gray-300 text-xs">
                Keep conversations related to the current scrim or tournament.
              </p>
            </div>

            <div className="bg-gray-700/50 p-3 rounded-lg border-l-4 border-green-500">
              <h4 className="text-white text-sm font-medium mb-1">
                No Spamming
              </h4>
              <p className="text-gray-300 text-xs">
                Don't send repeated messages or excessive emoji spam.
              </p>
            </div>

            <div className="bg-gray-700/50 p-3 rounded-lg border-l-4 border-yellow-500">
              <h4 className="text-white text-sm font-medium mb-1">
                Appropriate Content
              </h4>
              <p className="text-gray-300 text-xs">
                Don't share explicit, offensive, or inappropriate content.
              </p>
            </div>

            <div className="bg-gray-700/50 p-3 rounded-lg border-l-4 border-red-500">
              <h4 className="text-white text-sm font-medium mb-1">
                No Cheating Discussion
              </h4>
              <p className="text-gray-300 text-xs">
                Discussions about cheats, hacks, or exploits are prohibited.
              </p>
            </div>

            <div className="bg-gray-700/50 p-3 rounded-lg border-l-4 border-orange-500">
              <h4 className="text-white text-sm font-medium mb-1">
                Report Issues
              </h4>
              <p className="text-gray-300 text-xs">
                Report any issues or rule violations to moderators.
              </p>
            </div>

            {/* Add a few more guidelines to ensure scrolling is needed */}
            <div className="bg-gray-700/50 p-3 rounded-lg border-l-4 border-indigo-500">
              <h4 className="text-white text-sm font-medium mb-1">Fair Play</h4>
              <p className="text-gray-300 text-xs">
                Promote fair play and good sportsmanship in all interactions.
              </p>
            </div>

            <div className="bg-gray-700/50 p-3 rounded-lg border-l-4 border-pink-500">
              <h4 className="text-white text-sm font-medium mb-1">
                Constructive Feedback
              </h4>
              <p className="text-gray-300 text-xs">
                Provide constructive feedback rather than negative criticism.
              </p>
            </div>

            <div className="bg-gray-700/50 p-3 rounded-lg border-l-4 border-teal-500">
              <h4 className="text-white text-sm font-medium mb-1">
                Respect Privacy
              </h4>
              <p className="text-gray-300 text-xs">
                Don't share personal information about yourself or others.
              </p>
            </div>

            {/* Add one more guideline for better scroll testing */}
            <div className="bg-gray-700/50 p-3 rounded-lg border-l-4 border-cyan-500">
              <h4 className="text-white text-sm font-medium mb-1">Have Fun</h4>
              <p className="text-gray-300 text-xs">
                Remember that games are about having fun. Keep the environment
                positive and enjoyable for everyone.
              </p>
            </div>
          </div>
        </div>

        {/* Tournament Info Section */}
        <div className="p-4 border-t border-gray-700 bg-gray-800/80 flex-shrink-0">
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

      {/* Main Chat Area */}
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
                <span>Chat is active</span>
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
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
              <p className="text-gray-400 mt-2">Loading messages...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-red-400">Failed to load messages: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white"
              >
                Try Again
              </button>
            </div>
          ) : groupedMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <MessageSquare className="w-10 h-10 text-gray-600 mb-2" />
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            groupedMessages.map((group, index) => (
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
                        group.isCurrentUser
                          ? "text-purple-400"
                          : "text-gray-400"
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
                            group.isCurrentUser
                              ? "justify-end"
                              : "justify-start"
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
            ))
          )}

          {/* Auto-scroll anchor */}
          <div ref={messagesEndRef} />
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
                disabled={!userId}
              />

              {/* Emoji picker */}
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
                message.trim() && userId
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              } transition-all duration-200`}
              disabled={!message.trim() || !userId}
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
