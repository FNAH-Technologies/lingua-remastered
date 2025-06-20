
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Volume2, Heart, Star, Check, X, Mic, BookOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
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

  const lessonData = {
    title: language === 'fr' ? 'Communication de base' : 'Basic Communication',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: language === 'fr' ? 'Comment dit-on "Bonjour" en anglais ?' : 'How do you say "Hello" in French?',
        options: ['Good morning', 'Bonjour', 'Good night', 'Au revoir'],
        correct: language === 'fr' ? 'Good morning' : 'Bonjour',
        explanation: language === 'fr' ? '"Good morning" signifie "Bonjour" en anglais' : '"Bonjour" means "Hello" in French'
      },
      {
        id: 2,
        type: 'translation',
        question: language === 'fr' ? 'Traduisez: "Comment allez-vous ?"' : 'Translate: "How are you?"',
        options: ['How are you?', 'Where are you?', 'What are you?', 'Who are you?'],
        correct: language === 'fr' ? 'How are you?' : 'Comment allez-vous ?',
        explanation: language === 'fr' ? 'Cette phrase demande l\'état de la personne' : 'This phrase asks about someone\'s wellbeing'
      },
      {
        id: 3,
        type: 'listening',
        question: language === 'fr' ? 'Écoutez et choisissez la bonne réponse' : 'Listen and choose the correct answer',
        options: ['Merci', 'S\'il vous plaît', 'Excusez-moi', 'De rien'],
        correct: 'Merci',
        explanation: language === 'fr' ? '"Merci" exprime la gratitude' : '"Merci" expresses gratitude'
      }
    ]
  };

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
      navigate('/', { state: { lessonCompleted: true, earnedXP: xp } });
    }
  };

  const playAudio = () => {
    // Mock audio play functionality
    console.log('Playing audio for:', currentQ.question);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header 
        title={lessonData.title}
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
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-gray-800">
                    {currentQ.question}
                  </CardTitle>
                  {currentQ.type === 'listening' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={playAudio}
                      className="bg-blue-50 hover:bg-blue-100 border-blue-200"
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
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
                
                <p className="text-gray-600 mt-2">{currentQ.explanation}</p>
                
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
