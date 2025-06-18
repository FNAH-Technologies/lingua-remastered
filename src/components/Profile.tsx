
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  Trophy, 
  Flame, 
  Volume2, 
  Bell, 
  Globe, 
  Shield, 
  LogOut,
  Settings as SettingsIcon
} from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);

  const user = {
    name: 'Marie Ngo',
    email: 'marie@example.com',
    xp: 2450,
    streak: 12,
    rank: 1,
    joinDate: 'Mars 2024',
    languages: ['Ewondo', 'Duala', 'Bamiléké'],
    achievements: [
      { id: 1, title: 'Premier pas', description: 'Première leçon terminée', icon: '🎯', earned: true },
      { id: 2, title: 'Série de feu', description: '7 jours consécutifs', icon: '🔥', earned: true },
      { id: 3, title: 'Polyglotte', description: '3 langues étudiées', icon: '🌍', earned: true },
      { id: 4, title: 'Maître des mots', description: '100 mots appris', icon: '📚', earned: false },
    ]
  };

  const handleLogout = () => {
    localStorage.removeItem('lingua_user');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white p-6 rounded-b-3xl">
        <div className="flex items-center space-x-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/20 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Profil</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* User Info */}
        <Card className="animate-bounce-in">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-indigo-200 text-indigo-800 text-xl font-bold">
                  MN
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">Membre depuis {user.joinDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <Star className="w-6 h-6 text-orange-500 mx-auto mb-1" />
                <p className="text-lg font-bold">{user.xp}</p>
                <p className="text-xs text-gray-600">XP Total</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <Flame className="w-6 h-6 text-red-500 mx-auto mb-1" />
                <p className="text-lg font-bold">{user.streak}</p>
                <p className="text-xs text-gray-600">Série</p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                <p className="text-lg font-bold">#{user.rank}</p>
                <p className="text-xs text-gray-600">Rang</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Languages */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Langues étudiées</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {user.languages.map((language) => (
                <Badge key={language} variant="secondary" className="bg-indigo-100 text-indigo-700">
                  {language}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5" />
              <span>Récompenses</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {user.achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`p-3 rounded-lg border ${
                    achievement.earned 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="text-2xl mb-1">{achievement.icon}</div>
                  <h3 className="font-semibold text-sm">{achievement.title}</h3>
                  <p className="text-xs text-gray-600">{achievement.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <SettingsIcon className="w-5 h-5" />
              <span>Paramètres</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-sm text-gray-600">Rappels d'apprentissage</p>
                </div>
              </div>
              <Switch 
                checked={notifications} 
                onCheckedChange={setNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Volume2 className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium">Effets sonores</p>
                  <p className="text-sm text-gray-600">Sons de l'interface</p>
                </div>
              </div>
              <Switch 
                checked={soundEffects} 
                onCheckedChange={setSoundEffects}
              />
            </div>

            <div className="pt-4 border-t">
              <Button
                variant="outline"
                className="w-full flex items-center space-x-2 text-gray-700 hover:bg-gray-50"
              >
                <Shield className="w-4 h-4" />
                <span>Confidentialité</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <CardContent className="p-4">
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="w-full flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Se déconnecter</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
