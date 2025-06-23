
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardHeader from './dashboard/DashboardHeader';
import MainContent from './dashboard/MainContent';
import EnhancedStatsOverview from './dashboard/EnhancedStatsOverview';
import QuickActions from './dashboard/QuickActions';

const Dashboard = () => {
  const { language } = useLanguage();
  const [streak, setStreak] = useState(7);
  const [xp, setXp] = useState(1250);
  const [level, setLevel] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data loading with realistic delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setStreak(10);
      setXp(2800);
      setLevel(5);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 rounded-full border-4 border-orange-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 scroll-ios">
      <DashboardHeader streak={streak} xp={xp} level={level} />

      <div className="px-4 pb-20 pt-2 space-y-6 animate-ios-fade-in">
        {/* Enhanced Stats Overview */}
        <div className="animate-ios-slide-up" style={{ animationDelay: '0.1s' }}>
          <EnhancedStatsOverview 
            streak={streak} 
            xp={xp} 
            level={level}
            weeklyGoal={350}
            completedLessons={24}
            studyTime={180}
          />
        </div>

        {/* Main Learning Path */}
        <div className="animate-ios-slide-up" style={{ animationDelay: '0.2s' }}>
          <MainContent />
        </div>

        {/* Quick Actions */}
        <div className="animate-ios-slide-up" style={{ animationDelay: '0.3s' }}>
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
