
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Users, Trophy, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { analyticsService, CommunityStats } from '@/services/analyticsService';

const CommunityStatsWidget = () => {
  const { language } = useLanguage();
  const [stats, setStats] = useState<CommunityStats | null>(null);

  useEffect(() => {
    setStats(analyticsService.getCommunityStats());
  }, []);

  if (!stats) return null;

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-ios-card animate-ios-slide-up">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3 text-lg">
          <div className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center">
            <Globe className="w-5 h-5 text-purple-600" />
          </div>
          <span className="text-purple-800">
            {language === 'fr' ? 'Communauté Mondiale' : 'Global Community'}
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Total Community XP */}
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-1">
            {stats.communityXP.toLocaleString()}
          </div>
          <div className="text-sm text-purple-500">
            {language === 'fr' ? 'XP Communautaire Total' : 'Total Community XP'}
          </div>
        </div>

        {/* Regional Learners */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <Users className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Apprenants par Région' : 'Learners by Region'}
          </h4>
          <div className="space-y-2">
            {Object.entries(stats.regionalLearners).map(([region, count]) => (
              <div key={region} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{region}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-purple-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                      style={{ width: `${(count / Math.max(...Object.values(stats.regionalLearners))) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-purple-600">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Cultural Topics */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Sujets Populaires' : 'Popular Topics'}
          </h4>
          <div className="space-y-2">
            {stats.topCulturalTopics.slice(0, 3).map((topic, index) => (
              <div key={topic.topic} className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                  index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800">{topic.topic}</div>
                  <div className="text-xs text-gray-500">{topic.learners} {language === 'fr' ? 'apprenants' : 'learners'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Family Groups */}
        <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Trophy className="w-5 h-5 text-orange-600" />
              <div>
                <div className="font-semibold text-orange-800">
                  {language === 'fr' ? 'Groupes Familiaux Actifs' : 'Active Family Groups'}
                </div>
                <div className="text-sm text-orange-600">
                  {stats.activeFamilyGroups} {language === 'fr' ? 'familles apprennent ensemble' : 'families learning together'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityStatsWidget;
