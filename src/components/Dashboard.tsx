
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

  // Mock user data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setStreak(10);
      setXp(2800);
      setLevel(5);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader streak={streak} xp={xp} level={level} />

      <div className="px-4 pb-20 pt-2">
        {/* Main Learning Path */}
        <div className="mb-6">
          <MainContent />
        </div>

        {/* Stats and Actions Grid */}
        <div className="space-y-4">
          <LevelProgress level={level} />
          <QuickActions />
          <StatsCard streak={streak} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
