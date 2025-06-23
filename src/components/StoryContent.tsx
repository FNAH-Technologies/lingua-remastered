
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Star, Volume2, Globe, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ttsService } from '@/services/textToSpeechService';
import { toast } from "@/hooks/use-toast";

interface Story {
  id: string;
  title: string;
  titleFr: string;
  content: string;
  contentFr: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  readingTime: number;
  category: string;
  culturalContext: string;
  region: string;
  vocabulary: Array<{
    word: string;
    translation: string;
    definition: string;
    culturalNote?: string;
  }>;
}

const StoryContent = () => {
  const { language } = useLanguage();

  const stories: Story[] = [
    {
      id: '1',
      title: 'A Day in Paris',
      titleFr: 'Une journée à Paris',
      content: `Marie walks through the beautiful streets of Paris. She visits the Eiffel Tower and takes many photos. At a small café, she orders coffee and croissants. The waiter is very friendly and speaks slowly so Marie can understand. She practices her French and feels more confident each day.`,
      contentFr: `Marie se promène dans les belles rues de Paris. Elle visite la tour Eiffel et prend beaucoup de photos. Dans un petit café, elle commande du café et des croissants. Le serveur est très aimable et parle lentement pour que Marie puisse comprendre. Elle pratique son français et se sent plus confiante chaque jour.`,
      level: 'beginner',
      readingTime: 3,
      category: 'travel',
      culturalContext: 'French café culture',
      region: 'France - Île-de-France',
      vocabulary: [
        { word: 'beautiful', translation: 'belle/beau', definition: 'pleasing to look at', culturalNote: 'Often used to describe French architecture' },
        { word: 'friendly', translation: 'aimable', definition: 'kind and pleasant', culturalNote: 'Important value in French hospitality' },
        { word: 'confident', translation: 'confiant(e)', definition: 'feeling sure about yourself', culturalNote: 'Key to language learning success' }
      ]
    },
    {
      id: '2',
      title: 'The French Market',
      titleFr: 'Le marché français',
      content: `Every Saturday, the town square transforms into a bustling market. Vendors sell fresh fruits, vegetables, and local specialties. Sophie loves to practice her French by talking to the merchants. She learns new words like "pommes" for apples and "fromage" for cheese. The market is not just about shopping - it's about community and culture.`,
      contentFr: `Chaque samedi, la place du village se transforme en un marché animé. Les vendeurs vendent des fruits frais, des légumes et des spécialités locales. Sophie aime pratiquer son français en parlant aux marchands. Elle apprend de nouveaux mots comme "pommes" pour les pommes et "fromage" pour le fromage. Le marché ne concerne pas seulement les achats - il s'agit de communauté et de culture.`,
      level: 'intermediate',
      readingTime: 5,
      category: 'culture',
      culturalContext: 'Traditional French markets',
      region: 'France - Various regions',
      vocabulary: [
        { word: 'bustling', translation: 'animé', definition: 'busy and full of activity', culturalNote: 'Describes typical French market atmosphere' },
        { word: 'vendors', translation: 'vendeurs', definition: 'people who sell things', culturalNote: 'Often family businesses passed down generations' },
        { word: 'specialty', translation: 'spécialité', definition: 'something special or unique', culturalNote: 'Each French region has its own specialties' }
      ]
    }
  ];

  const handleReadAloud = async (text: string) => {
    if (!ttsService.hasApiKey()) {
      toast({
        title: language === 'fr' ? 'Configuration requise' : 'Setup Required',
        description: language === 'fr' ? 'Configurez votre clé API dans les paramètres' : 'Configure your API key in settings',
        variant: "destructive"
      });
      return;
    }

    try {
      await ttsService.speak(text);
    } catch (error) {
      console.error('TTS Error:', error);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-700 border-green-200';
      case 'intermediate': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'advanced': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {stories.map((story, index) => (
        <Card 
          key={story.id} 
          className="shadow-ios-card border-0 glass-ios backdrop-blur-20 animate-ios-slide-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <CardTitle className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-orange-500" />
                  {language === 'fr' ? story.titleFr : story.title}
                </CardTitle>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{story.region}</span>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <Badge className={`${getLevelColor(story.level)} border shadow-ios-small`}>
                  {story.level}
                </Badge>
                <Badge variant="outline" className="flex items-center space-x-1 bg-white/80 border-orange-200">
                  <Clock className="w-3 h-3" />
                  <span>{story.readingTime} min</span>
                </Badge>
              </div>
            </div>

            {/* Cultural Context */}
            <div className="bg-orange-50 p-3 rounded-lg border border-orange-200 mb-4">
              <p className="text-sm text-orange-800 flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                <strong>{language === 'fr' ? 'Contexte culturel:' : 'Cultural Context:'}</strong>
                <span className="ml-2">{story.culturalContext}</span>
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 capitalize flex items-center">
                <span className="font-medium">{language === 'fr' ? 'Catégorie:' : 'Category:'}</span>
                <span className="ml-2 bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs">
                  {story.category}
                </span>
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleReadAloud(language === 'fr' ? story.contentFr : story.content)}
                className="flex items-center space-x-2 shadow-ios-small hover:shadow-ios-medium transition-all duration-200"
              >
                <Volume2 className="w-4 h-4" />
                <span>{language === 'fr' ? 'Écouter' : 'Listen'}</span>
              </Button>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {language === 'fr' ? story.contentFr : story.content}
              </p>
            </div>
            
            {/* Enhanced Vocabulary Section with Cultural Notes */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-ios-small">
              <h4 className="font-semibold text-blue-900 mb-4 flex items-center text-lg">
                <BookOpen className="w-5 h-5 mr-2" />
                {language === 'fr' ? 'Vocabulaire culturel' : 'Cultural Vocabulary'}
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {story.vocabulary.map((word, index) => (
                  <div 
                    key={index} 
                    className="bg-white p-4 rounded-lg shadow-ios-small border border-blue-100 transform transition-all duration-200 hover:scale-102 hover:shadow-ios-medium"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-blue-800 text-lg">{word.word}</span>
                      <span className="text-blue-600 font-medium">{word.translation}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{word.definition}</p>
                    {word.culturalNote && (
                      <div className="bg-orange-50 p-2 rounded border border-orange-200">
                        <p className="text-xs text-orange-700">
                          <strong>{language === 'fr' ? 'Note culturelle:' : 'Cultural Note:'}</strong> {word.culturalNote}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StoryContent;
