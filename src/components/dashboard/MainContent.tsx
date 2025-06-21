
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Play, Map } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import EnhancedProgressTree from '../EnhancedProgressTree';
import DuolingoProgressTree from '../DuolingoProgressTree';

const MainContent = () => {
  const { language } = useLanguage();

  return (
    <div className="space-y-4">
      {/* Duolingo-style Progress Tree */}
      <Card className="bg-white border-0 shadow-sm rounded-3xl overflow-hidden">
        <CardHeader className="pb-3 pt-4 px-4 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-3 text-base">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Map className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-gray-900 font-bold text-lg">
                  {language === 'fr' ? 'Carte de Progression' : 'Progress Map'}
                </span>
                <p className="text-xs text-gray-500 font-normal mt-0.5">
                  {language === 'fr' ? 'Suivez votre parcours' : 'Follow your learning path'}
                </p>
              </div>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <DuolingoProgressTree />
        </CardContent>
      </Card>

      {/* Original Enhanced Progress Tree */}
      <Card className="bg-white border-0 shadow-sm rounded-3xl overflow-hidden">
        <CardHeader className="pb-3 pt-4 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-3 text-base">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-gray-900 font-bold text-lg">
                  {language === 'fr' ? 'Leçons Détaillées' : 'Detailed Lessons'}
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
    </div>
  );
};

export default MainContent;
