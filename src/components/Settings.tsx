import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Volume2, 
  Globe, 
  Shield, 
  Smartphone,
  Download,
  Trash2,
  LogOut,
  User,
  HelpCircle,
  Star,
  Mail
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from './Header';
import TTSSettings from './TTSSettings';

const Settings = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  
  const [settings, setSettings] = useState({
    notifications: true,
    soundEffects: true,
    autoPlay: false,
    offlineMode: true,
    dailyReminders: true,
    weeklyReport: false
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleLanguageChange = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const settingsSections = [
    {
      title: language === 'fr' ? 'Notifications' : 'Notifications',
      icon: Bell,
      items: [
        {
          key: 'notifications',
          label: language === 'fr' ? 'Notifications push' : 'Push notifications',
          description: language === 'fr' ? 'Recevez des rappels et mises à jour' : 'Get reminders and updates',
          value: settings.notifications
        },
        {
          key: 'dailyReminders',
          label: language === 'fr' ? 'Rappels quotidiens' : 'Daily reminders',
          description: language === 'fr' ? 'Rappel pour votre leçon quotidienne' : 'Reminder for your daily lesson',
          value: settings.dailyReminders
        },
        {
          key: 'weeklyReport',
          label: language === 'fr' ? 'Rapport hebdomadaire' : 'Weekly report',
          description: language === 'fr' ? 'Résumé de vos progrès' : 'Summary of your progress',
          value: settings.weeklyReport
        }
      ]
    },
    {
      title: language === 'fr' ? 'Audio & Visuel' : 'Audio & Visual',
      icon: Volume2,
      items: [
        {
          key: 'soundEffects',
          label: language === 'fr' ? 'Effets sonores' : 'Sound effects',
          description: language === 'fr' ? 'Sons pour les interactions' : 'Sounds for interactions',
          value: settings.soundEffects
        },
        {
          key: 'autoPlay',
          label: language === 'fr' ? 'Lecture automatique' : 'Auto-play audio',
          description: language === 'fr' ? 'Jouer automatiquement l\'audio' : 'Automatically play audio',
          value: settings.autoPlay
        }
      ]
    },
    {
      title: language === 'fr' ? 'Données & Stockage' : 'Data & Storage',
      icon: Download,
      items: [
        {
          key: 'offlineMode',
          label: language === 'fr' ? 'Mode hors ligne' : 'Offline mode',
          description: language === 'fr' ? 'Télécharger les leçons' : 'Download lessons for offline use',
          value: settings.offlineMode
        }
      ]
    }
  ];

  const actionItems = [
    {
      label: language === 'fr' ? 'Langue de l\'app' : 'App Language',
      icon: Globe,
      action: handleLanguageChange,
      value: language === 'fr' ? 'Français' : 'English',
      type: 'button'
    },
    {
      label: language === 'fr' ? 'Compte et sécurité' : 'Account & Security',
      icon: Shield,
      action: () => console.log('Account security'),
      type: 'navigation'
    },
    {
      label: language === 'fr' ? 'Profil utilisateur' : 'User Profile',
      icon: User,
      action: () => navigate('/profile'),
      type: 'navigation'
    },
    {
      label: language === 'fr' ? 'Aide et support' : 'Help & Support',
      icon: HelpCircle,
      action: () => console.log('Help'),
      type: 'navigation'
    },
    {
      label: language === 'fr' ? 'Évaluer l\'app' : 'Rate the App',
      icon: Star,
      action: () => console.log('Rate app'),
      type: 'navigation'
    },
    {
      label: language === 'fr' ? 'Contact' : 'Contact Us',
      icon: Mail,
      action: () => console.log('Contact'),
      type: 'navigation'
    }
  ];

  const dangerActions = [
    {
      label: language === 'fr' ? 'Effacer les données' : 'Clear Data',
      icon: Trash2,
      action: () => console.log('Clear data'),
      color: 'text-red-600'
    },
    {
      label: language === 'fr' ? 'Déconnexion' : 'Sign Out',
      icon: LogOut,
      action: () => {
        localStorage.removeItem('lingua_user');
        window.location.reload();
      },
      color: 'text-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header 
        title={language === 'fr' ? 'Paramètres' : 'Settings'}
        showBack={true}
      />

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        {/* Settings Sections */}
        {settingsSections.map((section, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <section.icon className="w-5 h-5 text-purple-500" />
                <span>{section.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {section.items.map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <Switch
                    checked={item.value}
                    onCheckedChange={(checked) => handleSettingChange(item.key, checked)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* Add TTS Settings */}
        <TTSSettings />

        {/* Action Items */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">
              {language === 'fr' ? 'Général' : 'General'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {actionItems.map((item, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                onClick={item.action}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-800">{item.label}</span>
                </div>
                {item.value && (
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    {item.value}
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="space-y-2">
              <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Lingua
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'fr' ? 'Version 1.0.0' : 'Version 1.0.0'}
              </p>
              <p className="text-xs text-gray-500">
                {language === 'fr' 
                  ? 'Apprendre les langues du Cameroun'
                  : 'Learn Cameroonian Languages'
                }
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="bg-red-50 border-red-200 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-red-700">
              {language === 'fr' ? 'Zone dangereuse' : 'Danger Zone'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {dangerActions.map((action, index) => (
              <div 
                key={index}
                className="flex items-center space-x-3 p-3 hover:bg-red-100 rounded-lg cursor-pointer transition-colors"
                onClick={action.action}
              >
                <action.icon className={`w-5 h-5 ${action.color}`} />
                <span className={`font-medium ${action.color}`}>{action.label}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
