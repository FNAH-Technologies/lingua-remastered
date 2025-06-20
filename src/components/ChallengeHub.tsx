
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, Trophy, Flame, Clock, Star, Users, Zap, Award, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from './Header';

const ChallengeHub = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'special'>('daily');

  const challenges = {
    daily: [
      {
        id: 1,
        title: language === 'fr' ? 'Série Quotidienne' : 'Daily Streak',
        description: language === 'fr' ? 'Terminez une leçon aujourd\'hui' : 'Complete one lesson today',
        progress: 1,
        target: 1,
        reward: '10 XP',
        icon: Flame,
        color: 'from-orange-400 to-red-500',
        completed: true
      },
      {
        id: 2,
        title: language === 'fr' ? 'Maître du Vocabulaire' : 'Vocabulary Master',
        description: language === 'fr' ? 'Apprenez 5 nouveaux mots' : 'Learn 5 new words',
        progress: 3,
        target: 5,
        reward: '15 XP',
        icon: Star,
        color: 'from-yellow-400 to-orange-500',
        completed: false
      },
      {
        id: 3,
        title: language === 'fr' ? 'Écoute Active' : 'Active Listening',
        description: language === 'fr' ? 'Terminez 3 exercices d\'écoute' : 'Complete 3 listening exercises',
        progress: 1,
        target: 3,
        reward: '20 XP',
        icon: Target,
        color: 'from-blue-400 to-purple-500',
        completed: false
      }
    ],
    weekly: [
      {
        id: 4,
        title: language === 'fr' ? 'Guerrier de la Semaine' : 'Weekly Warrior',
        description: language === 'fr' ? 'Terminez 20 leçons cette semaine' : 'Complete 20 lessons this week',
        progress: 8,
        target: 20,
        reward: '100 XP',
        icon: Trophy,
        color: 'from-purple-400 to-pink-500',
        completed: false
      },
      {
        id: 5,
        title: language === 'fr' ? 'Perfectionniste' : 'Perfectionist',
        description: language === 'fr' ? 'Obtenez 90% de précision dans 10 leçons' : 'Get 90% accuracy in 10 lessons',
        progress: 4,
        target: 10,
        reward: '150 XP',
        icon: Award,
        color: 'from-emerald-400 to-teal-500',
        completed: false
      }
    ],
    special: [
      {
        id: 6,
        title: language === 'fr' ? 'Défi Culturel Camerounais' : 'Cameroonian Culture Challenge',
        description: language === 'fr' ? 'Apprenez 50 expressions culturelles' : 'Learn 50 cultural expressions',
        progress: 15,
        target: 50,
        reward: '500 XP + Badge',
        icon: Users,
        color: 'from-green-400 to-blue-500',
        completed: false,
        timeLeft: '12 jours'
      }
    ]
  };

  const currentChallenges = challenges[activeTab];

  const handleChallengeClick = (challenge: any) => {
    if (!challenge.completed) {
      console.log('Starting challenge:', challenge.id);
      // Navigate to relevant lesson or activity
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header 
        title={language === 'fr' ? 'Défis' : 'Challenges'}
        showBack={true}
      />

      <div className="p-4 max-w-4xl mx-auto">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: language === 'fr' ? 'Défis Terminés' : 'Challenges Complete', value: '12', icon: Trophy, color: 'from-yellow-400 to-orange-500' },
            { label: language === 'fr' ? 'XP Cette Semaine' : 'Weekly XP', value: '340', icon: Zap, color: 'from-purple-400 to-pink-500' },
            { label: language === 'fr' ? 'Série Actuelle' : 'Current Streak', value: '7', icon: Flame, color: 'from-orange-400 to-red-500' }
          ].map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
              <CardContent className="p-4 text-center">
                <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Challenge Categories */}
        <div className="flex p-1 bg-white/80 backdrop-blur-sm rounded-xl mb-6 shadow-sm">
          {[
            { key: 'daily', label: language === 'fr' ? 'Quotidien' : 'Daily', icon: Calendar },
            { key: 'weekly', label: language === 'fr' ? 'Hebdomadaire' : 'Weekly', icon: Target },
            { key: 'special', label: language === 'fr' ? 'Spécial' : 'Special', icon: Star }
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? 'default' : 'ghost'}
              className={`flex-1 transition-all duration-300 ${
                activeTab === tab.key 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-white/60'
              }`}
              onClick={() => setActiveTab(tab.key as any)}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Challenges List */}
        <div className="space-y-4">
          {currentChallenges.map((challenge) => (
            <Card 
              key={challenge.id}
              className={`transition-all duration-300 hover:shadow-lg hover:scale-102 cursor-pointer border-0 bg-white/90 backdrop-blur-sm ${
                challenge.completed ? 'ring-2 ring-green-200' : ''
              }`}
              onClick={() => handleChallengeClick(challenge)}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  {/* Challenge Icon */}
                  <div className={`w-14 h-14 bg-gradient-to-r ${challenge.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <challenge.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Challenge Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{challenge.title}</h3>
                      {challenge.completed && (
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          <Trophy className="w-3 h-3 mr-1" />
                          {language === 'fr' ? 'Terminé' : 'Complete'}
                        </Badge>
                      )}
                      {challenge.timeLeft && (
                        <Badge variant="outline" className="border-orange-300 text-orange-700">
                          <Clock className="w-3 h-3 mr-1" />
                          {challenge.timeLeft}
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-3">{challenge.description}</p>
                    
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">
                          {language === 'fr' ? 'Progression' : 'Progress'}
                        </span>
                        <span className="font-medium text-gray-700">
                          {challenge.progress}/{challenge.target}
                        </span>
                      </div>
                      
                      <Progress 
                        value={(challenge.progress / challenge.target) * 100} 
                        className="h-3"
                      />
                      
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="border-purple-300 text-purple-700">
                          <Star className="w-3 h-3 mr-1" />
                          {challenge.reward}
                        </Badge>
                        
                        {!challenge.completed && (
                          <Button
                            size="sm"
                            className={`bg-gradient-to-r ${challenge.color} hover:opacity-90 text-white shadow-md`}
                          >
                            {language === 'fr' ? 'Commencer' : 'Start'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Leaderboard Preview */}
        <Card className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Trophy className="w-5 h-5 text-purple-500" />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {language === 'fr' ? 'Classement des Défis' : 'Challenge Leaderboard'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Marie Ngo', challenges: 45, xp: 2340 },
                { name: 'Paul Tchienko', challenges: 38, xp: 1980 },
                { name: 'Sarah Kom', challenges: 35, xp: 1820 }
              ].map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="font-medium text-gray-800">{user.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-purple-600">{user.challenges} défis</p>
                    <p className="text-xs text-gray-500">{user.xp} XP</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              onClick={() => navigate('/leaderboard')}
            >
              {language === 'fr' ? 'Voir le Classement Complet' : 'View Full Leaderboard'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChallengeHub;
