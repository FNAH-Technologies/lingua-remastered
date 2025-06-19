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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <LogoBubble size="sm" />
            <h1 className="text-2xl font-bold bg-lingua-gradient bg-clip-text text-transparent">
              Lingua
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="font-semibold text-orange-600">{streak}</span>
            </div>
            
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              {xp} XP
            </Badge>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/profile')}
              className="p-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                {level}
              </div>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Progress Tree */}
          <div className="lg:col-span-2">
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-6 h-6 text-orange-500" />
                  <span>{language === 'fr' ? 'Votre Parcours' : 'Your Learning Path'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProgressTree />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Level Progress */}
            <Card className="animate-bounce-in">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {level}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {language === 'fr' ? 'Niveau' : 'Level'} {level}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {language === 'fr' ? '250 XP jusqu\'au niveau suivant' : '250 XP to next level'}
                    </p>
                  </div>
                  
                  <Progress value={75} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'fr' ? 'Actions Rapides' : 'Quick Actions'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => navigate('/stories')} 
                  className="w-full justify-start"
                  variant="outline"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Histoires' : 'Stories'}
                </Button>
                
                <Button 
                  onClick={() => navigate('/challenges')} 
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Target className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Défis' : 'Challenges'}
                </Button>
                
                <Button 
                  onClick={() => navigate('/leaderboard')} 
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Classement' : 'Leaderboard'}
                </Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'fr' ? 'Statistiques' : 'Stats'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">{language === 'fr' ? 'Série' : 'Streak'}</span>
                  </div>
                  <span className="font-semibold">{streak} {language === 'fr' ? 'jours' : 'days'}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">{language === 'fr' ? 'Leçons' : 'Lessons'}</span>
                  </div>
                  <span className="font-semibold">12/25</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{language === 'fr' ? 'Précision' : 'Accuracy'}</span>
                  </div>
                  <span className="font-semibold">87%</span>
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
