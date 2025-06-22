
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Clock, Target, Book, Star, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface EnhancedStatsOverviewProps {
  streak: number;
  xp: number;
  level: number;
  weeklyGoal: number;
  completedLessons: number;
  studyTime: number;
}

const EnhancedStatsOverview = ({ 
  streak, 
  xp, 
  level, 
  weeklyGoal, 
  completedLessons, 
  studyTime 
}: EnhancedStatsOverviewProps) => {
  const { language } = useLanguage();

  const currentWeekXP = 245;
  const goalProgress = (currentWeekXP / weeklyGoal) * 100;

  return (
    <div className="space-y-4">
      {/* Main Achievement Card */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 border-0 shadow-lg rounded-3xl overflow-hidden text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold mb-1">
                {language === 'fr' ? 'Série d\'Olympiades' : 'A series of Olympiads'}
              </h3>
              <p className="text-sm opacity-90 mb-4">
                {language === 'fr' 
                  ? 'Une série d\'Olympiades pour draguer les gens partout dans le monde' 
                  : 'A series of Olympiads to engage people all over the world'
                }
              </p>
              <div className="flex items-center space-x-4">
                <button className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 text-sm font-medium hover:bg-white/30 transition-all">
                  →
                </button>
              </div>
            </div>
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center">
              <Trophy className="w-10 h-10 text-yellow-300" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Lessons Count */}
        <Card className="bg-white border-0 shadow-lg rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center">
                <Book className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">{completedLessons}</div>
            <div className="text-sm text-gray-500">
              {language === 'fr' ? 'Leçons' : 'Lessons'}
            </div>
          </CardContent>
        </Card>

        {/* Study Hours */}
        <Card className="bg-white border-0 shadow-lg rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">{Math.floor(studyTime/60)}</div>
            <div className="text-sm text-gray-500">
              {language === 'fr' ? 'Heures' : 'Hours'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Performance */}
      <Card className="bg-white border-0 shadow-lg rounded-3xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              {language === 'fr' ? 'Performance des progrès' : 'Progress performance'}
            </h3>
            <button className="text-gray-400">•••</button>
          </div>
          
          {/* Monthly Progress */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">
                {language === 'fr' ? 'Juin' : 'June'}
              </div>
              <div className="w-full h-12 bg-gray-100 rounded-xl flex items-end justify-center">
                <div className="w-4 bg-orange-400 rounded-t-lg" style={{height: '60%'}}></div>
              </div>
              <div className="text-xs text-gray-400 mt-1">23 {language === 'fr' ? 'leçons' : 'lessons'}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">
                {language === 'fr' ? 'Juillet' : 'July'}
              </div>
              <div className="w-full h-12 bg-gray-100 rounded-xl flex items-end justify-center">
                <div className="w-4 bg-blue-400 rounded-t-lg" style={{height: '80%'}}></div>
              </div>
              <div className="text-xs text-gray-400 mt-1">31 {language === 'fr' ? 'leçons' : 'lessons'}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">
                {language === 'fr' ? 'Août' : 'August'}
              </div>
              <div className="w-full h-12 bg-gray-100 rounded-xl flex items-end justify-center">
                <div className="w-4 bg-purple-400 rounded-t-lg" style={{height: '45%'}}></div>
              </div>
              <div className="text-xs text-gray-400 mt-1">18 {language === 'fr' ? 'leçons' : 'lessons'}</div>
            </div>
          </div>

          {/* Weekly Goal Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                {language === 'fr' ? 'Objectif hebdomadaire' : 'Weekly goal'}
              </span>
              <span className="text-sm text-gray-500">{currentWeekXP}/{weeklyGoal} XP</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(goalProgress, 100)}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedStatsOverview;
