import React, { useState } from "react";

const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = 0;
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleNotifications}
        className="relative p-2 text-gray-600 hover:text-purple-600 transition-colors duration-300"
      >
        <i className="fas fa-bell text-xl"></i>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-purple-700">Notifiche</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <div className="p-4 text-center text-gray-500">
              Nessuna notifica
            </div>
          </div>
          <div className="p-3 text-center border-t border-gray-200">
            <button className="text-sm text-purple-600 hover:text-purple-800">
              Vedi tutte
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
