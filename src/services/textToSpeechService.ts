
import { toast } from "@/hooks/use-toast";

export interface TTSConfig {
  apiKey?: string;
  voiceId?: string;
  model?: string;
}

class TextToSpeechService {
  private apiKey: string | null = null;
  private voiceId: string = '9BWtsMINqrJLrRacOk9x'; // Aria voice
  private model: string = 'eleven_turbo_v2_5';
  private baseUrl: string = 'https://api.elevenlabs.io/v1';

  constructor() {
    // Check for API key in localStorage
    this.apiKey = localStorage.getItem('elevenlabs_api_key');
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    localStorage.setItem('elevenlabs_api_key', apiKey);
  }

  async speak(text: string, options?: { voiceId?: string; model?: string }) {
    if (!this.apiKey) {
      toast({
        title: "API Key Required",
        description: "Please set your ElevenLabs API key in settings to use text-to-speech.",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch(`${this.baseUrl}/text-to-speech/${options?.voiceId || this.voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey
        },
        body: JSON.stringify({
          text,
          model_id: options?.model || this.model,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        })
      });

      if (!response.ok) {
        throw new Error(`TTS API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      return new Promise<void>((resolve, reject) => {
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          resolve();
        };
        audio.onerror = () => {
          URL.revokeObjectURL(audioUrl);
          reject(new Error('Audio playback failed'));
        };
        audio.play().catch(reject);
      });
    } catch (error) {
      console.error('TTS Error:', error);
      toast({
        title: "Speech Error",
        description: "Failed to generate speech. Please check your API key and try again.",
        variant: "destructive"
      });
    }
  }

  hasApiKey(): boolean {
    return !!this.apiKey;
  }
}

export const ttsService = new TextToSpeechService();
