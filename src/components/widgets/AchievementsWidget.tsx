
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Lock, Trophy } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { gamificationService, Achievement } from '@/services/gamificationService';

const AchievementsWidget = () => {
  const { language } = useLanguage();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setAchievements(gamificationService.getAchievements());
  }, []);

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);
  const displayAchievements = showAll ? achievements : achievements.slice(0, 6);

  const getCategoryColor = (category: string) => {
    const colors = {
      cultural: 'bg-orange-100 text-orange-700 border-orange-200',
      language: 'bg-blue-100 text-blue-700 border-blue-200',
      community: 'bg-purple-100 text-purple-700 border-purple-200',
      heritage: 'bg-green-100 text-green-700 border-green-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <Card className="bg-white border-0 shadow-ios-card animate-ios-bounce-in">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-2xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-yellow-600" />
            </div>
            <span className="text-gray-800">
              {language === 'fr' ? 'Réalisations' : 'Achievements'}
            </span>
          </div>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            {unlockedAchievements.length}/{achievements.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {displayAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 shadow-ios-small'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="text-center space-y-2">
                <div className={`text-3xl ${achievement.unlocked ? 'animate-ios-float' : 'grayscale'}`}>
                  {achievement.unlocked ? achievement.icon : <Lock className="w-8 h-8 mx-auto text-gray-400" />}
                </div>
                
                <div>
                  <h4 className={`font-semibold text-sm ${achievement.unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                    {language === 'fr' ? achievement.nameFr : achievement.name}
                  </h4>
                  <p className={`text-xs mt-1 ${achievement.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                    {achievement.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge className={`text-xs ${getCategoryColor(achievement.category)}`}>
                    {achievement.category}
                  </Badge>
                  
                  {achievement.unlocked && (
                    <div className="flex items-center space-x-1 text-yellow-600">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-bold">+{achievement.xpReward}</span>
                    </div>
                  )}
                </div>
                
                {achievement.unlocked && achievement.unlockedAt && (
                  <div className="text-xs text-green-600 font-medium">
                    {language === 'fr' ? 'Débloqué' : 'Unlocked'} {achievement.unlockedAt.toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {achievements.length > 6 && (
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="w-full mt-4 hover:scale-105 transition-transform"
          >
            {showAll 
              ? (language === 'fr' ? 'Voir Moins' : 'Show Less')
              : (language === 'fr' ? 'Voir Tout' : 'Show All')
            }
          </Button>
        )}
        
        {unlockedAchievements.length > 0 && (
          <div className="bg-gradient-to-r from-yellow-100 to-amber-100 p-4 rounded-xl border border-yellow-200 text-center">
            <div className="text-yellow-800 font-semibold">
              {language === 'fr' ? 'XP Total des Réalisations' : 'Total Achievement XP'}
            </div>
            <div className="text-2xl font-bold text-yellow-600">
              {unlockedAchievements.reduce((sum, a) => sum + a.xpReward, 0)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AchievementsWidget;
