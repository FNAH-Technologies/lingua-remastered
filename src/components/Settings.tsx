
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Bell, Volume2, Globe, Target, Shield, Info, LogOut } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, language, setLanguage } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [settings, setSettings] = useState({
    notifications: true,
    soundEffects: true,
    lessonReminders: true,
    streakReminders: true,
    volume: [80],
    dailyGoal: [15]
  });

  useEffect(() => {
    const userData = localStorage.getItem('lingua_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const savedSettings = localStorage.getItem('lingua_settings');
    if (savedSettings) {
      setSettings({ ...settings, ...JSON.parse(savedSettings) });
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem('lingua_settings', JSON.stringify(settings));
    toast({
      title: t('settings.saved'),
      description: t('settings.saved.desc'),
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('lingua_user');
    localStorage.removeItem('lingua_settings');
    toast({
      title: t('settings.logout.success'),
      description: t('settings.logout.desc'),
    });
    navigate('/');
    window.location.reload();
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
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
          <h1 className="text-2xl font-bold">{t('settings.title')}</h1>
        </div>
        <p className="opacity-90">{t('settings.subtitle')}</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>{t('settings.notifications')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{t('settings.notifications.general')}</p>
                <p className="text-sm text-gray-600">{t('settings.notifications.general.desc')}</p>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => updateSetting('notifications', checked)}
              />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{t('settings.notifications.lessons')}</p>
                <p className="text-sm text-gray-600">{t('settings.notifications.lessons.desc')}</p>
              </div>
              <Switch
                checked={settings.lessonReminders}
                onCheckedChange={(checked) => updateSetting('lessonReminders', checked)}
              />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{t('settings.notifications.streak')}</p>
                <p className="text-sm text-gray-600">{t('settings.notifications.streak.desc')}</p>
              </div>
              <Switch
                checked={settings.streakReminders}
                onCheckedChange={(checked) => updateSetting('streakReminders', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Audio */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5" />
              <span>{t('settings.audio')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{t('settings.audio.effects')}</p>
                <p className="text-sm text-gray-600">{t('settings.audio.effects.desc')}</p>
              </div>
              <Switch
                checked={settings.soundEffects}
                onCheckedChange={(checked) => updateSetting('soundEffects', checked)}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">{t('settings.audio.volume')}</p>
                <span className="text-sm text-gray-600">{settings.volume[0]}%</span>
              </div>
              <Slider
                value={settings.volume}
                onValueChange={(value) => updateSetting('volume', value)}
                max={100}
                min={0}
                step={10}
              />
            </div>
          </CardContent>
        </Card>

        {/* Learning */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>{t('settings.learning')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">{t('settings.learning.goal')}</p>
                <span className="text-sm text-gray-600">{settings.dailyGoal[0]} min</span>
              </div>
              <Slider
                value={settings.dailyGoal}
                onValueChange={(value) => updateSetting('dailyGoal', value)}
                max={60}
                min={5}
                step={5}
              />
            </div>
          </CardContent>
        </Card>

        {/* Language */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>{t('settings.language')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{t('settings.language.interface')}</p>
                <p className="text-sm text-gray-600">{t('settings.language.interface.desc')}</p>
              </div>
              <Select
                value={language}
                onValueChange={(value: 'fr' | 'en') => setLanguage(value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Account */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>{t('settings.account')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Shield className="w-4 h-4 mr-2" />
              {t('settings.account.password')}
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Info className="w-4 h-4 mr-2" />
              {t('settings.account.privacy')}
            </Button>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button onClick={saveSettings} className="w-full bg-lingua-gradient hover:opacity-90 text-white">
            {t('settings.save')}
          </Button>
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>{t('common.logout')}</span>
          </Button>
        </div>

        {/* App Info */}
        <div className="text-center text-sm text-gray-500 pt-4">
          <p>Lingua v1.0.0</p>
          <p>© 2024 FNAK Technologies</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
