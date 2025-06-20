
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import EnhancedProgressTree from '../EnhancedProgressTree';

const MainContent = () => {
  const { language } = useLanguage();

  return (
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
  );
};

export default MainContent;
