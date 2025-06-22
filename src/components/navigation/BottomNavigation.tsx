
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Book, Target, Trophy, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();

  const navItems = [
    {
      icon: Home,
      label: language === 'fr' ? 'Accueil' : 'Home',
      path: '/',
      color: 'text-blue-500'
    },
    {
      icon: Book,
      label: language === 'fr' ? 'Histoires' : 'Stories',
      path: '/stories',
      color: 'text-green-500'
    },
    {
      icon: Target,
      label: language === 'fr' ? 'Défis' : 'Challenges',
      path: '/challenges',
      color: 'text-orange-500'
    },
    {
      icon: Trophy,
      label: language === 'fr' ? 'Classement' : 'Leaderboard',
      path: '/leaderboard',
      color: 'text-purple-500'
    },
    {
      icon: User,
      label: language === 'fr' ? 'Profil' : 'Profile',
      path: '/profile',
      color: 'text-pink-500'
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 safe-bottom">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-gray-100 scale-110' 
                  : 'hover:bg-gray-50 active:scale-95'
              }`}
            >
              <div className={`w-6 h-6 ${isActive ? item.color : 'text-gray-400'} transition-colors duration-200`}>
                <item.icon className="w-full h-full" />
              </div>
              <span className={`text-xs font-medium ${
                isActive ? item.color : 'text-gray-400'
              } transition-colors duration-200`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
