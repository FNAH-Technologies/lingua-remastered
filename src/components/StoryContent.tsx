
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Star, Volume2 } from 'lucide-react';
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
  vocabulary: Array<{
    word: string;
    translation: string;
    definition: string;
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
      vocabulary: [
        { word: 'beautiful', translation: 'belle/beau', definition: 'pleasing to look at' },
        { word: 'friendly', translation: 'aimable', definition: 'kind and pleasant' },
        { word: 'confident', translation: 'confiant(e)', definition: 'feeling sure about yourself' }
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
      vocabulary: [
        { word: 'bustling', translation: 'animé', definition: 'busy and full of activity' },
        { word: 'vendors', translation: 'vendeurs', definition: 'people who sell things' },
        { word: 'specialty', translation: 'spécialité', definition: 'something special or unique' }
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
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {stories.map((story) => (
        <Card key={story.id} className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-gray-800">
                {language === 'fr' ? story.titleFr : story.title}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge className={getLevelColor(story.level)}>
                  {story.level}
                </Badge>
                <Badge variant="outline" className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{story.readingTime} min</span>
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 capitalize">
                {language === 'fr' ? 'Catégorie' : 'Category'}: {story.category}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleReadAloud(language === 'fr' ? story.contentFr : story.content)}
                className="flex items-center space-x-1"
              >
                <Volume2 className="w-4 h-4" />
                <span>{language === 'fr' ? 'Écouter' : 'Listen'}</span>
              </Button>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {language === 'fr' ? story.contentFr : story.content}
              </p>
            </div>
            
            {/* Vocabulary Section */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Vocabulaire clé' : 'Key Vocabulary'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {story.vocabulary.map((word, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-blue-800">{word.word}</span>
                      <span className="text-sm text-blue-600">{word.translation}</span>
                    </div>
                    <p className="text-xs text-gray-600">{word.definition}</p>
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
