import { useState, useEffect, useRef } from "react";
import { X, AlertCircle, Bell } from "lucide-react";

export default function AnnouncementNotification({ announcement, onClose }) {
  const [visibility, setVisibility] = useState("entering"); // entering, visible, exiting
  const timerRef = useRef(null);
  
  // Handle animation states with CSS classes instead of framer-motion
  useEffect(() => {
    // Start visible
    const showTimer = setTimeout(() => {
      setVisibility("visible");
    }, 50);
    
    // Auto hide after some time for non-important announcements
    if (!announcement.important) {
      timerRef.current = setTimeout(() => {
        setVisibility("exiting");
        // Allow animation to finish before removing component
        setTimeout(onClose, 300);
      }, 5000);
    }
    
    return () => {
      clearTimeout(showTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [announcement, onClose]);

  // Handle manual close
  const handleClose = () => {
    setVisibility("exiting");
    setTimeout(onClose, 300); // Allow animation to finish
    if (timerRef.current) clearTimeout(timerRef.current);
  };
  
  // Get animation classes based on visibility state
  const getAnimationClass = () => {
    switch(visibility) {
      case "entering": return "translate-y-[-50px] opacity-0";
      case "visible": return "translate-y-0 opacity-100";
      case "exiting": return "translate-y-[-50px] opacity-0";
      default: return "translate-y-0 opacity-100";
    }
  };
  
  return (
    <div 
      className={`fixed top-5 right-5 z-50 max-w-sm w-full bg-gray-800 border-l-4 border-purple-500 
                  shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out
                  ${getAnimationClass()}`}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {announcement.important ? (
              <AlertCircle className="h-6 w-6 text-yellow-400" />
            ) : (
              <div className="h-6 w-6 bg-purple-500 rounded-full flex items-center justify-center">
                <Bell className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-white">{announcement.title}</p>
            <p className="mt-1 text-sm text-gray-300 line-clamp-2">{announcement.content}</p>
            <div className="mt-2">
              <button 
                onClick={handleClose}
                className="text-xs text-purple-400 hover:text-purple-300"
              >
                View Details
              </button>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={handleClose}
              className="bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}