
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Play, Pause, Volume2, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { audioService, AudioContent } from '@/services/audioService';

const CulturalStoryWidget = () => {
  const { language } = useLanguage();
  const [currentStory, setCurrentStory] = useState<AudioContent | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [stories, setStories] = useState<AudioContent[]>([]);

  useEffect(() => {
    // Get the selected language from onboarding and set it for the audio service
    const onboardingData = localStorage.getItem('lingua_onboarding');
    if (onboardingData) {
      const { language } = JSON.parse(onboardingData);
      if (language) {
        audioService.setTargetLanguage(language);
      }
    }
    
    const storyContent = audioService.getAudioContent('story');
    setStories(storyContent);
    if (storyContent.length > 0) {
      setCurrentStory(storyContent[0]);
    }
  }, []);

  const handlePlay = async () => {
    if (!currentStory) return;
    
    try {
      setIsPlaying(true);
      await audioService.playAudio(currentStory.id);
      setIsPlaying(false);
    } catch (error) {
      console.error('Story playback failed:', error);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    audioService.stopAudio();
    setIsPlaying(false);
  };

  const handleNextStory = () => {
    if (!currentStory || stories.length === 0) return;
    
    const currentIndex = stories.findIndex(s => s.id === currentStory.id);
    const nextIndex = (currentIndex + 1) % stories.length;
    setCurrentStory(stories[nextIndex]);
    setIsLiked(false);
  };

  if (!currentStory) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-orange-600 bg-orange-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 shadow-ios-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-800">
                {language === 'fr' ? 'Contes Culturels' : 'Cultural Stories'}
              </h3>
              <p className="text-sm text-blue-600">
                {language === 'fr' ? 'Histoires traditionnelles' : 'Traditional Tales'}
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLiked(!isLiked)}
            className={`hover:scale-110 transition-transform ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Story Title */}
        <div className="text-center space-y-2">
          <h4 className="text-xl font-bold text-gray-800">
            {currentStory.text}
          </h4>
          <p className="text-lg text-blue-700 font-medium">
            {currentStory.textNative || currentStory.textEwondo}
          </p>
          <div className="flex items-center justify-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentStory.difficulty)}`}>
              {currentStory.difficulty}
            </span>
            <span className="text-sm text-gray-600">• {currentStory.region}</span>
          </div>
        </div>

        {/* Speaker Info */}
        <div className="bg-white/70 p-3 rounded-xl border border-blue-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">
                {currentStory.speakerName.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-800">{currentStory.speakerName}</p>
              <p className="text-sm text-gray-600">{currentStory.region}</p>
            </div>
          </div>
        </div>

        {/* Cultural Context */}
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
          <p className="text-sm text-amber-800">
            <strong>{language === 'fr' ? 'Contexte culturel:' : 'Cultural Context:'}</strong>
          </p>
          <p className="text-sm text-amber-700 mt-1">
            {currentStory.culturalContext}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-3">
          <Button
            onClick={isPlaying ? handleStop : handlePlay}
            disabled={isPlaying}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Écoute...' : 'Playing...'}
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Écouter' : 'Listen'}
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleNextStory}
            className="hover:scale-105 transition-transform"
          >
            {language === 'fr' ? 'Suivant' : 'Next'}
          </Button>
        </div>

        {/* Story Progress */}
        <div className="text-center text-sm text-gray-600">
          {language === 'fr' 
            ? `Histoire ${stories.findIndex(s => s.id === currentStory.id) + 1} sur ${stories.length}`
            : `Story ${stories.findIndex(s => s.id === currentStory.id) + 1} of ${stories.length}`
          }
        </div>
      </CardContent>
    </Card>
  );
};

export default CulturalStoryWidget;
