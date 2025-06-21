
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Volume2, Settings, Key } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ttsService } from '@/services/textToSpeechService';
import { toast } from "@/hooks/use-toast";

const TTSSettings = () => {
  const { language } = useLanguage();
  const [apiKey, setApiKey] = useState(localStorage.getItem('elevenlabs_api_key') || '');
  const [isTestingVoice, setIsTestingVoice] = useState(false);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: language === 'fr' ? 'Erreur' : 'Error',
        description: language === 'fr' ? 'Veuillez entrer une clé API valide' : 'Please enter a valid API key',
        variant: "destructive"
      });
      return;
    }

    ttsService.setApiKey(apiKey.trim());
    toast({
      title: language === 'fr' ? 'Succès' : 'Success',
      description: language === 'fr' ? 'Clé API sauvegardée avec succès' : 'API key saved successfully'
    });
  };

  const handleTestVoice = async () => {
    if (!ttsService.hasApiKey()) {
      toast({
        title: language === 'fr' ? 'Clé API requise' : 'API Key Required',
        description: language === 'fr' ? 'Veuillez d\'abord sauvegarder votre clé API' : 'Please save your API key first',
        variant: "destructive"
      });
      return;
    }

    setIsTestingVoice(true);
    try {
      const testText = language === 'fr' ? 'Bonjour, ceci est un test de la synthèse vocale' : 'Hello, this is a text-to-speech test';
      await ttsService.speak(testText);
      toast({
        title: language === 'fr' ? 'Test réussi' : 'Test Successful',
        description: language === 'fr' ? 'La synthèse vocale fonctionne correctement' : 'Text-to-speech is working correctly'
      });
    } catch (error) {
      console.error('TTS test failed:', error);
    } finally {
      setIsTestingVoice(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Volume2 className="w-5 h-5 text-blue-500" />
          <span>{language === 'fr' ? 'Paramètres Vocaux' : 'Voice Settings'}</span>
          {ttsService.hasApiKey() && (
            <Badge className="bg-green-100 text-green-700">
              {language === 'fr' ? 'Configuré' : 'Configured'}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="apiKey" className="flex items-center space-x-2">
            <Key className="w-4 h-4" />
            <span>{language === 'fr' ? 'Clé API ElevenLabs' : 'ElevenLabs API Key'}</span>
          </Label>
          <Input
            id="apiKey"
            type="password"
            placeholder={language === 'fr' ? 'Entrez votre clé API...' : 'Enter your API key...'}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="font-mono"
          />
          <p className="text-sm text-gray-500">
            {language === 'fr' 
              ? 'Obtenez votre clé API gratuite sur elevenlabs.io'
              : 'Get your free API key from elevenlabs.io'
            }
          </p>
        </div>

        <div className="flex space-x-2">
          <Button onClick={handleSaveApiKey} className="flex-1">
            <Settings className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Sauvegarder' : 'Save'}
          </Button>
          <Button 
            onClick={handleTestVoice} 
            variant="outline" 
            disabled={isTestingVoice || !ttsService.hasApiKey()}
            className="flex-1"
          >
            <Volume2 className="w-4 h-4 mr-2" />
            {isTestingVoice 
              ? (language === 'fr' ? 'Test...' : 'Testing...') 
              : (language === 'fr' ? 'Tester' : 'Test Voice')
            }
          </Button>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">
            {language === 'fr' ? 'Comment obtenir votre clé API :' : 'How to get your API key:'}
          </h4>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>{language === 'fr' ? 'Visitez elevenlabs.io et créez un compte' : 'Visit elevenlabs.io and create an account'}</li>
            <li>{language === 'fr' ? 'Allez dans Profile & API Keys' : 'Go to Profile & API Keys'}</li>
            <li>{language === 'fr' ? 'Copiez votre clé API par défaut' : 'Copy your default API key'}</li>
            <li>{language === 'fr' ? 'Collez-la ci-dessus et sauvegardez' : 'Paste it above and save'}</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default TTSSettings;
