
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ChevronLeft, ChevronRight, BookOpen, Target, Users } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [dailyGoal, setDailyGoal] = useState([15]);

  const languages = [
    'Ewondo (Centre)',
    'Duala (Littoral)',
    'Bamiléké (Ouest)',
    'Fulfulde (Nord)',
    'Bassa (Centre/Littoral)',
    'Bamun (Ouest)',
    'Gbaya (Est)',
    'Bakweri (Sud-Ouest)'
  ];

  const slides = [
    {
      title: 'Bienvenue dans Lingua',
      subtitle: 'Découvrez les langues du Cameroun',
      description: 'Apprenez les langues camerounaises à travers des histoires, des défis et des leçons interactives.',
      icon: BookOpen,
      content: null
    },
    {
      title: 'Choisissez votre langue',
      subtitle: 'Quelle langue souhaitez-vous apprendre?',
      description: 'Sélectionnez la langue camerounaise qui vous intéresse le plus.',
      icon: Users,
      content: (
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionnez une langue" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    },
    {
      title: 'Définissez votre objectif',
      subtitle: 'Combien de minutes par jour?',
      description: 'Choisissez un objectif d\'apprentissage quotidien réaliste.',
      icon: Target,
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-3xl font-bold text-orange-500">{dailyGoal[0]}</span>
            <span className="text-lg ml-2">minutes/jour</span>
          </div>
          <Slider
            value={dailyGoal}
            onValueChange={setDailyGoal}
            max={60}
            min={5}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>5 min</span>
            <span>30 min</span>
            <span>60 min</span>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Save onboarding data
      localStorage.setItem('lingua_onboarding', JSON.stringify({
        language: selectedLanguage,
        dailyGoal: dailyGoal[0],
        completed: true
      }));
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const canProceed = () => {
    if (currentSlide === 1) return selectedLanguage !== '';
    return true;
  };

  const slide = slides[currentSlide];
  const IconComponent = slide.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-slide-up">
        <CardContent className="p-8">
          {/* Progress indicator */}
          <div className="flex justify-center mb-8">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full mx-1 transition-colors ${
                  index <= currentSlide ? 'bg-orange-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-lingua-gradient rounded-full flex items-center justify-center">
              <IconComponent className="w-8 h-8 text-white" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {slide.title}
              </h1>
              <h2 className="text-lg text-orange-600 mb-4">
                {slide.subtitle}
              </h2>
              <p className="text-gray-600">
                {slide.description}
              </p>
            </div>

            {slide.content && (
              <div className="py-4">
                {slide.content}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Retour</span>
            </Button>

            <Button
              onClick={nextSlide}
              disabled={!canProceed()}
              className="bg-lingua-gradient hover:opacity-90 text-white flex items-center space-x-2"
            >
              <span>{currentSlide === slides.length - 1 ? 'Commencer' : 'Suivant'}</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingScreen;
