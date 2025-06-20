
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Crown, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LevelProgressProps {
  level: number;
}

const LevelProgress = ({ level }: LevelProgressProps) => {
  const { language } = useLanguage();

  return (
    <Card className="bg-white border-0 shadow-sm rounded-2xl overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
              <span className="text-xs font-bold text-gray-800">{level}</span>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-gray-900">
                {language === 'fr' ? 'Niveau' : 'Level'} {level}
              </h3>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-semibold text-gray-700">2,450 XP</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>{language === 'fr' ? 'Progression' : 'Progress'}</span>
                <span>75%</span>
              </div>
              <div className="relative">
                <Progress value={75} className="h-3 bg-gray-100" />
                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-700" style={{ width: '75%' }}></div>
              </div>
              <p className="text-xs text-gray-500">
                {language === 'fr' ? '350 XP pour le niveau suivant' : '350 XP to next level'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LevelProgress;
