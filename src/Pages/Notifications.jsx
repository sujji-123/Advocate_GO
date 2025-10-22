import React, { useState } from 'react';
import { FaBell, FaCheck, FaTimes, FaExclamationTriangle, FaInfoCircle, FaEnvelope, FaUserPlus } from 'react-icons/fa';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'info',
      title: 'Welcome to AdvocateGO!',
      message: 'Your account has been successfully created. Start exploring legal resources.',
      time: '2 hours ago',
      read: false,
      icon: <FaInfoCircle className="text-blue-500" />
    },
    {
      id: 2,
      type: 'connection',
      title: 'New Connection Request',
      message: 'John Smith wants to connect with you regarding a legal matter.',
      time: '5 hours ago',
      read: false,
      icon: <FaUserPlus className="text-green-500" />
    },
    {
      id: 3,
      type: 'alert',
      title: 'Case Update Available',
      message: 'There is an update on your case #CS-2024-001. Check the case status page.',
      time: '1 day ago',
      read: true,
      icon: <FaExclamationTriangle className="text-orange-500" />
    },
    {
      id: 4,
      type: 'message',
      title: 'New Message Received',
      message: 'You have a new message from Advocate Sharma.',
      time: '2 days ago',
      read: true,
      icon: <FaEnvelope className="text-purple-500" />
    }
  ]);

  const [filter, setFilter] = useState('all');

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FaBell className="text-2xl text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600">
                {unreadCount > 0 
                  ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
                  : 'All caught up!'
                }
              </p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <FaCheck className="mr-2" />
                Mark All Read
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={clearAll}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
              >
                <FaTimes className="mr-2" />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex space-x-4 overflow-x-auto">
            {[
              { key: 'all', label: 'All', count: notifications.length },
              { key: 'unread', label: 'Unread', count: unreadCount },
              { key: 'info', label: 'Information', count: notifications.filter(n => n.type === 'info').length },
              { key: 'alert', label: 'Alerts', count: notifications.filter(n => n.type === 'alert').length },
              { key: 'connection', label: 'Connections', count: notifications.filter(n => n.type === 'connection').length },
              { key: 'message', label: 'Messages', count: notifications.filter(n => n.type === 'message').length }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  filter === tab.key
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    filter === tab.key ? 'bg-blue-200' : 'bg-gray-200'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {filteredNotifications.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-6 transition-colors ${
                    notification.read ? 'bg-white' : 'bg-blue-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1">
                        {notification.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`font-semibold ${
                            notification.read ? 'text-gray-900' : 'text-gray-900'
                          }`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{notification.message}</p>
                        <span className="text-sm text-gray-500">{notification.time}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-gray-400 hover:text-green-500 transition-colors"
                          title="Mark as read"
                        >
                          <FaCheck size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete notification"
                      >
                        <FaTimes size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBell className="text-2xl text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-500">
                {filter === 'all' 
                  ? "You're all caught up! Check back later for new notifications."
                  : `No ${filter} notifications at the moment.`
                }
              </p>
            </div>
          )}
        </div>

        {/* Notification Preferences */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Email Notifications</h4>
              <div className="space-y-3">
                {['Case updates', 'New messages', 'Connection requests', 'Legal alerts'].map(pref => (
                  <label key={pref} className="flex items-center">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-gray-600">{pref}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Push Notifications</h4>
              <div className="space-y-3">
                {['Important alerts', 'Message reminders', 'Deadline warnings'].map(pref => (
                  <label key={pref} className="flex items-center">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-gray-600">{pref}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;