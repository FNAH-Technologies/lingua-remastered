
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Award, TrendingUp, BarChart3 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface StatsCardProps {
  streak: number;
}

const StatsCard = ({ streak }: StatsCardProps) => {
  const { language } = useLanguage();

  const stats = [
    {
      icon: Calendar,
      label: language === 'fr' ? 'Série actuelle' : 'Current Streak',
      value: `${streak}`,
      unit: language === 'fr' ? 'jours' : 'days',
      color: 'from-blue-500 to-cyan-500',
      bg: 'from-blue-50 to-cyan-50'
    },
    {
      icon: Award,
      label: language === 'fr' ? 'Leçons terminées' : 'Lessons Completed',
      value: '24',
      unit: '/30',
      color: 'from-green-500 to-emerald-500',
      bg: 'from-green-50 to-emerald-50'
    },
    {
      icon: TrendingUp,
      label: language === 'fr' ? 'Précision moyenne' : 'Average Accuracy',
      value: '92',
      unit: '%',
      color: 'from-purple-500 to-pink-500',
      bg: 'from-purple-50 to-pink-50'
    },
    {
      icon: BarChart3,
      label: language === 'fr' ? 'Rang cette semaine' : 'Weekly Rank',
      value: '#3',
      unit: '',
      color: 'from-orange-500 to-red-500',
      bg: 'from-orange-50 to-red-50'
    }
  ];

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-gray-900 px-1">
        {language === 'fr' ? 'Vos Statistiques' : 'Your Statistics'}
      </h2>
      
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white border-0 shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-4">
              <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-3 shadow-lg`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              
              <div className="space-y-1">
                <div className="flex items-baseline space-x-1">
                  <span className="text-xl font-bold text-gray-900">{stat.value}</span>
                  {stat.unit && <span className="text-sm text-gray-500">{stat.unit}</span>}
                </div>
                <p className="text-xs text-gray-600 leading-tight">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StatsCard;
