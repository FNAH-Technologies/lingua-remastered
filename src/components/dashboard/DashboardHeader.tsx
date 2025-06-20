
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, Star } from 'lucide-react';
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
    <div className="bg-white/90 backdrop-blur-md border-b border-gray-100/50 p-3 sm:p-4 shadow-sm">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <LogoBubble size="sm" />
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            Lingua
          </h1>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="flex items-center space-x-1 sm:space-x-2 bg-orange-50 px-3 py-1 rounded-full">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
            <span className="font-semibold text-orange-600 text-sm sm:text-base">{streak}</span>
          </div>
          
          <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs sm:text-sm border-0">
            <Star className="w-3 h-3 mr-1" />
            {xp} XP
          </Badge>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/profile')}
            className="p-1 sm:p-2 hover:bg-gray-50"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm shadow-md">
              {level}
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
