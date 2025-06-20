
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

interface LevelProgressProps {
  level: number;
}

const LevelProgress = ({ level }: LevelProgressProps) => {
  const { language } = useLanguage();

  return (
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
  );
};

export default LevelProgress;
