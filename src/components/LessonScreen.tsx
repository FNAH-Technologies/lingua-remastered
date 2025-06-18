
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Volume2, Mic, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LessonScreen = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Mock lesson data
  const lesson = {
    id: lessonId,
    title: 'Salutations en Ewondo',
    steps: [
      {
        type: 'vocabulary',
        word: 'Mbôlo',
        translation: 'Bonjour',
        pronunciation: 'mm-BOH-lo',
        audio: '/audio/mbolo.mp3',
        image: '/images/greeting.jpg'
      },
      {
        type: 'pronunciation',
        word: 'Mbôlo',
        translation: 'Bonjour',
        instruction: 'Répétez après moi'
      },
      {
        type: 'quiz',
        question: 'Comment dit-on "Bonjour" en Ewondo?',
        options: ['Mbôlo', 'Akwaaba', 'Sannu'],
        correct: 0
      }
    ]
  };

  const currentStepData = lesson.steps[currentStep];
  const progress = ((currentStep + 1) / lesson.steps.length) * 100;

  const playAudio = () => {
    // Mock audio play
    toast({
      title: "Audio joué",
      description: "Écoutez la pronunciation"
    });
  };

  const startRecording = () => {
    setIsRecording(true);
    
    // Mock speech recognition
    setTimeout(() => {
      setIsRecording(false);
      setIsCorrect(Math.random() > 0.3); // 70% success rate
      setShowResult(true);
      
      setTimeout(() => {
        setShowResult(false);
        handleNext();
      }, 2000);
    }, 2000);
  };

  const handleAnswer = (answerIndex: number) => {
    const correct = answerIndex === currentStepData.correct;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 10);
    }
    
    setTimeout(() => {
      setShowResult(false);
      handleNext();
    }, 1500);
  };

  const handleNext = () => {
    if (currentStep < lesson.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Lesson completed
      toast({
        title: "Leçon terminée!",
        description: `Score: ${score + (isCorrect ? 10 : 0)} points`,
      });
      navigate('/');
    }
  };

  const renderStep = () => {
    switch (currentStepData.type) {
      case 'vocabulary':
        return (
          <div className="text-center space-y-6">
            <div className="w-32 h-32 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">👋</span>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {currentStepData.word}
              </h2>
              <p className="text-lg text-gray-600">{currentStepData.translation}</p>
              <p className="text-sm text-orange-600 italic mt-1">
                [{currentStepData.pronunciation}]
              </p>
            </div>

            <Button
              onClick={playAudio}
              className="bg-green-500 hover:bg-green-600 text-white"
              size="lg"
            >
              <Volume2 className="w-5 h-5 mr-2" />
              Écouter
            </Button>

            <Button onClick={handleNext} className="w-full" size="lg">
              Continuer
            </Button>
          </div>
        );

      case 'pronunciation':
        return (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Dites: "{currentStepData.word}"
            </h2>
            <p className="text-gray-600">{currentStepData.instruction}</p>

            <div className="relative">
              <Button
                onClick={startRecording}
                disabled={isRecording}
                className={`w-24 h-24 rounded-full ${
                  isRecording 
                    ? 'bg-red-500 animate-pulse-glow' 
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
                size="lg"
              >
                <Mic className="w-8 h-8" />
              </Button>
              
              {isRecording && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <p className="text-sm text-red-600 animate-pulse">Enregistrement...</p>
                </div>
              )}
            </div>

            {showResult && (
              <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="flex items-center justify-center space-x-2">
                  {isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                  <span className={`font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {isCorrect ? 'Excellent!' : 'Réessayez'}
                  </span>
                </div>
              </div>
            )}
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 text-center">
              {currentStepData.question}
            </h2>

            <div className="space-y-3">
              {currentStepData.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  variant="outline"
                  className="w-full p-4 text-left hover:bg-orange-50"
                  disabled={showResult}
                >
                  {option}
                </Button>
              ))}
            </div>

            {showResult && (
              <div className={`p-4 rounded-lg text-center ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="flex items-center justify-center space-x-2">
                  {isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                  <span className={`font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex-1 mx-4">
            <Progress value={progress} className="h-3" />
          </div>
          
          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
            {score} XP
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-md mx-auto">
        <Card className="animate-slide-up">
          <CardContent className="p-6">
            {renderStep()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LessonScreen;
