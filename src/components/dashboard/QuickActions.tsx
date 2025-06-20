
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Target, Trophy, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const QuickActions = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const actions = [
    {
      title: language === 'fr' ? 'Histoires' : 'Stories',
      description: language === 'fr' ? 'Lisez et apprenez' : 'Read and learn',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
      route: '/stories'
    },
    {
      title: language === 'fr' ? 'Défis' : 'Challenges',
      description: language === 'fr' ? 'Testez vos compétences' : 'Test your skills',
      icon: Target,
      color: 'from-orange-500 to-red-500',
      route: '/challenges'
    },
    {
      title: language === 'fr' ? 'Classement' : 'Leaderboard',
      description: language === 'fr' ? 'Comparez vos scores' : 'Compare your scores',
      icon: Trophy,
      color: 'from-purple-500 to-pink-500',
      route: '/leaderboard'
    }
  ];

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-gray-900 px-1">
        {language === 'fr' ? 'Actions Rapides' : 'Quick Actions'}
      </h2>
      
      {actions.map((action, index) => (
        <Card 
          key={index}
          className="bg-white border-0 shadow-sm rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md active:scale-95"
          onClick={() => navigate(action.route)}
        >
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center shadow-lg`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{action.title}</h3>
                <p className="text-sm text-gray-500">{action.description}</p>
              </div>
              
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickActions;
