
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Volume2, Heart, Star, Check, X, Mic, BookOpen, VolumeX } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { lessonDataService, LessonQuestion } from '@/services/lessonDataService';
import { ttsService } from '@/services/textToSpeechService';
import { toast } from "@/hooks/use-toast";
import Header from './Header';

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
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const lessonData = lessonDataService.getLessonById(lessonId || '1');
  
  if (!lessonData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <Card className="p-6 text-center">
          <CardContent>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {language === 'fr' ? 'Leçon non trouvée' : 'Lesson Not Found'}
            </h2>
            <Button onClick={() => navigate('/')}>
              {language === 'fr' ? 'Retour à l\'accueil' : 'Back to Home'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = lessonData.questions[currentQuestion];
  const totalQuestions = lessonData.questions.length;

  useEffect(() => {
    setProgress((currentQuestion / totalQuestions) * 100);
  }, [currentQuestion, totalQuestions]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    const correct = selectedAnswer === currentQ.correct;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setXp(prev => prev + 10);
      // Play success sound or pronunciation
      if (currentQ.audioText && ttsService.hasApiKey()) {
        handlePlayAudio(currentQ.audioText);
      }
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

  const handlePlayAudio = async (text: string) => {
    if (!ttsService.hasApiKey()) {
      toast({
        title: language === 'fr' ? 'Configuration requise' : 'Setup Required',
        description: language === 'fr' ? 'Configurez votre clé API dans les paramètres pour utiliser la synthèse vocale' : 'Configure your API key in settings to use text-to-speech',
        variant: "destructive"
      });
      return;
    }

    setIsPlayingAudio(true);
    try {
      await ttsService.speak(text);
    } catch (error) {
      console.error('TTS Error:', error);
    } finally {
      setIsPlayingAudio(false);
    }
  };

  const getQuestionTypeIcon = (type: string) => {
    switch (type) {
      case 'listening': return <Volume2 className="w-4 h-4" />;
      case 'speaking': return <Mic className="w-4 h-4" />;
      case 'translation': return <BookOpen className="w-4 h-4" />;
      default: return <Check className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header 
        title={language === 'fr' ? lessonData.titleFr : lessonData.title}
        showBack={true}
        onBack={() => navigate('/')}
      />

      {/* Progress and Stats Bar */}
      <div className="p-4 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Progress value={progress} className="w-32 h-3" />
            <span className="text-sm font-medium text-gray-600">
              {currentQuestion + 1}/{totalQuestions}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Heart className="w-5 h-5 text-red-500 fill-current" />
              <span className="font-bold text-red-600">{hearts}</span>
            </div>
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <Star className="w-3 h-3 mr-1" />
              {xp} XP
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        {!showResult ? (
          <>
            {/* Question Card */}
            <Card className="mb-6 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge className={getDifficultyColor(currentQ.difficulty)}>
                      {getQuestionTypeIcon(currentQ.type)}
                      <span className="ml-1 capitalize">{currentQ.type.replace('-', ' ')}</span>
                    </Badge>
                    <Badge variant="outline" className={getDifficultyColor(currentQ.difficulty)}>
                      {currentQ.difficulty}
                    </Badge>
                  </div>
                  
                  {currentQ.audioText && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePlayAudio(currentQ.audioText!)}
                      disabled={isPlayingAudio}
                      className="bg-blue-50 hover:bg-blue-100 border-blue-200"
                    >
                      {isPlayingAudio ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </Button>
                  )}
                </div>
                
                <CardTitle className="text-lg font-bold text-gray-800">
                  {language === 'fr' ? currentQ.questionFr : currentQ.question}
                </CardTitle>
                
                {currentQ.pronunciation && (
                  <p className="text-sm text-blue-600 italic">
                    /{currentQ.pronunciation}/
                  </p>
                )}
              </CardHeader>
              
              <CardContent className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full p-4 h-auto text-left justify-start transition-all duration-200 ${
                      selectedAnswer === option 
                        ? 'bg-blue-50 border-blue-300 shadow-md' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleAnswerSelect(option)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        selectedAnswer === option 
                          ? 'bg-blue-500 border-blue-500' 
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswer === option && (
                          <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                        )}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {language === 'fr' ? 'Vérifier' : 'Check'}
            </Button>
          </>
        ) : (
          /* Result Card */
          <Card className={`shadow-xl border-0 ${isCorrect ? 'bg-gradient-to-br from-green-50 to-emerald-50' : 'bg-gradient-to-br from-red-50 to-pink-50'}`}>
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                {isCorrect ? (
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <X className="w-8 h-8 text-white" />
                  </div>
                )}
                
                <h3 className={`text-2xl font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect 
                    ? (language === 'fr' ? 'Correct !' : 'Correct!') 
                    : (language === 'fr' ? 'Incorrect' : 'Incorrect')
                  }
                </h3>
                
                <p className="text-gray-600 mt-2">
                  {language === 'fr' ? currentQ.explanationFr : currentQ.explanation}
                </p>
                
                {!isCorrect && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>{language === 'fr' ? 'Bonne réponse :' : 'Correct answer:'}</strong> {currentQ.correct}
                    </p>
                    {currentQ.pronunciation && (
                      <p className="text-sm text-blue-600 italic mt-1">
                        /{currentQ.pronunciation}/
                      </p>
                    )}
                  </div>
                )}
                
                {isCorrect && (
                  <Badge className="mt-3 bg-yellow-500 text-white">
                    +10 XP
                  </Badge>
                )}
              </div>
              
              <Button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 text-lg"
              >
                {currentQuestion < totalQuestions - 1 
                  ? (language === 'fr' ? 'Suivant' : 'Continue')
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
