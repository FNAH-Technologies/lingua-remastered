
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
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto relative">
        {/* Animated background indicator */}
        <div 
          className="absolute top-2 h-12 w-16 bg-white/90 rounded-2xl shadow-ios-medium transition-all duration-500 ease-out backdrop-blur-20"
          style={{
            left: `${navItems.findIndex(item => location.pathname === item.path) * 20 + 10}%`,
            transform: 'translateX(-50%)',
            opacity: navItems.some(item => location.pathname === item.path) ? 1 : 0
          }}
        />
        
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={`relative flex flex-col items-center space-y-1 p-3 rounded-2xl transition-all duration-300 transform z-10 ${
                isActive 
                  ? 'scale-110 -translate-y-1' 
                  : 'hover:scale-105 active:scale-95'
              }`}
            >
              <div className={`w-6 h-6 transition-all duration-300 ${
                isActive ? item.color : 'text-gray-400'
              } ${isActive ? 'animate-ios-pulse' : ''}`}>
                <item.icon 
                  className="w-full h-full" 
                  strokeWidth={isActive ? 2.5 : 2}
                  style={{
                    filter: isActive ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' : 'none'
                  }}
                />
              </div>
              <span className={`text-xs font-semibold transition-all duration-300 ${
                isActive ? `${item.color} opacity-100` : 'text-gray-400 opacity-80'
              }`}>
                {item.label}
              </span>
              
              {/* Active indicator dot */}
              {isActive && (
                <div 
                  className={`absolute -bottom-1 w-1 h-1 ${item.color.replace('text-', 'bg-')} rounded-full animate-ios-pulse`}
                  style={{
                    boxShadow: `0 0 8px ${item.color.includes('blue') ? '#3b82f6' : 
                                        item.color.includes('green') ? '#10b981' :
                                        item.color.includes('orange') ? '#f59e0b' :
                                        item.color.includes('purple') ? '#8b5cf6' : '#ec4899'}`
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
