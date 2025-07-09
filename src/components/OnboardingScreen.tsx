import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ChevronLeft, ChevronRight, BookOpen, Target, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const { t } = useLanguage();
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
      title: t('onboarding.welcome.title'),
      subtitle: t('onboarding.welcome.subtitle'),
      description: t('onboarding.welcome.description'),
      icon: BookOpen,
      content: null
    },
    {
      title: t('onboarding.language.title'),
      subtitle: t('onboarding.language.subtitle'),
      description: t('onboarding.language.description'),
      icon: Users,
      content: (
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="w-full h-12 text-lg border-2 border-orange-200 focus:border-orange-500 transition-colors">
            <SelectValue placeholder="Choisissez votre langue ethnique" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang} className="text-lg py-3">
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    },
    {
      title: t('onboarding.goal.title'),
      subtitle: t('onboarding.goal.subtitle'),
      description: t('onboarding.goal.description'),
      icon: Target,
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-3xl font-bold text-orange-500">{dailyGoal[0]}</span>
            <span className="text-lg ml-2">{t('common.minutes')}/{t('common.day')}</span>
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
    // Make language selection optional for better UX
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
            {/* Enhanced Logo with proper bubble container for welcome slide */}
            {currentSlide === 0 ? (
              <div className="w-24 h-24 mx-auto relative">
                <div className="w-full h-full bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30 relative overflow-hidden">
                  {/* Inner glow effect */}
                  <div className="absolute inset-2 bg-white/20 rounded-full"></div>
                  {/* Logo container with proper aspect ratio */}
                  <div className="w-16 h-16 relative z-10 flex items-center justify-center">
                    <img 
                      src="/-uploads/54bc6f2e-b470-42a0-a685-de2f6c1f6398.png" 
                      alt="Lingua Logo" 
                      className="w-full h-full object-contain filter drop-shadow-sm"
                    />
                  </div>
                </div>
                {/* Enhanced floating bubbles with better positioning */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-300/60 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute top-3 -left-3 w-3 h-3 bg-orange-400/50 rounded-full animate-pulse shadow-md" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute -bottom-2 right-2 w-2 h-2 bg-red-400/60 rounded-full animate-pulse shadow-sm" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-1 -left-2 w-2.5 h-2.5 bg-orange-200/70 rounded-full animate-pulse shadow-sm" style={{animationDelay: '1.5s'}}></div>
              </div>
            ) : (
              <div className="w-16 h-16 mx-auto bg-lingua-gradient rounded-full flex items-center justify-center">
                <IconComponent className="w-8 h-8 text-white" />
              </div>
            )}

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
              className="flex items-center space-x-2 px-4 py-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Retour</span>
            </Button>

            <Button
              onClick={nextSlide}
              disabled={!canProceed()}
              className="bg-lingua-gradient hover:opacity-90 text-white flex items-center space-x-2 px-6 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 min-w-[120px]"
            >
              <span>{currentSlide === slides.length - 1 ? 'Commencer' : 'Suivant'}</span>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Language selection hint */}
          {currentSlide === 1 && !selectedLanguage && (
            <p className="text-sm text-orange-600 mt-4 text-center">
              Sélectionnez une langue pour continuer
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingScreen;
