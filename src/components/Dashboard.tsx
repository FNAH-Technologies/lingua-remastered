
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <DashboardHeader streak={streak} xp={xp} level={level} />

      <div className="px-4 pb-4 pt-2 space-y-4">
        {/* Enhanced Stats Overview */}
        <EnhancedStatsOverview 
          streak={streak} 
          xp={xp} 
          level={level}
          weeklyGoal={350}
          completedLessons={24}
          studyTime={180}
        />

        {/* Main Learning Path */}
        <MainContent />

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </div>
  );
};

export default Dashboard;
