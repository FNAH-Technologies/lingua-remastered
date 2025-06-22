
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Common
    'common.continue': 'Continuer',
    'common.back': 'Retour',
    'common.next': 'Suivant',
    'common.start': 'Commencer',
    'common.save': 'Sauvegarder',
    'common.cancel': 'Annuler',
    'common.logout': 'Se déconnecter',
    'common.settings': 'Paramètres',
    'common.profile': 'Profil',
    'common.leaderboard': 'Classement',
    'common.stories': 'Histoires',
    'common.challenges': 'Défis',
    'common.lessons': 'Leçons',
    'common.minutes': 'minutes',
    'common.day': 'jour',
    
    // Onboarding - Updated for ethnic languages
    'onboarding.welcome.title': 'Bienvenue dans Lingua',
    'onboarding.welcome.subtitle': 'Découvrez les langues du Cameroun',
    'onboarding.welcome.description': 'Apprenez les langues ethniques camerounaises (Ewondo, Duala, Bamiléké, etc.) à travers des histoires et des leçons interactives.',
    'onboarding.language.title': 'Choisissez votre langue à apprendre',
    'onboarding.language.subtitle': 'Quelle langue ethnique camerounaise souhaitez-vous apprendre?',
    'onboarding.language.description': 'Sélectionnez parmi les langues ethniques: Ewondo, Duala, Bamiléké, Fulfulde, etc.',
    'onboarding.language.placeholder': 'Sélectionnez une langue ethnique',
    'onboarding.goal.title': 'Définissez votre objectif',
    'onboarding.goal.subtitle': 'Combien de minutes par jour?',
    'onboarding.goal.description': 'Choisissez un objectif d\'apprentissage quotidien réaliste.',
    
    // Settings
    'settings.title': 'Paramètres',
    'settings.subtitle': 'Personnalisez votre expérience Lingua',
    'settings.notifications': 'Notifications',
    'settings.notifications.general': 'Notifications générales',
    'settings.notifications.general.desc': 'Recevoir les notifications de l\'app',
    'settings.notifications.lessons': 'Rappels de leçons',
    'settings.notifications.lessons.desc': 'Rappel quotidien d\'apprentissage',
    'settings.notifications.streak': 'Alertes de série',
    'settings.notifications.streak.desc': 'Alerte avant de perdre votre série',
    'settings.audio': 'Audio',
    'settings.audio.effects': 'Effets sonores',
    'settings.audio.effects.desc': 'Sons d\'interface et de réussite',
    'settings.audio.volume': 'Volume',
    'settings.learning': 'Apprentissage',
    'settings.learning.goal': 'Objectif quotidien',
    'settings.language': 'Langue',
    'settings.language.interface': 'Langue de l\'interface',
    'settings.language.interface.desc': 'Langue de navigation de l\'app (Français/Anglais)',
    'settings.account': 'Compte',
    'settings.account.password': 'Changer le mot de passe',
    'settings.account.privacy': 'Confidentialité et données',
    'settings.save': 'Sauvegarder les paramètres',
    'settings.saved': 'Paramètres sauvegardés',
    'settings.saved.desc': 'Vos préférences ont été mises à jour',
    'settings.logout.success': 'Déconnecté',
    'settings.logout.desc': 'À bientôt!',
    
    // Dashboard - Updated for ethnic languages
    'dashboard.welcome': 'Bonjour',
    'dashboard.continue': 'Continuer l\'apprentissage',
    'dashboard.streak': 'Série de',
    'dashboard.days': 'jours',
    'dashboard.xp': 'XP aujourd\'hui',
    'dashboard.quick.title': 'Accès rapide',
    'dashboard.lessons': 'Leçons',
    'dashboard.challenges': 'Défis',
    'dashboard.stories': 'Histoires',
    'dashboard.leaderboard': 'Classement',
    'dashboard.learning.title': 'Apprentissage des langues ethniques',
    'dashboard.progress.map': 'Carte de Progression Ewondo',
    'dashboard.detailed.lessons': 'Leçons Détaillées Ewondo'
  },
  en: {
    // Common
    'common.continue': 'Continue',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.start': 'Start',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.logout': 'Logout',
    'common.settings': 'Settings',
    'common.profile': 'Profile',
    'common.leaderboard': 'Leaderboard',
    'common.stories': 'Stories',
    'common.challenges': 'Challenges',
    'common.lessons': 'Lessons',
    'common.minutes': 'minutes',
    'common.day': 'day',
    
    // Onboarding - Updated for ethnic languages
    'onboarding.welcome.title': 'Welcome to Lingua',
    'onboarding.welcome.subtitle': 'Discover Cameroon\'s Ethnic Languages',
    'onboarding.welcome.description': 'Learn Cameroonian ethnic languages (Ewondo, Duala, Bamileke, etc.) through stories and interactive lessons.',
    'onboarding.language.title': 'Choose Your Learning Language',
    'onboarding.language.subtitle': 'Which Cameroonian ethnic language would you like to learn?',
    'onboarding.language.description': 'Select from ethnic languages: Ewondo, Duala, Bamileke, Fulfulde, etc.',
    'onboarding.language.placeholder': 'Select an ethnic language',
    'onboarding.goal.title': 'Set Your Goal',
    'onboarding.goal.subtitle': 'How many minutes per day?',
    'onboarding.goal.description': 'Choose a realistic daily learning goal.',
    
    // Settings
    'settings.title': 'Settings',
    'settings.subtitle': 'Customize your Lingua experience',
    'settings.notifications': 'Notifications',
    'settings.notifications.general': 'General notifications',
    'settings.notifications.general.desc': 'Receive app notifications',
    'settings.notifications.lessons': 'Lesson reminders',
    'settings.notifications.lessons.desc': 'Daily learning reminder',
    'settings.notifications.streak': 'Streak alerts',
    'settings.notifications.streak.desc': 'Alert before losing your streak',
    'settings.audio': 'Audio',
    'settings.audio.effects': 'Sound effects',
    'settings.audio.effects.desc': 'Interface and success sounds',
    'settings.audio.volume': 'Volume',
    'settings.learning': 'Learning',
    'settings.learning.goal': 'Daily goal',
    'settings.language': 'Language',
    'settings.language.interface': 'Interface language',
    'settings.language.interface.desc': 'App navigation language (French/English)',
    'settings.account': 'Account',
    'settings.account.password': 'Change password',
    'settings.account.privacy': 'Privacy and data',
    'settings.save': 'Save settings',
    'settings.saved': 'Settings saved',
    'settings.saved.desc': 'Your preferences have been updated',
    'settings.logout.success': 'Logged out',
    'settings.logout.desc': 'See you soon!',
    
    // Dashboard - Updated for ethnic languages
    'dashboard.welcome': 'Hello',
    'dashboard.continue': 'Continue learning',
    'dashboard.streak': 'Streak of',
    'dashboard.days': 'days',
    'dashboard.xp': 'XP today',
    'dashboard.quick.title': 'Quick access',
    'dashboard.lessons': 'Lessons',
    'dashboard.challenges': 'Challenges',
    'dashboard.stories': 'Stories',
    'dashboard.leaderboard': 'Leaderboard',
    'dashboard.learning.title': 'Ethnic Language Learning',
    'dashboard.progress.map': 'Ewondo Progress Map',
    'dashboard.detailed.lessons': 'Detailed Ewondo Lessons'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('lingua_interface_language') as Language;
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    console.log('Setting interface language to:', lang);
    setLanguage(lang);
    localStorage.setItem('lingua_interface_language', lang);
  };

  const t = (key: string): string => {
    const translation = translations[language][key as keyof typeof translations[typeof language]];
    return translation || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
