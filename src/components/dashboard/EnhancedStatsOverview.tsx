
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  Flame, 
  Target,
  Calendar,
  Clock,
  BookOpen,
  Award
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface EnhancedStatsOverviewProps {
  streak: number;
  xp: number;
  level: number;
  weeklyGoal?: number;
  completedLessons?: number;
  studyTime?: number;
}

const EnhancedStatsOverview = ({ 
  streak, 
  xp, 
  level, 
  weeklyGoal = 350,
  completedLessons = 24,
  studyTime = 180
}: EnhancedStatsOverviewProps) => {
  const { language } = useLanguage();
  
  const weeklyProgress = (xp % weeklyGoal) / weeklyGoal * 100;
  const nextLevelXP = level * 500;
  const currentLevelProgress = (xp % 500) / 500 * 100;

  const stats = [
    {
      icon: Flame,
      value: streak,
      label: language === 'fr' ? 'Jours de suite' : 'Day Streak',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    },
    {
      icon: Star,
      value: xp.toLocaleString(),
      label: language === 'fr' ? 'Points XP' : 'XP Points',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    },
    {
      icon: Trophy,
      value: level,
      label: language === 'fr' ? 'Niveau' : 'Level',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      icon: BookOpen,
      value: completedLessons,
      label: language === 'fr' ? 'Leçons' : 'Lessons',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-600 font-medium">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Weekly Goal Progress */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">
                  {language === 'fr' ? 'Objectif Hebdomadaire' : 'Weekly Goal'}
                </span>
              </div>
              <Badge className="bg-green-100 text-green-700">
                {Math.round(weeklyProgress)}%
              </Badge>
            </div>
            <Progress value={weeklyProgress} className="h-3 mb-2" />
            <p className="text-sm text-green-700">
              {xp % weeklyGoal}/{weeklyGoal} XP {language === 'fr' ? 'cette semaine' : 'this week'}
            </p>
          </CardContent>
        </Card>

        {/* Level Progress */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-lg">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-800">
                  {language === 'fr' ? 'Niveau' : 'Level'} {level}
                </span>
              </div>
              <Badge className="bg-purple-100 text-purple-700">
                {Math.round(currentLevelProgress)}%
              </Badge>
            </div>
            <Progress value={currentLevelProgress} className="h-3 mb-2" />
            <p className="text-sm text-purple-700">
              {500 - (xp % 500)} XP {language === 'fr' ? 'pour le niveau suivant' : 'to next level'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Study Time */}
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 shadow-xl">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{studyTime}min</p>
                <p className="text-sm opacity-90">
                  {language === 'fr' ? 'Temps d\'étude aujourd\'hui' : 'Study time today'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">
                {language === 'fr' ? 'Objectif: 30min' : 'Goal: 30min'}
              </p>
              <Badge className="bg-white/20 text-white mt-1">
                {Math.min(100, Math.round((studyTime / 30) * 100))}%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedStatsOverview;
