
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Play, Map, Globe, Users, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import EnhancedProgressTree from '../EnhancedProgressTree';
import DuolingoProgressTree from '../DuolingoProgressTree';

const MainContent = () => {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-4">
      {/* My Courses Card */}
      <Card className="bg-gradient-to-r from-orange-400 to-red-500 border-0 shadow-lg rounded-3xl overflow-hidden text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <button className="text-white/80 hover:text-white">←</button>
                <h2 className="text-xl font-bold">
                  {language === 'fr' ? 'Mes cours ethniques' : 'My ethnic courses'}
                </h2>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span>8 {language === 'fr' ? 'Langues' : 'Languages'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span>43 {language === 'fr' ? 'Leçons' : 'Lessons'}</span>
                </div>
              </div>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                <span className="text-white text-xl">🌍</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Categories */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gray-800 border-0 shadow-lg rounded-3xl overflow-hidden text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">
                {language === 'fr' ? 'Ewondo Traditionnel' : 'Traditional Ewondo'}
              </h3>
              <button className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center space-x-2 text-sm opacity-90 mb-3">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 bg-orange-500 rounded-full border-2 border-gray-800"></div>
                <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-gray-800"></div>
                <div className="w-6 h-6 bg-yellow-500 rounded-full border-2 border-gray-800"></div>
              </div>
              <span>+43</span>
            </div>
            <div className="text-xs opacity-75">
              {language === 'fr' ? 'Apprenez les salutations et expressions du quotidien' : 'Learn greetings and daily expressions'}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-blue-600 border-0 shadow-lg rounded-3xl overflow-hidden text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">
                {language === 'fr' ? 'Cultures et Traditions' : 'Cultures & Traditions'}
              </h3>
              <button className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                <Users className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center space-x-2 text-sm opacity-90 mb-3">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-purple-500"></div>
                <div className="w-6 h-6 bg-orange-500 rounded-full border-2 border-purple-500"></div>
                <div className="w-6 h-6 bg-cyan-500 rounded-full border-2 border-purple-500"></div>
              </div>
              <span>+12</span>
            </div>
            <div className="text-xs opacity-75">
              {language === 'fr' ? 'Découvrez les richesses culturelles africaines' : 'Discover African cultural heritage'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Duolingo-style Progress Tree */}
      <Card className="bg-white border-0 shadow-lg rounded-3xl overflow-hidden">
        <CardHeader className="pb-4 pt-5 px-5">
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
        </CardHeader>
        <CardContent className="p-5 pt-3">
          <DuolingoProgressTree />
        </CardContent>
      </Card>

      {/* Original Enhanced Progress Tree */}
      <Card className="bg-white border-0 shadow-lg rounded-3xl overflow-hidden">
        <CardHeader className="pb-4 pt-5 px-5">
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
        </CardHeader>
        <CardContent className="p-5 pt-3">
          <EnhancedProgressTree />
        </CardContent>
      </Card>
    </div>
  );
};

export default MainContent;
