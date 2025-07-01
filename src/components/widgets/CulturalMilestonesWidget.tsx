
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Crown, Star, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { advancedAnalyticsService, CulturalMilestone } from '@/services/advancedAnalyticsService';

const CulturalMilestonesWidget = () => {
  const { language } = useLanguage();
  const [milestones, setMilestones] = useState<CulturalMilestone[]>([]);
  const [userXP] = useState(850); // Mock user XP

  useEffect(() => {
    const allMilestones = advancedAnalyticsService.getCulturalMilestones();
    setMilestones(allMilestones);
    
    // Check for newly unlocked milestones
    const newlyUnlocked = advancedAnalyticsService.checkMilestoneProgress('user123', userXP);
    if (newlyUnlocked.length > 0) {
      console.log('New milestones unlocked:', newlyUnlocked);
    }
  }, [userXP]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'culture': return <Crown className="w-5 h-5" />;
      case 'tradition': return <Trophy className="w-5 h-5" />;
      case 'language': return <Star className="w-5 h-5" />;
      case 'history': return <Target className="w-5 h-5" />;
      default: return <Trophy className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'culture': return 'from-purple-400 to-pink-500';
      case 'tradition': return 'from-orange-400 to-red-500';
      case 'language': return 'from-blue-400 to-cyan-500';
      case 'history': return 'from-green-400 to-teal-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const unlockedMilestones = milestones.filter(m => m.unlocked);
  const nextMilestone = milestones.find(m => !m.unlocked && userXP < m.requiredXP);
  const progressToNext = nextMilestone ? (userXP / nextMilestone.requiredXP) * 100 : 100;

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-yellow-100 border-amber-200 shadow-ios-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
            <Trophy className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-amber-800">
              {language === 'fr' ? 'Étapes Culturelles' : 'Cultural Milestones'}
            </h3>
            <p className="text-sm text-amber-600">
              {language === 'fr' ? 'Votre chemin vers la sagesse' : 'Your path to wisdom'}
            </p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Overview */}
        <div className="text-center space-y-2">
          <div className="text-2xl font-bold text-amber-700">
            {unlockedMilestones.length}/{milestones.length}
          </div>
          <div className="text-sm text-amber-600">
            {language === 'fr' ? 'Étapes Débloquées' : 'Milestones Unlocked'}
          </div>
        </div>

        {/* Next Milestone Progress */}
        {nextMilestone && (
          <div className="bg-white/70 p-4 rounded-xl border border-amber-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-800">
                {language === 'fr' ? 'Prochaine Étape' : 'Next Milestone'}
              </span>
              <Badge variant="outline" className="bg-amber-100 text-amber-700">
                {Math.round(progressToNext)}%
              </Badge>
            </div>
            
            <h4 className="font-bold text-gray-800 mb-1">
              {language === 'fr' ? nextMilestone.nameFr : nextMilestone.name}
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              {nextMilestone.description}
            </p>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progressToNext, 100)}%` }}
              />
            </div>
            
            <div className="flex justify-between text-xs text-gray-600">
              <span>{userXP} XP</span>
              <span>{nextMilestone.requiredXP} XP</span>
            </div>
          </div>
        )}

        {/* Recent Unlocked Milestones */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800 flex items-center">
            <Star className="w-4 h-4 mr-2 text-amber-600" />
            {language === 'fr' ? 'Récemment Débloquées' : 'Recently Unlocked'}
          </h4>
          
          {unlockedMilestones.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <Target className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm">
                {language === 'fr' 
                  ? 'Commencez à apprendre pour débloquer des étapes!'
                  : 'Start learning to unlock milestones!'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {unlockedMilestones.slice(0, 2).map((milestone) => (
                <div key={milestone.id} className="flex items-center space-x-3 p-3 bg-white/70 rounded-xl border border-amber-200">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getCategoryColor(milestone.category)} flex items-center justify-center text-white`}>
                    {getCategoryIcon(milestone.category)}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-800">
                      {language === 'fr' ? milestone.nameFr : milestone.name}
                    </h5>
                    <p className="text-xs text-gray-600">
                      {milestone.culturalSignificance}
                    </p>
                    {milestone.unlockedAt && (
                      <p className="text-xs text-amber-600 mt-1">
                        {language === 'fr' ? 'Débloqué le' : 'Unlocked'} {milestone.unlockedAt.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cultural Significance Note */}
        <div className="bg-orange-50 p-3 rounded-xl border border-orange-200">
          <p className="text-xs text-orange-800">
            <strong>{language === 'fr' ? 'Note Culturelle:' : 'Cultural Note:'}</strong>
          </p>
          <p className="text-xs text-orange-700 mt-1">
            {language === 'fr' 
              ? 'Chaque étape représente un niveau de respect et de compréhension culturelle reconnu par la communauté.'
              : 'Each milestone represents a level of cultural respect and understanding recognized by the community.'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CulturalMilestonesWidget;
