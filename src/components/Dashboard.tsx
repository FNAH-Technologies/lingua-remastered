
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Trophy, Users, Settings, Flame, Star, Zap } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: 'Salutations en Ewondo',
      progress: 75,
      xp: 50,
      difficulty: 'Débutant',
      completed: false
    },
    {
      id: 2,
      title: 'Chiffres en Duala',
      progress: 45,
      xp: 40,
      difficulty: 'Débutant',
      completed: false
    },
    {
      id: 3,
      title: 'Famille en Bamiléké',
      progress: 100,
      xp: 60,
      difficulty: 'Intermédiaire',
      completed: true
    }
  ]);

  useEffect(() => {
    const userData = localStorage.getItem('lingua_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around max-w-md mx-auto">
        <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
          <BookOpen className="w-5 h-5 text-orange-500" />
          <span className="text-xs">Leçons</span>
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex flex-col items-center space-y-1"
          onClick={() => navigate('/challenges')}
        >
          <Zap className="w-5 h-5" />
          <span className="text-xs">Défis</span>
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex flex-col items-center space-y-1"
          onClick={() => navigate('/stories')}
        >
          <Star className="w-5 h-5" />
          <span className="text-xs">Histoires</span>
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex flex-col items-center space-y-1"
          onClick={() => navigate('/leaderboard')}
        >
          <Trophy className="w-5 h-5" />
          <span className="text-xs">Classement</span>
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex flex-col items-center space-y-1"
          onClick={() => navigate('/settings')}
        >
          <Settings className="w-5 h-5" />
          <span className="text-xs">Paramètres</span>
        </Button>
      </div>
    </div>
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 pb-20">
      {/* Header */}
      <div className="bg-lingua-gradient text-white p-6 rounded-b-3xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold">Bonjour, {user.name}!</h1>
            <p className="opacity-90">Continuons à apprendre</p>
          </div>
          <div className="flex items-center space-x-2">
            <Flame className="w-5 h-5" />
            <span className="font-bold">{user.streak}</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5" />
            <span className="font-semibold">{user.xp} XP</span>
          </div>
          <div className="flex-1">
            <Progress value={65} className="h-2 bg-white/20" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Daily Challenge */}
        <Card className="animate-bounce-in">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span>Défi du jour</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-3">Apprenez 5 nouveaux mots en Ewondo</p>
            <Button 
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
              onClick={() => navigate('/challenges')}
            >
              Commencer le défi
            </Button>
          </CardContent>
        </Card>

        {/* Lessons */}
        <div>
          <h2 className="text-xl font-bold mb-4">Vos leçons</h2>
          <div className="space-y-3">
            {lessons.map((lesson, index) => (
              <Card 
                key={lesson.id} 
                className="cursor-pointer hover:shadow-md transition-shadow animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/lesson/${lesson.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold">{lesson.title}</h3>
                      <Badge variant="secondary" className="mt-1">
                        {lesson.difficulty}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-orange-500">
                        <Star className="w-4 h-4" />
                        <span className="text-sm font-medium">{lesson.xp} XP</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progression</span>
                      <span>{lesson.progress}%</span>
                    </div>
                    <Progress value={lesson.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/challenges')}
          >
            <CardContent className="p-4 text-center">
              <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <h3 className="font-semibold">Défis</h3>
              <p className="text-sm text-gray-600">Challenges quotidiens</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/stories')}
          >
            <CardContent className="p-4 text-center">
              <BookOpen className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold">Histoires</h3>
              <p className="text-sm text-gray-600">Culture & Contes</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
