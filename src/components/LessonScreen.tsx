
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, Star, Check, X, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { lessonDataService } from '@/services/lessonDataService';
import { toast } from "@/hooks/use-toast";
import Header from './Header';
import AudioManager from './audio/AudioManager';
import LoadingSpinner from './common/LoadingSpinner';

const LessonScreen = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hearts, setHearts] = useState(5);
  const [xp, setXp] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const lessonData = lessonDataService.getLessonById(lessonId || '1');
  
  useEffect(() => {
    // Simulate lesson loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (lessonData) {
      setProgress((currentQuestion / lessonData.questions.length) * 100);
    }
  }, [currentQuestion, lessonData]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text={language === 'fr' ? 'Chargement...' : 'Loading...'} />
      </div>
    );
  }

  if (!lessonData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <Card className="p-6 text-center max-w-md mx-4 card-ios">
          <CardContent>
            <Globe className="w-16 h-16 mx-auto mb-4 text-orange-500 animate-ios-float" />
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {language === 'fr' ? 'Leçon non trouvée' : 'Lesson Not Found'}
            </h2>
            <Button onClick={() => navigate('/')} className="btn-ios-primary">
              {language === 'fr' ? 'Retour à l\'accueil' : 'Back to Home'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = lessonData.questions[currentQuestion];
  const totalQuestions = lessonData.questions.length;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    const correct = selectedAnswer === currentQ.correct;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setXp(prev => prev + 10);
    } else {
      setHearts(prev => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Lesson completed
      toast({
        title: language === 'fr' ? 'Leçon terminée !' : 'Lesson Completed!',
        description: language === 'fr' ? `Vous avez gagné ${xp} XP !` : `You earned ${xp} XP!`
      });
      navigate('/', { state: { lessonCompleted: true, earnedXP: xp } });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 scroll-ios">
      <Header 
        title={language === 'fr' ? lessonData.titleFr : lessonData.title}
        showBack={true}
        onBack={() => navigate('/')}
        className="glass-ios"
      />

      {/* Enhanced Progress and Stats Bar */}
      <div className="p-4 glass-ios border-b border-orange-200/30 animate-ios-slide-up">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Progress 
                value={progress} 
                className="w-40 h-4 bg-orange-100 [&>div]:bg-gradient-to-r [&>div]:from-orange-400 [&>div]:to-amber-500 shadow-ios-small" 
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-ios-shimmer" />
            </div>
            <Badge variant="outline" className="bg-white/80 border-orange-200 text-orange-700 font-semibold">
              {currentQuestion + 1}/{totalQuestions}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/80 px-3 py-2 rounded-full shadow-ios-small">
              <Heart className="w-5 h-5 text-red-500 fill-current animate-ios-pulse" />
              <span className="font-bold text-red-600">{hearts}</span>
            </div>
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-ios-small px-3 py-2">
              <Star className="w-4 h-4 mr-1 animate-ios-glow" />
              {xp} XP
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        {!showResult ? (
          <>
            {/* Enhanced Question Card with Cultural Theme */}
            <Card className="shadow-ios-card border-0 glass-ios animate-ios-bounce-in backdrop-blur-20">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge className={`${getDifficultyColor(currentQ.difficulty)} shadow-ios-small border`}>
                    <Globe className="w-3 h-3 mr-1" />
                    {currentQ.type.replace('-', ' ')}
                  </Badge>
                  
                  {currentQ.audioText && (
                    <AudioManager 
                      text={currentQ.audioText}
                      size="sm"
                      variant="outline"
                      className="shadow-ios-small"
                    />
                  )}
                </div>
                
                <CardTitle className="text-xl font-bold text-gray-800 leading-relaxed">
                  {language === 'fr' ? currentQ.questionFr : currentQ.question}
                </CardTitle>
                
                {currentQ.pronunciation && (
                  <div className="bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700 italic font-medium">
                      /{currentQ.pronunciation}/
                    </p>
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full p-4 h-auto text-left justify-start transition-all duration-300 shadow-ios-small border-2 ${
                      selectedAnswer === option 
                        ? 'bg-orange-50 border-orange-300 shadow-ios-medium scale-105 transform' 
                        : 'hover:bg-orange-25 hover:scale-102 hover:shadow-ios-medium active:scale-98'
                    }`}
                    onClick={() => handleAnswerSelect(option)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                        selectedAnswer === option 
                          ? 'bg-orange-500 border-orange-500 scale-110 shadow-ios-small' 
                          : 'border-gray-300 hover:border-orange-300'
                      }`}>
                        {selectedAnswer === option && (
                          <div className="w-2 h-2 bg-white rounded-full m-0.5 animate-ios-pulse"></div>
                        )}
                      </div>
                      <span className="font-medium text-gray-800">{option}</span>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Enhanced Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className={`w-full font-bold py-6 text-lg shadow-ios-large transform transition-all duration-300 ${
                selectedAnswer 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-105 active:scale-95 animate-ios-glow' 
                  : 'bg-gray-300 cursor-not-allowed opacity-50'
              }`}
            >
              {language === 'fr' ? 'Vérifier' : 'Check'}
            </Button>
          </>
        ) : (
          /* Enhanced Result Card */
          <Card className={`shadow-ios-large border-0 transform transition-all duration-500 animate-ios-bounce-in ${
            isCorrect 
              ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' 
              : 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200'
          }`}>
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                {isCorrect ? (
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-ios-bounce-in shadow-ios-large">
                    <Check className="w-10 h-10 text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-ios-bounce-in shadow-ios-large">
                    <X className="w-10 h-10 text-white" strokeWidth={3} />
                  </div>
                )}
                
                <h3 className={`text-3xl font-bold mb-3 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect 
                    ? (language === 'fr' ? 'Excellent !' : 'Excellent!') 
                    : (language === 'fr' ? 'Pas tout à fait' : 'Not quite')
                  }
                </h3>
                
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  {language === 'fr' ? currentQ.explanationFr : currentQ.explanation}
                </p>
                
                {!isCorrect && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200 shadow-ios-small">
                    <p className="text-blue-800 font-semibold mb-2">
                      <strong>{language === 'fr' ? 'Bonne réponse :' : 'Correct answer:'}</strong>
                    </p>
                    <p className="text-blue-700 text-lg">{currentQ.correct}</p>
                    {currentQ.pronunciation && (
                      <p className="text-blue-600 italic mt-2 text-sm">
                        /{currentQ.pronunciation}/
                      </p>
                    )}
                  </div>
                )}
                
                {/* Audio for correct answer */}
                {currentQ.audioText && (
                  <div className="mt-4">
                    <AudioManager 
                      text={currentQ.audioText}
                      autoPlay={isCorrect}
                      size="md"
                      className="mx-auto shadow-ios-medium"
                    />
                  </div>
                )}
                
                {isCorrect && (
                  <Badge className="mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white animate-ios-glow shadow-ios-medium px-4 py-2 text-lg">
                    <Star className="w-4 h-4 mr-2" />
                    +10 XP
                  </Badge>
                )}
              </div>
              
              <Button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-6 text-lg transform transition-all duration-300 hover:scale-105 active:scale-95 shadow-ios-large"
              >
                {currentQuestion < totalQuestions - 1 
                  ? (language === 'fr' ? 'Continuer' : 'Continue')
                  : (language === 'fr' ? 'Terminer' : 'Complete')
                }
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LessonScreen;
