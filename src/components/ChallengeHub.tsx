
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { Trophy, Clock, Zap, Users, Star, ArrowLeft } from 'lucide-react';

const ChallengeHub = () => {
  const navigate = useNavigate();
  const [challenges] = useState([
    {
      id: 1,
      title: 'Défi Quotidien',
      description: 'Apprenez 5 nouveaux mots en Ewondo',
      type: 'daily',
      reward: 50,
      progress: 60,
      timeLeft: '2h 30m',
      difficulty: 'Facile',
      participants: 1234
    },
    {
      id: 2,
      title: 'Marathon de Prononciation',
      description: 'Prononcez 20 phrases correctement',
      type: 'timed',
      reward: 100,
      progress: 25,
      timeLeft: '45m',
      difficulty: 'Moyen',
      participants: 567
    },
    {
      id: 3,
      title: 'Maître des Salutations',
      description: 'Complétez toutes les leçons de salutations',
      type: 'skill',
      reward: 150,
      progress: 80,
      timeLeft: '1 jour',
      difficulty: 'Difficile',
      participants: 234
    },
    {
      id: 4,
      title: 'Communauté Hebdomadaire',
      description: 'Défi en équipe: histoires culturelles',
      type: 'community',
      reward: 200,
      progress: 45,
      timeLeft: '3 jours',
      difficulty: 'Moyen',
      participants: 2156
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daily': return <Zap className="w-5 h-5" />;
      case 'timed': return <Clock className="w-5 h-5" />;
      case 'skill': return <Star className="w-5 h-5" />;
      case 'community': return <Users className="w-5 h-5" />;
      default: return <Trophy className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return 'bg-yellow-500';
      case 'timed': return 'bg-red-500';
      case 'skill': return 'bg-blue-500';
      case 'community': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile': return 'bg-green-100 text-green-800';
      case 'Moyen': return 'bg-yellow-100 text-yellow-800';
      case 'Difficile': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 pb-20">
      {/* Header */}
      <div className="bg-lingua-gradient text-white p-6 rounded-b-3xl">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/20 mr-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Hub des Défis</h1>
        </div>
        <p className="opacity-90">Relevez des défis et gagnez des récompenses!</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-gray-600">Défis gagnés</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">850</div>
              <div className="text-sm text-gray-600">XP bonus</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">#23</div>
              <div className="text-sm text-gray-600">Classement</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Challenges */}
        <div>
          <h2 className="text-xl font-bold mb-4">Défis Actifs</h2>
          <div className="space-y-4">
            {challenges.map((challenge, index) => (
              <Card 
                key={challenge.id} 
                className="cursor-pointer hover:shadow-md transition-shadow animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${getTypeColor(challenge.type)}`}>
                        {getTypeIcon(challenge.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{challenge.title}</CardTitle>
                        <p className="text-sm text-gray-600">{challenge.description}</p>
                      </div>
                    </div>
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progression</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} className="h-2" />
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{challenge.timeLeft}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{challenge.participants.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-orange-500">
                        <Star className="w-4 h-4" />
                        <span className="font-semibold">+{challenge.reward} XP</span>
                      </div>
                    </div>

                    <Button className="w-full bg-lingua-gradient hover:opacity-90 text-white">
                      {challenge.progress > 0 ? 'Continuer' : 'Commencer'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeHub;
