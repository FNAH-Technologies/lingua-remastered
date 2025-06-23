
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
    <div className="fixed bottom-0 left-0 right-0 nav-ios shadow-ios-large z-50 safe-bottom">
      <div className="flex items-center justify-around py-3 px-6 max-w-md mx-auto">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center space-y-1 p-3 rounded-2xl transition-all duration-300 ripple-ios touch-feedback ${
                isActive 
                  ? 'bg-white/80 shadow-ios-small scale-110 backdrop-blur-20' 
                  : 'hover:bg-white/40 active:scale-95'
              }`}
            >
              <div className={`w-6 h-6 ${isActive ? item.color : 'text-gray-400'} transition-all duration-300 ${isActive ? 'animate-ios-pulse' : ''}`}>
                <item.icon className="w-full h-full" strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-xs font-semibold ${
                isActive ? item.color : 'text-gray-400'
              } transition-all duration-300`}>
                {item.label}
              </span>
              {isActive && (
                <div className={`w-1 h-1 ${item.color.replace('text-', 'bg-')} rounded-full animate-ios-pulse`}></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
