
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Award, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface StatsCardProps {
  streak: number;
}

const StatsCard = ({ streak }: StatsCardProps) => {
  const { language } = useLanguage();

  return (
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
  );
};

export default StatsCard;
