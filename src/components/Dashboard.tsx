import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Flame, 
  Calendar,
  BookOpen,
  Users,
  Target,
  TrendingUp,
  Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LogoBubble from './LogoBubble';
import ProgressTree from './ProgressTree';
import EnhancedProgressTree from './EnhancedProgressTree';

const Dashboard = () => {
  const navigate = useNavigate();
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
      {/* Enhanced Header */}
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

      <div className="max-w-6xl mx-auto p-3 sm:p-4 md:p-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6">
          {/* Main Content - Enhanced Progress Tree */}
          <div className="xl:col-span-3">
            <Card className="animate-slide-up overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="pb-2 sm:pb-4 bg-gradient-to-r from-orange-50 to-pink-50">
                <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                  <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                    {language === 'fr' ? 'Votre Parcours' : 'Your Learning Path'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-4 md:p-6">
                <EnhancedProgressTree />
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Enhanced Level Progress */}
            <Card className="animate-bounce-in bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="text-center space-y-3 sm:space-y-4">
                  <div className="relative mx-auto">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-lg sm:text-2xl font-bold shadow-lg">
                      {level}
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping opacity-20"></div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                      {language === 'fr' ? 'Niveau' : 'Level'} {level}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {language === 'fr' ? '250 XP jusqu\'au niveau suivant' : '250 XP to next level'}
                    </p>
                  </div>
                  
                  <div className="relative">
                    <Progress value={75} className="h-2 sm:h-3" />
                    <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-700" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Quick Actions */}
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-2 sm:pb-4">
                <CardTitle className="text-base sm:text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {language === 'fr' ? 'Actions Rapides' : 'Quick Actions'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3">
                <Button 
                  onClick={() => navigate('/stories')} 
                  className="w-full justify-start text-sm bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-0 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
                  variant="outline"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Histoires' : 'Stories'}
                </Button>
                
                <Button 
                  onClick={() => navigate('/challenges')} 
                  className="w-full justify-start text-sm bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
                  variant="outline"
                >
                  <Target className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Défis' : 'Challenges'}
                </Button>
                
                <Button 
                  onClick={() => navigate('/leaderboard')} 
                  className="w-full justify-start text-sm bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
                  variant="outline"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Classement' : 'Leaderboard'}
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced Stats */}
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-2 sm:pb-4">
                <CardTitle className="text-base sm:text-lg bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {language === 'fr' ? 'Statistiques' : 'Stats'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className="text-xs sm:text-sm font-medium">{language === 'fr' ? 'Série' : 'Streak'}</span>
                  </div>
                  <span className="font-bold text-sm text-blue-600">{streak} {language === 'fr' ? 'jours' : 'days'}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span className="text-xs sm:text-sm font-medium">{language === 'fr' ? 'Leçons' : 'Lessons'}</span>
                  </div>
                  <span className="font-bold text-sm text-yellow-600">12/25</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-xs sm:text-sm font-medium">{language === 'fr' ? 'Précision' : 'Accuracy'}</span>
                  </div>
                  <span className="font-bold text-sm text-green-600">87%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
