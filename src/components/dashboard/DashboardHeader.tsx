
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, Star, Bell, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LogoBubble from '../LogoBubble';

interface DashboardHeaderProps {
  streak: number;
  xp: number;
  level: number;
}

const DashboardHeader = ({ streak, xp, level }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="px-4 py-3">
        {/* Top row with logo and notifications */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <LogoBubble size="sm" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Lingua</h1>
              <p className="text-xs text-gray-500">Learn Cameroonian Languages</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 rounded-full"
            >
              <Bell className="w-5 h-5 text-gray-600" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/settings')}
              className="p-2 rounded-full"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-orange-50 px-3 py-2 rounded-full">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="font-bold text-orange-600 text-sm">{streak}</span>
              <span className="text-xs text-orange-500">day streak</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-purple-50 px-3 py-2 rounded-full">
              <Star className="w-4 h-4 text-purple-500" />
              <span className="font-bold text-purple-600 text-sm">{xp}</span>
              <span className="text-xs text-purple-500">XP</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/profile')}
            className="p-0 rounded-full"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
              {level}
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
