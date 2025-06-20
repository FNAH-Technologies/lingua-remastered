
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardHeader from './dashboard/DashboardHeader';
import MainContent from './dashboard/MainContent';
import LevelProgress from './dashboard/LevelProgress';
import QuickActions from './dashboard/QuickActions';
import StatsCard from './dashboard/StatsCard';

const Dashboard = () => {
  const { language, t } = useLanguage();
  const [streak, setStreak] = useState(7);
  const [xp, setXp] = useState(1250);
  const [level, setLevel] = useState(3);

  // Mock user data loading (replace with actual data fetching)
  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      // In a real app, fetch user data from an API or local storage here
      // and update the state accordingly
      setStreak(10);
      setXp(2800);
      setLevel(5);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Animation states
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fadeIn = isMounted ? 'animate-slide-up' : 'opacity-0';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <DashboardHeader streak={streak} xp={xp} level={level} />

      <div className="max-w-6xl mx-auto p-3 sm:p-4 md:p-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6">
          {/* Main Content - Enhanced Progress Tree */}
          <div className="xl:col-span-3">
            <MainContent />
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            <LevelProgress level={level} />
            <QuickActions />
            <StatsCard streak={streak} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
