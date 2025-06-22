
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Star, 
  Flame, 
  Users,
  Target,
  Calendar,
  TrendingUp,
  Award
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from './Header';

interface LeaderboardUser {
  id: string;
  name: string;
  xp: number;
  streak: number;
  level: number;
  lessonsCompleted: number;
  rank: number;
  avatar?: string;
  country?: string;
  weeklyXp?: number;
  monthlyXp?: number;
}

const EnhancedLeaderboard = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('all-time');
  const [users, setUsers] = useState<LeaderboardUser[]>([]);

  // Mock data - in real app this would come from backend
  useEffect(() => {
    const mockUsers: LeaderboardUser[] = [
      {
        id: '1',
        name: 'Marie Ngo',
        xp: 5240,
        streak: 15,
        level: 12,
        lessonsCompleted: 87,
        rank: 1,
        country: 'CM',
        weeklyXp: 890,
        monthlyXp: 2340
      },
      {
        id: '2',
        name: 'Paul Kamdem',
        xp: 4890,
        streak: 22,
        level: 11,
        lessonsCompleted: 76,
        rank: 2,
        country: 'CM',
        weeklyXp: 720,
        monthlyXp: 2120
      },
      {
        id: '3',
        name: 'Grace Mballa',
        xp: 4650,
        streak: 8,
        level: 10,
        lessonsCompleted: 82,
        rank: 3,
        country: 'CM',
        weeklyXp: 680,
        monthlyXp: 1980
      },
      {
        id: '4',
        name: 'Jean Fokou',
        xp: 4320,
        streak: 12,
        level: 10,
        lessonsCompleted: 71,
        rank: 4,
        country: 'CM',
        weeklyXp: 590,
        monthlyXp: 1850
      },
      {
        id: '5',
        name: 'Aminatou Sall',
        xp: 4100,
        streak: 6,
        level: 9,
        lessonsCompleted: 68,
        rank: 5,
        country: 'CM',
        weeklyXp: 520,
        monthlyXp: 1720
      },
      {
        id: '6',
        name: 'Victor Ekwese',
        xp: 3980,
        streak: 18,
        level: 9,
        lessonsCompleted: 65,
        rank: 6,
        country: 'CM',
        weeklyXp: 480,
        monthlyXp: 1650
      },
      {
        id: '7',
        name: 'Linda Awah',
        xp: 3750,
        streak: 4,
        level: 8,
        lessonsCompleted: 61,
        rank: 7,
        country: 'CM',
        weeklyXp: 420,
        monthlyXp: 1520
      },
      {
        id: '8',
        name: 'Ernest Tagne',
        xp: 3520,
        streak: 9,
        level: 8,
        lessonsCompleted: 58,
        rank: 8,
        country: 'CM',
        weeklyXp: 380,
        monthlyXp: 1420
      }
    ];

    setUsers(mockUsers);
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const currentUser = users.find(u => u.id === '1'); // Mock current user

  const tabData = [
    {
      id: 'all-time',
      label: language === 'fr' ? 'Tous Temps' : 'All Time',
      icon: Trophy,
      sortBy: 'xp'
    },
    {
      id: 'weekly',
      label: language === 'fr' ? 'Semaine' : 'Weekly',
      icon: Calendar,
      sortBy: 'weeklyXp'
    },
    {
      id: 'monthly',
      label: language === 'fr' ? 'Mensuel' : 'Monthly',
      icon: TrendingUp,
      sortBy: 'monthlyXp'
    }
  ];

  const getSortedUsers = (sortBy: string) => {
    return [...users].sort((a, b) => {
      const aValue = sortBy === 'weeklyXp' ? (a.weeklyXp || 0) : 
                     sortBy === 'monthlyXp' ? (a.monthlyXp || 0) : a.xp;
      const bValue = sortBy === 'weeklyXp' ? (b.weeklyXp || 0) : 
                     sortBy === 'monthlyXp' ? (b.monthlyXp || 0) : b.xp;
      return bValue - aValue;
    });
  };

  const getDisplayValue = (user: LeaderboardUser, sortBy: string) => {
    switch (sortBy) {
      case 'weeklyXp':
        return `${user.weeklyXp || 0} XP`;
      case 'monthlyXp':
        return `${user.monthlyXp || 0} XP`;
      default:
        return `${user.xp} XP`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Header 
        title={language === 'fr' ? 'Classement' : 'Leaderboard'}
        showBack={true}
      />

      <div className="p-4 max-w-4xl mx-auto space-y-6">
        {/* Current User Stats */}
        {currentUser && (
          <Card className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Crown className="w-8 h-8 text-yellow-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{currentUser.name}</h3>
                    <p className="opacity-90">
                      {language === 'fr' ? 'Votre Position:' : 'Your Rank:'} #{currentUser.rank}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{currentUser.xp} XP</p>
                  <p className="opacity-90">{language === 'fr' ? 'Niveau' : 'Level'} {currentUser.level}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Leaderboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
            {tabData.map((tab) => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id}
                className="flex items-center space-x-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tabData.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="space-y-4">
              {/* Top 3 Podium */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span>{language === 'fr' ? 'Podium' : 'Top 3'}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {getSortedUsers(tab.sortBy).slice(0, 3).map((user, index) => (
                      <div key={user.id} className="text-center">
                        <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${getRankBadgeColor(index + 1)}`}>
                          {getRankIcon(index + 1)}
                        </div>
                        <h4 className="font-semibold text-gray-800 truncate">{user.name}</h4>
                        <p className="text-sm text-gray-600">{getDisplayValue(user, tab.sortBy)}</p>
                        <div className="flex items-center justify-center space-x-2 mt-2">
                          <div className="flex items-center space-x-1">
                            <Flame className="w-3 h-3 text-orange-500" />
                            <span className="text-xs">{user.streak}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-purple-500" />
                            <span className="text-xs">{user.level}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Full Rankings */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-purple-500" />
                    <span>{language === 'fr' ? 'Classement Complet' : 'Full Rankings'}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {getSortedUsers(tab.sortBy).map((user, index) => (
                    <div 
                      key={user.id}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                        user.id === '1' ? 'bg-purple-50 border-2 border-purple-200' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8">
                          {getRankIcon(index + 1)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{user.name}</h4>
                          <div className="flex items-center space-x-3 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Target className="w-3 h-3" />
                              <span>{user.lessonsCompleted} {language === 'fr' ? 'leçons' : 'lessons'}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Flame className="w-3 h-3 text-orange-500" />
                              <span>{user.streak}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-800">{getDisplayValue(user, tab.sortBy)}</p>
                        <Badge variant="outline" className="text-xs">
                          {language === 'fr' ? 'Niveau' : 'Level'} {user.level}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Competition Info */}
        <Card className="bg-gradient-to-r from-orange-100 to-pink-100 border-orange-200 shadow-lg">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {language === 'fr' ? 'Compétition Mensuelle' : 'Monthly Competition'}
            </h3>
            <p className="text-gray-600 mb-4">
              {language === 'fr' 
                ? 'Terminez dans le top 3 pour gagner des badges exclusifs!'
                : 'Finish in the top 3 to win exclusive badges!'
              }
            </p>
            <div className="flex justify-center space-x-4">
              <div className="text-center">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Crown className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs text-gray-600">500 XP</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Medal className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs text-gray-600">300 XP</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs text-gray-600">200 XP</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedLeaderboard;
