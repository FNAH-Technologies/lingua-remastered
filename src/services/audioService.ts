
import { getLanguageData } from './ethnicLanguageData';

export interface AudioContent {
  id: string;
  type: 'pronunciation' | 'story' | 'music' | 'conversation';
  text: string;
  textEwondo: string;
  textNative?: string;
  audioUrl: string;
  speakerName: string;
  region: string;
  culturalContext: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetLanguage?: string;
}

export interface MusicContent {
  id: string;
  title: string;
  titleEwondo: string;
  genre: string;
  instruments: string[];
  audioUrl: string;
  culturalSignificance: string;
  lyrics?: string;
  lyricsEwondo?: string;
}

class AudioService {
  private audioContent: AudioContent[] = [];
  private currentTargetLanguage: string = '';

  constructor() {
    this.initializeDefaultContent();
  }

  setTargetLanguage(language: string) {
    this.currentTargetLanguage = language;
    this.generateLanguageSpecificContent(language);
  }

  private initializeDefaultContent() {
    this.audioContent = [
      {
        id: '1',
        type: 'pronunciation',
        text: 'Good morning, how are you?',
        textEwondo: 'Mbolo, nga nge be?',
        audioUrl: '/audio/pronunciation/morning-greeting.mp3',
        speakerName: 'Mama Akono',
        region: 'Yaoundé',
        culturalContext: 'Traditional morning greeting used among Ewondo people',
        difficulty: 'beginner'
      },
      {
        id: '2',
        type: 'story',
        text: 'The legend of the wise tortoise',
        textEwondo: 'Mvett ve kulu',
        audioUrl: '/audio/stories/wise-tortoise.mp3',
        speakerName: 'Elder Mbarga',
        region: 'Mbalmayo',
        culturalContext: 'Traditional Ewondo folklore teaching wisdom and patience',
        difficulty: 'intermediate'
      },
      {
        id: '3',
        type: 'conversation',
        text: 'Family dinner conversation',
        textEwondo: 'Kalara ndap ya dia',
        audioUrl: '/audio/conversations/family-dinner.mp3',
        speakerName: 'Family Essi',
        region: 'Ebolowa',
        culturalContext: 'Typical family interaction during evening meals',
        difficulty: 'advanced'
      }
    ];
  }

  private generateLanguageSpecificContent(selectedLanguage: string) {
    const languageData = getLanguageData(selectedLanguage);
    if (!languageData) return;

    // Generate language-specific audio content
    this.audioContent = [
      {
        id: '1',
        type: 'pronunciation',
        text: 'Good morning, how are you?',
        textEwondo: 'Mbolo, nga nge be?',
        textNative: `${languageData.greetings.goodMorning.text}, ${languageData.greetings.howAreYou.text}`,
        audioUrl: '/audio/pronunciation/morning-greeting.mp3',
        speakerName: `Elder from ${languageData.culturalContext.region}`,
        region: languageData.culturalContext.region,
        culturalContext: `Traditional morning greeting in ${languageData.language}`,
        difficulty: 'beginner',
        targetLanguage: selectedLanguage
      },
      {
        id: '2',
        type: 'story',
        text: 'Traditional folk tale',
        textEwondo: 'Mvett ve kulu',
        textNative: `Traditional story in ${languageData.language}`,
        audioUrl: '/audio/stories/folk-tale.mp3',
        speakerName: `Storyteller from ${languageData.culturalContext.region}`,
        region: languageData.culturalContext.region,
        culturalContext: `Traditional ${languageData.language} folklore`,
        difficulty: 'intermediate',
        targetLanguage: selectedLanguage
      },
      {
        id: '3',
        type: 'conversation',
        text: 'Family conversation',
        textEwondo: 'Kalara ndap ya dia',
        textNative: `Family dialogue in ${languageData.language}`,
        audioUrl: '/audio/conversations/family.mp3',
        speakerName: `Family from ${languageData.culturalContext.region}`,
        region: languageData.culturalContext.region,
        culturalContext: `Typical family interaction in ${languageData.language}`,
        difficulty: 'advanced',
        targetLanguage: selectedLanguage
      }
    ];
  }

  private musicContent: MusicContent[] = [
    {
      id: '1',
      title: 'Traditional Welcome Song',
      titleEwondo: 'Yop ya Akwaaba',
      genre: 'Traditional',
      instruments: ['balafon', 'drums', 'voices'],
      audioUrl: '/audio/music/welcome-song.mp3',
      culturalSignificance: 'Used to welcome guests in traditional ceremonies',
      lyrics: 'Welcome to our land, welcome to our home',
      lyricsEwondo: 'Akwaaba ne etam bisu, akwaaba ne ndap bisu'
    }
  ];

  private currentlyPlaying: HTMLAudioElement | null = null;

  getAudioContent(type?: AudioContent['type']): AudioContent[] {
    if (type) {
      return this.audioContent.filter(content => content.type === type);
    }
    return this.audioContent;
  }

  getMusicContent(): MusicContent[] {
    return this.musicContent;
  }

  async playAudio(contentId: string): Promise<void> {
    const content = this.audioContent.find(c => c.id === contentId);
    if (!content) return;

    // Stop current audio if playing
    if (this.currentlyPlaying) {
      this.currentlyPlaying.pause();
      this.currentlyPlaying = null;
    }

    try {
      const audio = new Audio(content.audioUrl);
      this.currentlyPlaying = audio;
      
      await new Promise<void>((resolve, reject) => {
        audio.onended = () => {
          this.currentlyPlaying = null;
          resolve();
        };
        audio.onerror = reject;
        audio.play().catch(reject);
      });
    } catch (error) {
      console.error('Audio playback failed:', error);
      // Fallback to TTS if audio file not available
      await this.fallbackToTTS(content.textEwondo);
    }
  }

  async playMusic(musicId: string): Promise<void> {
    const music = this.musicContent.find(m => m.id === musicId);
    if (!music) return;

    if (this.currentlyPlaying) {
      this.currentlyPlaying.pause();
      this.currentlyPlaying = null;
    }

    const audio = new Audio(music.audioUrl);
    this.currentlyPlaying = audio;
    audio.play().catch(console.error);
  }

  stopAudio(): void {
    if (this.currentlyPlaying) {
      this.currentlyPlaying.pause();
      this.currentlyPlaying = null;
    }
  }

  private async fallbackToTTS(text: string): Promise<void> {
    // Fallback to browser TTS if audio files not available
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR'; // Closest to Ewondo
      speechSynthesis.speak(utterance);
    }
  }

  getContentByDifficulty(difficulty: AudioContent['difficulty']): AudioContent[] {
    return this.audioContent.filter(content => content.difficulty === difficulty);
  }

  getContentByRegion(region: string): AudioContent[] {
    return this.audioContent.filter(content => content.region === region);
  }
}

export const audioService = new AudioService();
