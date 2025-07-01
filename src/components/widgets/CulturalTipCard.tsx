
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, RefreshCw, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { culturalContentService, CulturalTip } from '@/services/culturalContentService';
import { ttsService } from '@/services/textToSpeechService';

const CulturalTipCard = () => {
  const { language } = useLanguage();
  const [currentTip, setCurrentTip] = useState<CulturalTip | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setCurrentTip(culturalContentService.getRandomCulturalTip());
  }, []);

  const handleNewTip = () => {
    setCurrentTip(culturalContentService.getRandomCulturalTip());
    setIsLiked(false);
  };

  const handleSpeak = async () => {
    if (!currentTip) return;
    
    const textToSpeak = language === 'fr' ? currentTip.tipFr : currentTip.tip;
    await ttsService.speak(textToSpeak);
  };

  if (!currentTip) return null;

  const getCategoryIcon = (category: string) => {
    const icons = {
      greeting: '👋',
      family: '👨‍👩‍👧‍👦',
      food: '🍽️',
      tradition: '🏛️',
      language: '🗣️'
    };
    return icons[category as keyof typeof icons] || '💡';
  };

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 shadow-ios-card animate-ios-fade-in">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl">
              {getCategoryIcon(currentTip.category)}
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">
                {language === 'fr' ? 'Astuce Culturelle' : 'Cultural Tip'}
              </h3>
              <p className="text-sm text-orange-600 capitalize">
                {currentTip.category}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={`hover:scale-110 transition-transform ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSpeak}
              className="hover:scale-110 transition-transform"
            >
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            {language === 'fr' ? currentTip.tipFr : currentTip.tip}
          </p>
          
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800 font-medium">
              <strong>Ewondo:</strong> {currentTip.tipEwondo}
            </p>
          </div>
          
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
            <p className="text-xs text-amber-800">
              <strong>{language === 'fr' ? 'Contexte culturel:' : 'Cultural Context:'}</strong> {currentTip.culturalContext}
            </p>
          </div>
          
          <Button
            onClick={handleNewTip}
            variant="outline"
            className="w-full mt-4 hover:scale-105 transition-transform"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Nouvelle Astuce' : 'New Tip'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CulturalTipCard;
