
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Medal, Award, Star, Crown, Flame, Zap } from 'lucide-react';

const EnhancedLeaderboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');

  const leaderboardData = {
    weekly: [
      { id: 1, name: 'Marie Ngo', xp: 2450, streak: 12, avatar: 'MN', country: '🇨🇲', level: 15 },
      { id: 2, name: 'Paul Tchienko', xp: 2180, streak: 8, avatar: 'PT', country: '🇨🇲', level: 13 },
      { id: 3, name: 'Sarah Kom', xp: 1950, streak: 15, avatar: 'SK', country: '🇨🇲', level: 12 },
      { id: 4, name: 'Jean Mbarga', xp: 1820, streak: 6, avatar: 'JM', country: '🇨🇲', level: 11 },
      { id: 5, name: 'Claire Fouda', xp: 1650, streak: 9, avatar: 'CF', country: '🇨🇲', level: 10 },
    ],
    monthly: [
      { id: 1, name: 'Sarah Kom', xp: 8950, streak: 25, avatar: 'SK', country: '🇨🇲', level: 22 },
      { id: 2, name: 'Marie Ngo', xp: 8450, streak: 22, avatar: 'MN', country: '🇨🇲', level: 21 },
      { id: 3, name: 'Paul Tchienko', xp: 7180, streak: 18, avatar: 'PT', country: '🇨🇲', level: 19 },
    ],
    allTime: [
      { id: 1, name: 'Marie Ngo', xp: 24500, streak: 45, avatar: 'MN', country: '🇨🇲', level: 35 },
      { id: 2, name: 'Sarah Kom', xp: 21950, streak: 38, avatar: 'SK', country: '🇨🇲', level: 32 },
      { id: 3, name: 'Paul Tchienko', xp: 19180, streak: 32, avatar: 'PT', country: '🇨🇲', level: 28 },
    ]
  };

  const currentUser = { id: 999, name: 'Vous', xp: 1250, streak: 5, rank: 24, level: 8 };

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-xs font-bold text-gray-600">{position}</span>;
    }
  };

  const getPodiumHeight = (position: number) => {
    switch (position) {
      case 1: return 'h-20';
      case 2: return 'h-16';
      case 3: return 'h-12';
      default: return 'h-8';
    }
  };

  const getPodiumColor = (position: number) => {
    switch (position) {
      case 1: return 'from-yellow-400 to-yellow-600';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-amber-400 to-amber-600';
      default: return 'from-gray-200 to-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6 rounded-b-3xl shadow-xl">
        <div className="flex items-center space-x-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/20 p-2 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <Trophy className="w-7 h-7 text-yellow-300" />
            <h1 className="text-2xl font-bold">Classement</h1>
          </div>
        </div>
        <p className="opacity-90 text-sm">Compétitionnez avec la communauté Lingua</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Enhanced Tabs */}
        <Card className="shadow-sm">
          <div className="flex p-1 bg-gray-50 rounded-lg">
            {[
              { key: 'weekly', label: 'Semaine', icon: Zap },
              { key: 'monthly', label: 'Mois', icon: Star },
              { key: 'allTime', label: 'Tout temps', icon: Trophy }
            ].map((tab) => (
              <Button
                key={tab.key}
                variant={activeTab === tab.key ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 transition-all duration-300 ${
                  activeTab === tab.key 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-white'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>
        </Card>

        {/* Your Position Card */}
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  {currentUser.rank}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Votre position</p>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>{currentUser.xp} XP</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {currentUser.level}
                      </span>
                      <span>Niveau {currentUser.level}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Badge className="bg-orange-500 text-white hover:bg-orange-600">
                <Flame className="w-3 h-3 mr-1" />
                {currentUser.streak}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Podium */}
        <Card className="bg-gradient-to-br from-white to-gray-50 shadow-lg">
          <CardContent className="p-6">
            <div className="flex justify-center items-end space-x-4 mb-6">
              {/* Reorder for podium display: 2nd, 1st, 3rd */}
              {[1, 0, 2].map((index) => {
                const user = leaderboardData[activeTab][index];
                if (!user) return null;
                
                const position = index === 1 ? 1 : index === 0 ? 2 : 3;
                
                return (
                  <div key={user.id} className="text-center group cursor-pointer">
                    <div className="relative mb-3 transition-transform duration-300 group-hover:scale-110">
                      <Avatar className="mx-auto w-12 h-12 border-3 border-white shadow-lg">
                        <AvatarFallback className={`bg-gradient-to-br ${getPodiumColor(position)} text-white font-bold`}>
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-2 -right-2">
                        {getRankIcon(position)}
                      </div>
                    </div>
                    <p className="text-xs font-semibold text-gray-800 mb-1">{user.name.split(' ')[0]}</p>
                    <div className={`bg-gradient-to-br ${getPodiumColor(position)} ${getPodiumHeight(position)} w-16 rounded-t-lg flex flex-col justify-end items-center text-white p-2 mx-auto shadow-md`}>
                      <p className="text-xs font-bold">{user.xp}</p>
                      <p className="text-xs opacity-90">XP</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Leaderboard List */}
        <div className="space-y-3">
          {leaderboardData[activeTab].map((user, index) => (
            <Card 
              key={user.id} 
              className={`transition-all duration-300 hover:shadow-md hover:scale-[1.02] cursor-pointer ${
                index < 3 ? 'border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50' : 'bg-white'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8">
                      {getRankIcon(index + 1)}
                    </div>
                    <div className="relative">
                      <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                        <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-500 text-white font-semibold">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                        {user.level}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <span className="text-lg">{user.country}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span className="font-medium">{user.xp} XP</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Flame className="w-3 h-3 text-orange-500" />
                        <span>{user.streak} jours</span>
                      </div>
                    </div>
                  </div>
                  
                  {index < 3 && (
                    <div className="text-right">
                      <Badge variant="outline" className="border-yellow-400 text-yellow-700">
                        Top 3
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Weekly Challenge */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Trophy className="w-5 h-5 text-purple-500" />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Défi de la semaine
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4 font-medium">
              Apprenez 50 nouveaux mots dans n'importe quelle langue
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Progression</span>
                <span className="font-semibold text-purple-600">12/50 mots</span>
              </div>
              <div className="w-full bg-purple-100 rounded-full h-3">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-700" style={{ width: '24%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <Badge variant="outline" className="border-purple-400 text-purple-700">
                  <Zap className="w-3 h-3 mr-1" />
                  100 XP
                </Badge>
                <span className="text-xs text-gray-500">5 jours restants</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedLeaderboard;
