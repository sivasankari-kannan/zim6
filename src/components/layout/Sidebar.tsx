import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Clock,
  Calendar,
  LogOut,
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  // Define menu items based on user role
  const getMenuItems = () => {
    if (user?.role === 'admin') {
      return [
        { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/gym-owners', icon: Users, label: 'Gym Owners' },
      ];
    }

    return [
      { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { path: '/members', icon: Users, label: 'Members' },
      { path: '/memberships', icon: CreditCard, label: 'Memberships' },
      { path: '/attendance', icon: Clock, label: 'Attendance' },
      { path: '/due-dates', icon: Calendar, label: 'Due Dates' },
    ];
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <span className="text-2xl font-bold text-primary-600">ZIM</span>
      </div>
      
      <div className="p-4">
        <div className="flex items-center p-4 border-b border-gray-200">
          <img
            src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=0EA5E9&color=fff`}
            alt={user?.name}
            className="h-10 w-10 rounded-full"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
        
        <nav className="mt-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive(item.path)
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md w-full"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;