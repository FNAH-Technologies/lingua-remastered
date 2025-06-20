
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Target, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const QuickActions = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
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
  );
};

export default QuickActions;
