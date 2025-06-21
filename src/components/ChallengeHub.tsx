import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Target, Trophy, Flame, Clock, Star, Users, Zap, Award, Calendar, Crown, Medal } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from './Header';

const ChallengeHub = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'special' | 'multiplayer'>('daily');

  const participants = [
    { id: 1, name: 'Marie Ngo', level: 15, xp: 2340, avatar: 'MN', rank: 1, badges: ['🏆', '🔥'], streak: 12 },
    { id: 2, name: 'Paul Tchienko', level: 12, xp: 1980, avatar: 'PT', rank: 2, badges: ['⭐', '🎯'], streak: 8 },
    { id: 3, name: 'Sarah Kom', level: 11, xp: 1820, avatar: 'SK', rank: 3, badges: ['💎'], streak: 5 },
    { id: 4, name: 'Jean Mbarga', level: 10, xp: 1650, avatar: 'JM', rank: 4, badges: ['🎪'], streak: 3 },
    { id: 5, name: 'Fatima Bello', level: 9, xp: 1420, avatar: 'FB', rank: 5, badges: ['🌟'], streak: 7 },
    { id: 6, name: 'You', level: 8, xp: 1340, avatar: 'YO', rank: 6, badges: ['🚀'], streak: 4, isCurrentUser: true }
  ];

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
    ],
    multiplayer: [
      {
        id: 7,
        title: language === 'fr' ? 'Défi Communautaire' : 'Community Challenge',
        description: language === 'fr' ? 'Battez 5 joueurs dans des duels de vocabulaire' : 'Beat 5 players in vocabulary duels',
        progress: 2,
        target: 5,
        reward: '200 XP + Badge',
        icon: Users,
        color: 'from-purple-400 to-indigo-500',
        completed: false,
        participants: 156,
        activeNow: 23
      },
      {
        id: 8,
        title: language === 'fr' ? 'Course aux Points' : 'Points Race',
        description: language === 'fr' ? 'Soyez dans le top 10 cette semaine' : 'Be in top 10 this week',
        progress: 6,
        target: 10,
        reward: '300 XP',
        icon: Trophy,
        color: 'from-yellow-400 to-orange-500',
        completed: false,
        participants: 89,
        activeNow: 12
      }
    ]
  };

  const currentChallenges = challenges[activeTab];

  const handleChallengeClick = (challenge: any) => {
    if (!challenge.completed) {
      console.log('Starting challenge:', challenge.id);
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

        {/* Enhanced Challenge Categories with Multiplayer */}
        <div className="flex p-1 bg-white/80 backdrop-blur-sm rounded-xl mb-6 shadow-sm overflow-x-auto">
          {[
            { key: 'daily', label: language === 'fr' ? 'Quotidien' : 'Daily', icon: Calendar },
            { key: 'weekly', label: language === 'fr' ? 'Hebdo' : 'Weekly', icon: Target },
            { key: 'special', label: language === 'fr' ? 'Spécial' : 'Special', icon: Star },
            { key: 'multiplayer', label: language === 'fr' ? 'Multijoueur' : 'Multiplayer', icon: Users }
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? 'default' : 'ghost'}
              className={`flex-1 min-w-fit transition-all duration-300 ${
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

        {/* Challenges List with enhanced multiplayer info */}
        <div className="space-y-4">
          {currentChallenges?.map((challenge: any) => (
            <Card 
              key={challenge.id}
              className={`transition-all duration-300 hover:shadow-lg hover:scale-102 cursor-pointer border-0 bg-white/90 backdrop-blur-sm ${
                challenge.completed ? 'ring-2 ring-green-200' : ''
              }`}
              onClick={() => handleChallengeClick(challenge)}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-14 h-14 bg-gradient-to-r ${challenge.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <challenge.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{challenge.title}</h3>
                      <div className="flex items-center space-x-2">
                        {challenge.participants && (
                          <Badge variant="outline" className="border-blue-300 text-blue-700">
                            <Users className="w-3 h-3 mr-1" />
                            {challenge.participants}
                          </Badge>
                        )}
                        {challenge.activeNow && (
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                            {challenge.activeNow}
                          </Badge>
                        )}
                        {challenge.completed && (
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            <Trophy className="w-3 h-3 mr-1" />
                            {language === 'fr' ? 'Terminé' : 'Complete'}
                          </Badge>
                        )}
                      </div>
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

        {/* Live Participant Rankings */}
        <Card className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Crown className="w-5 h-5 text-indigo-500" />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {language === 'fr' ? 'Classement en Direct' : 'Live Rankings'}
              </span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-2"></div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {participants.map((participant, index) => (
                <div 
                  key={participant.id} 
                  className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                    participant.isCurrentUser 
                      ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-300' 
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold relative ${
                      index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 
                      index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' : 
                      index === 2 ? 'bg-gradient-to-r from-amber-600 to-amber-800' : 
                      'bg-gradient-to-r from-indigo-400 to-purple-500'
                    }`}>
                      {index < 3 && <Medal className="w-5 h-5" />}
                      {index >= 3 && participant.rank}
                    </div>
                    
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                        {participant.avatar}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${participant.isCurrentUser ? 'text-blue-800' : 'text-gray-800'}`}>
                          {participant.name}
                        </span>
                        <div className="flex space-x-1">
                          {participant.badges.map((badge, i) => (
                            <span key={i} className="text-sm">{badge}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <span>Level {participant.level}</span>
                        <span className="flex items-center">
                          <Flame className="w-3 h-3 mr-1 text-orange-500" />
                          {participant.streak}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-bold text-indigo-600">{participant.xp} XP</p>
                    <p className="text-xs text-gray-500">#{participant.rank}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
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
