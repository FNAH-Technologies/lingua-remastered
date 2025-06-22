
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { ttsService } from '@/services/textToSpeechService';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from "@/hooks/use-toast";

interface AudioManagerProps {
  text?: string;
  autoPlay?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
  onStart?: () => void;
  onEnd?: () => void;
  disabled?: boolean;
}

const AudioManager = ({
  text,
  autoPlay = false,
  size = 'md',
  variant = 'outline',
  className = '',
  onStart,
  onEnd,
  disabled = false
}: AudioManagerProps) => {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoPlay && text && !disabled) {
      handlePlay();
    }
  }, [autoPlay, text, disabled]);

  const handlePlay = async () => {
    if (!text || disabled || !ttsService.hasApiKey()) {
      if (!ttsService.hasApiKey()) {
        toast({
          title: language === 'fr' ? 'Configuration requise' : 'Setup Required',
          description: language === 'fr' 
            ? 'Configurez votre clé API ElevenLabs dans les paramètres'
            : 'Configure your ElevenLabs API key in settings',
          variant: "destructive"
        });
      }
      return;
    }

    try {
      setIsPlaying(true);
      setHasError(false);
      onStart?.();
      
      await ttsService.speak(text);
      
    } catch (error) {
      console.error('Audio playback error:', error);
      setHasError(true);
      toast({
        title: language === 'fr' ? 'Erreur audio' : 'Audio Error',
        description: language === 'fr' 
          ? 'Impossible de lire l\'audio'
          : 'Failed to play audio',
        variant: "destructive"
      });
    } finally {
      setIsPlaying(false);
      onEnd?.();
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    onEnd?.();
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-8 h-8 p-1';
      case 'lg': return 'w-12 h-12 p-3';
      default: return 'w-10 h-10 p-2';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm': return 'w-3 h-3';
      case 'lg': return 'w-5 h-5';
      default: return 'w-4 h-4';
    }
  };

  if (!text) return null;

  return (
    <Button
      variant={variant}
      onClick={isPlaying ? handleStop : handlePlay}
      disabled={disabled || (!ttsService.hasApiKey() && !hasError)}
      className={`${getSizeClasses()} ${className} ${
        hasError ? 'text-red-500 border-red-200' : ''
      } ${
        isPlaying ? 'bg-blue-50 border-blue-200 text-blue-600' : ''
      } rounded-full transition-all duration-200 hover:scale-105 active:scale-95`}
      title={language === 'fr' ? 
        (isPlaying ? 'Arrêter' : 'Écouter') : 
        (isPlaying ? 'Stop' : 'Listen')
      }
    >
      {hasError ? (
        <VolumeX className={getIconSize()} />
      ) : isPlaying ? (
        <Pause className={getIconSize()} />
      ) : (
        <Volume2 className={getIconSize()} />
      )}
    </Button>
  );
};

export default AudioManager;
