
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import EnhancedProgressTree from '../EnhancedProgressTree';

const MainContent = () => {
  const { language } = useLanguage();

  return (
    <Card className="bg-white border-0 shadow-sm rounded-2xl overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-3 text-lg">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-gray-900 font-bold">
                {language === 'fr' ? 'Votre Parcours' : 'Your Learning Path'}
              </span>
              <p className="text-xs text-gray-500 font-normal">
                {language === 'fr' ? 'Continuez votre apprentissage' : 'Continue your learning journey'}
              </p>
            </div>
          </CardTitle>
          <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
            <Play className="w-4 h-4 text-blue-500" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <EnhancedProgressTree />
      </CardContent>
    </Card>
  );
};

export default MainContent;
