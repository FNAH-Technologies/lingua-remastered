
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Star, Play, Lock, Volume2, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from './Header';

const StoryHub = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  const stories = {
    beginner: [
      {
        id: 1,
        title: language === 'fr' ? 'Le Marché de Douala' : 'Douala Market',
        description: language === 'fr' ? 'Une histoire simple sur un voyage au marché local' : 'A simple story about a trip to the local market',
        duration: '5 min',
        difficulty: 'Débutant',
        stars: 3,
        isLocked: false,
        image: '🏪',
        progress: 100
      },
      {
        id: 2,
        title: language === 'fr' ? 'La Famille Camerounaise' : 'The Cameroonian Family',
        description: language === 'fr' ? 'Rencontrez une famille traditionnelle du Cameroun' : 'Meet a traditional Cameroonian family',
        duration: '7 min',
        difficulty: 'Débutant',
        stars: 2,
        isLocked: false,
        image: '👨‍👩‍👧‍👦',
        progress: 60
      },
      {
        id: 3,
        title: language === 'fr' ? 'Le Festival de Ngondo' : 'Ngondo Festival',
        description: language === 'fr' ? 'Découvrez la culture traditionnelle sawa' : 'Discover traditional Sawa culture',
        duration: '6 min',
        difficulty: 'Débutant',
        stars: 0,
        isLocked: true,
        image: '🎭',
        progress: 0
      }
    ],
    intermediate: [
      {
        id: 4,
        title: language === 'fr' ? 'L\'Aventure en Forêt' : 'Forest Adventure',
        description: language === 'fr' ? 'Une exploration de la forêt tropicale' : 'An exploration of the tropical rainforest',
        duration: '10 min',
        difficulty: 'Intermédiaire',
        stars: 1,
        isLocked: false,
        image: '🌲',
        progress: 30
      },
      {
        id: 5,
        title: language === 'fr' ? 'Le Commerce à Yaoundé' : 'Business in Yaoundé',
        description: language === 'fr' ? 'Apprenez le vocabulaire du commerce' : 'Learn business vocabulary',
        duration: '12 min',
        difficulty: 'Intermédiaire',
        stars: 0,
        isLocked: true,
        image: '🏢',
        progress: 0
      }
    ],
    advanced: [
      {
        id: 6,
        title: language === 'fr' ? 'Histoire du Cameroun' : 'History of Cameroon',
        description: language === 'fr' ? 'Explorez l\'histoire riche du pays' : 'Explore the rich history of the country',
        duration: '15 min',
        difficulty: 'Avancé',
        stars: 0,
        isLocked: true,
        image: '📚',
        progress: 0
      }
    ]
  };

  const currentStories = stories[selectedLevel];

  const handleStoryClick = (story: any) => {
    if (!story.isLocked) {
      // Navigate to story reader
      console.log('Opening story:', story.id);
    }
  };

  const playAudio = (story: any, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log('Playing audio for story:', story.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Header 
        title={language === 'fr' ? 'Histoires' : 'Stories'}
        showBack={true}
      />

      <div className="p-4 max-w-4xl mx-auto">
        {/* Level Selector */}
        <div className="flex p-1 bg-white/80 backdrop-blur-sm rounded-xl mb-6 shadow-sm">
          {[
            { key: 'beginner', label: language === 'fr' ? 'Débutant' : 'Beginner' },
            { key: 'intermediate', label: language === 'fr' ? 'Intermédiaire' : 'Intermediate' },
            { key: 'advanced', label: language === 'fr' ? 'Avancé' : 'Advanced' }
          ].map((level) => (
            <Button
              key={level.key}
              variant={selectedLevel === level.key ? 'default' : 'ghost'}
              className={`flex-1 transition-all duration-300 ${
                selectedLevel === level.key 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-white/60'
              }`}
              onClick={() => setSelectedLevel(level.key as any)}
            >
              {level.label}
            </Button>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentStories.map((story) => (
            <Card 
              key={story.id}
              className={`transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer border-0 bg-white/90 backdrop-blur-sm ${
                story.isLocked ? 'opacity-60' : ''
              }`}
              onClick={() => handleStoryClick(story)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{story.image}</div>
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-800 mb-1">
                        {story.title}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {story.difficulty}
                        </Badge>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{story.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {story.isLocked ? (
                    <Lock className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => playAudio(story, e)}
                      className="p-1 hover:bg-blue-100"
                    >
                      <Volume2 className="w-4 h-4 text-blue-500" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {story.description}
                </p>
                
                {!story.isLocked && (
                  <>
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">
                          {language === 'fr' ? 'Progression' : 'Progress'}
                        </span>
                        <span className="font-medium text-gray-700">{story.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full transition-all duration-700"
                          style={{ width: `${story.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* Stars */}
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        {Array.from({ length: 3 }, (_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < story.stars 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md"
                      >
                        <Play className="w-3 h-3 mr-1" />
                        {story.progress > 0 
                          ? (language === 'fr' ? 'Continuer' : 'Continue')
                          : (language === 'fr' ? 'Commencer' : 'Start')
                        }
                      </Button>
                    </div>
                  </>
                )}
                
                {story.isLocked && (
                  <div className="text-center py-2">
                    <p className="text-sm text-gray-500">
                      {language === 'fr' ? 'Terminez les histoires précédentes pour débloquer' : 'Complete previous stories to unlock'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Section */}
        <Card className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Users className="w-5 h-5 text-orange-500" />
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {language === 'fr' ? 'Histoires Communautaires' : 'Community Stories'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              {language === 'fr' 
                ? 'Découvrez des histoires créées par la communauté Lingua et partagez les vôtres !'
                : 'Discover stories created by the Lingua community and share your own!'
              }
            </p>
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
              <BookOpen className="w-4 h-4 mr-2" />
              {language === 'fr' ? 'Explorer' : 'Explore'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoryHub;
