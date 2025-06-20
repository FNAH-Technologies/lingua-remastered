
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import EnhancedProgressTree from '../EnhancedProgressTree';

const MainContent = () => {
  const { language } = useLanguage();

  return (
    <Card className="bg-white border-0 shadow-sm rounded-3xl overflow-hidden mb-4">
      <CardHeader className="pb-3 pt-4 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-3 text-base">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-gray-900 font-bold text-lg">
                {language === 'fr' ? 'Votre Parcours' : 'Your Learning Path'}
              </span>
              <p className="text-xs text-gray-500 font-normal mt-0.5">
                {language === 'fr' ? 'Continuez votre apprentissage' : 'Continue your learning journey'}
              </p>
            </div>
          </CardTitle>
          <div className="w-10 h-10 bg-white/90 rounded-2xl flex items-center justify-center shadow-sm">
            <Play className="w-5 h-5 text-blue-500" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <EnhancedProgressTree />
      </CardContent>
    </Card>
  );
};

export default MainContent;
