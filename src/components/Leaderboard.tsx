
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Medal, Award, Star, Crown } from 'lucide-react';

const Leaderboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');

  const leaderboardData = {
    weekly: [
      { id: 1, name: 'Marie Ngo', xp: 2450, streak: 12, avatar: 'MN', country: '🇨🇲' },
      { id: 2, name: 'Paul Tchienko', xp: 2180, streak: 8, avatar: 'PT', country: '🇨🇲' },
      { id: 3, name: 'Sarah Kom', xp: 1950, streak: 15, avatar: 'SK', country: '🇨🇲' },
      { id: 4, name: 'Jean Mbarga', xp: 1820, streak: 6, avatar: 'JM', country: '🇨🇲' },
      { id: 5, name: 'Claire Fouda', xp: 1650, streak: 9, avatar: 'CF', country: '🇨🇲' },
    ],
    monthly: [
      { id: 1, name: 'Sarah Kom', xp: 8950, streak: 25, avatar: 'SK', country: '🇨🇲' },
      { id: 2, name: 'Marie Ngo', xp: 8450, streak: 22, avatar: 'MN', country: '🇨🇲' },
      { id: 3, name: 'Paul Tchienko', xp: 7180, streak: 18, avatar: 'PT', country: '🇨🇲' },
    ],
    allTime: [
      { id: 1, name: 'Marie Ngo', xp: 24500, streak: 45, avatar: 'MN', country: '🇨🇲' },
      { id: 2, name: 'Sarah Kom', xp: 21950, streak: 38, avatar: 'SK', country: '🇨🇲' },
      { id: 3, name: 'Paul Tchienko', xp: 19180, streak: 32, avatar: 'PT', country: '🇨🇲' },
    ]
  };

  const currentUser = { id: 999, name: 'Vous', xp: 150, streak: 5, rank: 24 };

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold">{position}</span>;
    }
  };

  const getRankBadge = (position: number) => {
    if (position === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    if (position === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500';
    if (position === 3) return 'bg-gradient-to-r from-amber-400 to-amber-600';
    return 'bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-b-3xl">
        <div className="flex items-center space-x-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/20 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Classement</h1>
        </div>
        <p className="opacity-90">Compétitionnez avec la communauté Lingua</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Tabs */}
        <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
          {[
            { key: 'weekly', label: 'Semaine' },
            { key: 'monthly', label: 'Mois' },
            { key: 'allTime', label: 'Tout temps' }
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 ${
                activeTab === tab.key 
                  ? 'bg-purple-500 text-white' 
                  : 'text-gray-600'
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Your Position */}
        <Card className="animate-bounce-in">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  {currentUser.rank}
                </div>
                <div>
                  <p className="font-semibold">Votre position</p>
                  <p className="text-sm text-gray-600">{currentUser.xp} XP</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                Série de {currentUser.streak}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Top 3 Podium */}
        <div className="flex justify-center items-end space-x-4 mb-6">
          {leaderboardData[activeTab].slice(0, 3).map((user, index) => {
            const positions = [1, 0, 2]; // Center first, left second, right third
            const actualPosition = positions[index];
            const heights = ['h-20', 'h-24', 'h-16'];
            
            return (
              <div key={user.id} className="text-center">
                <Avatar className="mx-auto mb-2">
                  <AvatarFallback className="bg-orange-200 text-orange-800">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
                <p className="text-xs font-medium mb-1">{user.name.split(' ')[0]}</p>
                <div className={`${getRankBadge(actualPosition + 1)} ${heights[actualPosition]} w-16 rounded-t-lg flex flex-col justify-end items-center text-white p-2`}>
                  {getRankIcon(actualPosition + 1)}
                  <p className="text-xs font-bold">{user.xp}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full Leaderboard */}
        <div className="space-y-2">
          {leaderboardData[activeTab].map((user, index) => (
            <Card 
              key={user.id} 
              className={`animate-slide-up ${index < 3 ? 'border-orange-200' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    {getRankIcon(index + 1)}
                    <Avatar>
                      <AvatarFallback className="bg-orange-200 text-orange-800">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold">{user.name}</p>
                      <span>{user.country}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>{user.xp} XP</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Trophy className="w-3 h-3" />
                        <span>{user.streak} jours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Weekly Challenge */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span>Défi de la semaine</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-3">
              Apprenez 50 nouveaux mots dans n'importe quelle langue
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Progression: 12/50</span>
              <Badge variant="secondary">100 XP</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
