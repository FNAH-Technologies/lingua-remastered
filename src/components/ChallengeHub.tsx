
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Clock, 
  Trophy, 
  Star, 
  Flame, 
  Zap,
  BookOpen,
  Volume2,
  Award,
  Play
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const ChallengeHub = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);

  const challenges = [
    {
      id: 'daily-vocab',
      title: language === 'fr' ? 'Vocabulaire Quotidien' : 'Daily Vocabulary',
      description: language === 'fr' ? 'Apprenez 10 nouveaux mots aujourd\'hui' : 'Learn 10 new words today',
      icon: BookOpen,
      difficulty: language === 'fr' ? 'Facile' : 'Easy',
      xp: 50,
      timeLimit: 15,
      progress: 6,
      total: 10,
      color: 'from-green-400 to-emerald-500',
      type: 'vocabulary'
    },
    {
      id: 'speed-translation',
      title: language === 'fr' ? 'Traduction Rapide' : 'Speed Translation',
      description: language === 'fr' ? 'Traduisez 20 phrases en 5 minutes' : 'Translate 20 sentences in 5 minutes',
      icon: Zap,
      difficulty: language === 'fr' ? 'Moyen' : 'Medium',
      xp: 100,
      timeLimit: 5,
      progress: 0,
      total: 20,
      color: 'from-yellow-400 to-orange-500',
      type: 'translation'
    },
    {
      id: 'pronunciation-master',
      title: language === 'fr' ? 'Maître de Prononciation' : 'Pronunciation Master',
      description: language === 'fr' ? 'Prononcez parfaitement 15 mots' : 'Pronounce 15 words perfectly',
      icon: Volume2,
      difficulty: language === 'fr' ? 'Difficile' : 'Hard',
      xp: 150,
      timeLimit: 20,
      progress: 3,
      total: 15,
      color: 'from-purple-400 to-pink-500',
      type: 'pronunciation'
    },
    {
      id: 'grammar-challenge',
      title: language === 'fr' ? 'Défi Grammaire' : 'Grammar Challenge',
      description: language === 'fr' ? 'Complétez 25 exercices de grammaire' : 'Complete 25 grammar exercises',
      icon: Target,
      difficulty: language === 'fr' ? 'Moyen' : 'Medium',
      xp: 80,
      timeLimit: 30,
      progress: 12,
      total: 25,
      color: 'from-blue-400 to-cyan-500',
      type: 'grammar'
    },
    {
      id: 'story-comprehension',
      title: language === 'fr' ? 'Compréhension d\'Histoire' : 'Story Comprehension',
      description: language === 'fr' ? 'Lisez et répondez aux questions' : 'Read and answer questions',
      icon: Star,
      difficulty: language === 'fr' ? 'Facile' : 'Easy',
      xp: 75,
      timeLimit: 25,
      progress: 0,
      total: 1,
      color: 'from-indigo-400 to-purple-500',
      type: 'reading'
    },
    {
      id: 'weekly-streak',
      title: language === 'fr' ? 'Série Hebdomadaire' : 'Weekly Streak',
      description: language === 'fr' ? 'Maintenez votre série 7 jours' : 'Maintain your streak for 7 days',
      icon: Flame,
      difficulty: language === 'fr' ? 'Spécial' : 'Special',
      xp: 200,
      timeLimit: 0,
      progress: 5,
      total: 7,
      color: 'from-red-400 to-orange-500',
      type: 'streak'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'facile':
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'moyen':
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'difficile':
      case 'hard':
        return 'bg-red-100 text-red-700';
      case 'spécial':
      case 'special':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleStartChallenge = (challengeId: string) => {
    setActiveChallenge(challengeId);
    console.log(`Starting challenge: ${challengeId}`);
    // Navigate to lesson screen with challenge data
    navigate(`/lesson/${challengeId}`);
  };

  const completedChallenges = challenges.filter(c => c.progress === c.total).length;
  const totalXP = challenges.reduce((sum, c) => sum + (c.progress === c.total ? c.xp : 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Header 
        title={language === 'fr' ? 'Défis' : 'Challenges'}
        showBack={true}
      />

      <div className="p-4 max-w-4xl mx-auto space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{completedChallenges}</p>
              <p className="text-xs text-gray-600">{language === 'fr' ? 'Complétés' : 'Completed'}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{totalXP}</p>
              <p className="text-xs text-gray-600">XP {language === 'fr' ? 'Gagnés' : 'Earned'}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Target className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{challenges.length}</p>
              <p className="text-xs text-gray-600">{language === 'fr' ? 'Disponibles' : 'Available'}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {Math.round((completedChallenges / challenges.length) * 100)}%
              </p>
              <p className="text-xs text-gray-600">{language === 'fr' ? 'Réussite' : 'Success'}</p>
            </CardContent>
          </Card>
        </div>

        {/* Challenge Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map((challenge) => {
            const isCompleted = challenge.progress === challenge.total;
            const progressPercentage = (challenge.progress / challenge.total) * 100;

            return (
              <Card 
                key={challenge.id}
                className={`bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isCompleted ? 'ring-2 ring-green-200' : ''
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 bg-gradient-to-r ${challenge.color} rounded-xl flex items-center justify-center`}>
                      <challenge.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{challenge.title}</CardTitle>
                  <p className="text-sm text-gray-600">{challenge.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{language === 'fr' ? 'Progression' : 'Progress'}</span>
                      <span>{challenge.progress}/{challenge.total}</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  {/* Details */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{challenge.xp} XP</span>
                      </div>
                      {challenge.timeLimit > 0 && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{challenge.timeLimit} min</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className={`w-full ${
                      isCompleted 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : `bg-gradient-to-r ${challenge.color} hover:opacity-90`
                    } text-white shadow-md`}
                    onClick={() => handleStartChallenge(challenge.id)}
                    disabled={activeChallenge === challenge.id}
                  >
                    {isCompleted ? (
                      <>
                        <Trophy className="w-4 h-4 mr-2" />
                        {language === 'fr' ? 'Complété' : 'Completed'}
                      </>
                    ) : challenge.progress > 0 ? (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        {language === 'fr' ? 'Continuer' : 'Continue'}
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        {language === 'fr' ? 'Commencer' : 'Start Challenge'}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-xl">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-2">
              {language === 'fr' ? 'Prêt pour plus de défis?' : 'Ready for more challenges?'}
            </h3>
            <p className="mb-4 opacity-90">
              {language === 'fr' 
                ? 'Continuez votre apprentissage avec nos leçons principales'
                : 'Continue your learning with our main lessons'
              }
            </p>
            <Button 
              variant="secondary"
              className="bg-white text-purple-600 hover:bg-gray-100"
              onClick={() => navigate('/')}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              {language === 'fr' ? 'Retour aux Leçons' : 'Back to Lessons'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChallengeHub;
