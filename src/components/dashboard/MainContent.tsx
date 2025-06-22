
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Play, Map } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import EnhancedProgressTree from '../EnhancedProgressTree';
import DuolingoProgressTree from '../DuolingoProgressTree';

const MainContent = () => {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Enhanced Duolingo-style Progress Tree */}
      <Card className="bg-white border-0 shadow-lg rounded-3xl overflow-hidden">
        <CardHeader className="pb-4 pt-5 px-5 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-3 text-base">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Map className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-gray-900 font-bold text-xl">
                  {t('dashboard.progress.map')}
                </span>
                <p className="text-sm text-gray-500 font-normal mt-1">
                  {language === 'fr' ? 'Suivez votre parcours d\'apprentissage ethnique' : 'Follow your ethnic language learning journey'}
                </p>
              </div>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-3">
          <DuolingoProgressTree />
        </CardContent>
      </Card>

      {/* Original Enhanced Progress Tree */}
      <Card className="bg-white border-0 shadow-lg rounded-3xl overflow-hidden">
        <CardHeader className="pb-4 pt-5 px-5 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-3 text-base">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-gray-900 font-bold text-xl">
                  {t('dashboard.detailed.lessons')}
                </span>
                <p className="text-sm text-gray-500 font-normal mt-1">
                  {language === 'fr' ? 'Explorez en profondeur chaque sujet ethnique' : 'Explore each ethnic topic in depth'}
                </p>
              </div>
            </CardTitle>
            <div className="w-12 h-12 bg-white/90 rounded-2xl flex items-center justify-center shadow-sm">
              <Play className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-3">
          <EnhancedProgressTree />
        </CardContent>
      </Card>
    </div>
  );
};

export default MainContent;
