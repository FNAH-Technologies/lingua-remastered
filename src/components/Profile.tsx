
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Star, 
  Trophy, 
  Flame, 
  Calendar, 
  Target, 
  BookOpen, 
  Award,
  Settings,
  Share2,
  Crown,
  Zap
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from './Header';

const Profile = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const [userStats] = useState({
    name: 'Marie Ngo',
    level: 15,
    xp: 2450,
    nextLevelXp: 2800,
    streak: 12,
    totalLessons: 48,
    completedStories: 12,
    achievements: 15,
    joinDate: '2024-01-15',
    currentRank: 2,
    weeklyXp: 340
  });

  const achievements = [
    {
      id: 1,
      title: language === 'fr' ? 'Premier Pas' : 'First Steps',
      description: language === 'fr' ? 'Terminez votre première leçon' : 'Complete your first lesson',
      icon: Star,
      color: 'from-yellow-400 to-orange-500',
      earned: true,
      earnedDate: '2024-01-16'
    },
    {
      id: 2,
      title: language === 'fr' ? 'Série de Feu' : 'Fire Streak',
      description: language === 'fr' ? 'Maintenez une série de 7 jours' : 'Maintain a 7-day streak',
      icon: Flame,
      color: 'from-orange-400 to-red-500',
      earned: true,
      earnedDate: '2024-01-23'
    },
    {
      id: 3,
      title: language === 'fr' ? 'Roi des Histoires' : 'Story King',
      description: language === 'fr' ? 'Terminez 10 histoires' : 'Complete 10 stories',
      icon: BookOpen,
      color: 'from-purple-400 to-pink-500',
      earned: true,
      earnedDate: '2024-02-05'
    },
    {
      id: 4,
      title: language === 'fr' ? 'Champion du Classement' : 'Leaderboard Champion',
      description: language === 'fr' ? 'Atteignez le top 3' : 'Reach top 3',
      icon: Crown,
      color: 'from-yellow-500 to-yellow-600',
      earned: true,
      earnedDate: '2024-02-10'
    },
    {
      id: 5,
      title: language === 'fr' ? 'Maître Vocabulaire' : 'Vocabulary Master',
      description: language === 'fr' ? 'Apprenez 100 nouveaux mots' : 'Learn 100 new words',
      icon: Target,
      color: 'from-blue-400 to-purple-500',
      earned: false
    },
    {
      id: 6,
      title: language === 'fr' ? 'Perfectionniste' : 'Perfectionist',
      description: language === 'fr' ? '95% de précision sur 20 leçons' : '95% accuracy on 20 lessons',
      icon: Award,
      color: 'from-emerald-400 to-teal-500',
      earned: false
    }
  ];

  const monthlyStats = [
    { month: 'Jan', xp: 450 },
    { month: 'Fév', xp: 680 },
    { month: 'Mar', xp: 520 },
    { month: 'Avr', xp: 780 },
    { month: 'Mai', xp: 920 },
    { month: 'Juin', xp: 1100 }
  ];

  const maxXp = Math.max(...monthlyStats.map(stat => stat.xp));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Header 
        title={language === 'fr' ? 'Profil' : 'Profile'}
        showBack={true}
        showSettings={true}
      />

      <div className="p-4 max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{userStats.name}</h2>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge className="bg-white/20 text-white border-white/30">
                    {language === 'fr' ? 'Niveau' : 'Level'} {userStats.level}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    {language === 'fr' ? 'Rang' : 'Rank'} #{userStats.currentRank}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Level Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{language === 'fr' ? 'Progression du niveau' : 'Level progress'}</span>
                <span>{userStats.xp}/{userStats.nextLevelXp} XP</span>
              </div>
              <Progress 
                value={(userStats.xp / userStats.nextLevelXp) * 100} 
                className="h-3 bg-white/20"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: language === 'fr' ? 'Série' : 'Streak', value: userStats.streak, icon: Flame, color: 'from-orange-400 to-red-500', suffix: language === 'fr' ? 'jours' : 'days' },
            { label: language === 'fr' ? 'Leçons' : 'Lessons', value: userStats.totalLessons, icon: BookOpen, color: 'from-blue-400 to-purple-500', suffix: '' },
            { label: language === 'fr' ? 'Histoires' : 'Stories', value: userStats.completedStories, icon: Star, color: 'from-purple-400 to-pink-500', suffix: '' },
            { label: language === 'fr' ? 'Succès' : 'Achievements', value: userStats.achievements, icon: Trophy, color: 'from-yellow-400 to-orange-500', suffix: '' }
          ].map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
              <CardContent className="p-4 text-center">
                <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-600">{stat.label}</p>
                {stat.suffix && <p className="text-xs text-gray-500">{stat.suffix}</p>}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* XP Progress Chart */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-purple-500" />
              <span>{language === 'fr' ? 'Progression XP' : 'XP Progress'}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end space-x-2 h-32">
              {monthlyStats.map((stat, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-purple-400 to-pink-500 rounded-t-lg transition-all duration-700 hover:from-purple-500 hover:to-pink-600"
                    style={{ height: `${(stat.xp / maxXp) * 100}%` }}
                  />
                  <span className="text-xs text-gray-600 mt-2">{stat.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span>{language === 'fr' ? 'Succès' : 'Achievements'}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    achievement.earned 
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' 
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${achievement.color} rounded-full flex items-center justify-center ${
                      !achievement.earned ? 'grayscale' : ''
                    }`}>
                      <achievement.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                      {achievement.earned && achievement.earnedDate && (
                        <p className="text-xs text-green-600 mt-1">
                          {language === 'fr' ? 'Obtenu le' : 'Earned on'} {new Date(achievement.earnedDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    {achievement.earned && (
                      <div className="text-green-500">
                        <Trophy className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            className="h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
            onClick={() => navigate('/leaderboard')}
          >
            <Trophy className="w-5 h-5 mr-2" />
            {language === 'fr' ? 'Voir le Classement' : 'View Leaderboard'}
          </Button>
          
          <Button 
            variant="outline"
            className="h-14 border-2 border-purple-200 hover:bg-purple-50"
            onClick={() => navigate('/settings')}
          >
            <Settings className="w-5 h-5 mr-2" />
            {language === 'fr' ? 'Paramètres' : 'Settings'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
