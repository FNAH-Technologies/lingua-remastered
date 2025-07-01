
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Volume2, Music, Mic, Play, Pause } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { audioService, AudioContent, MusicContent } from '@/services/audioService';

const EnhancedAudioWidget = () => {
  const { language } = useLanguage();
  const [audioContent, setAudioContent] = useState<AudioContent[]>([]);
  const [musicContent, setMusicContent] = useState<MusicContent[]>([]);
  const [activeTab, setActiveTab] = useState<'pronunciation' | 'music'>('pronunciation');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentItem, setCurrentItem] = useState<AudioContent | MusicContent | null>(null);

  useEffect(() => {
    setAudioContent(audioService.getAudioContent('pronunciation'));
    setMusicContent(audioService.getMusicContent());
  }, []);

  const handlePlay = async (item: AudioContent | MusicContent) => {
    try {
      setIsPlaying(true);
      setCurrentItem(item);
      
      if ('type' in item) {
        // AudioContent
        await audioService.playAudio(item.id);
      } else {
        // MusicContent
        await audioService.playMusic(item.id);
      }
      
      setIsPlaying(false);
      setCurrentItem(null);
    } catch (error) {
      console.error('Playback failed:', error);
      setIsPlaying(false);
      setCurrentItem(null);
    }
  };

  const handleStop = () => {
    audioService.stopAudio();
    setIsPlaying(false);
    setCurrentItem(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-orange-100 text-orange-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-green-50 to-teal-100 border-green-200 shadow-ios-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
            <Volume2 className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-green-800">
              {language === 'fr' ? 'Audio Culturel' : 'Cultural Audio'}
            </h3>
            <p className="text-sm text-green-600">
              {language === 'fr' ? 'Sons et musique authentiques' : 'Authentic sounds & music'}
            </p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Tab Navigation */}
        <div className="flex space-x-2 bg-white/70 p-1 rounded-xl">
          <Button
            variant={activeTab === 'pronunciation' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('pronunciation')}
            className="flex-1"
          >
            <Mic className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Prononciation' : 'Pronunciation'}
          </Button>
          <Button
            variant={activeTab === 'music' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('music')}
            className="flex-1"
          >
            <Music className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Musique' : 'Music'}
          </Button>
        </div>

        {/* Pronunciation Tab */}
        {activeTab === 'pronunciation' && (
          <div className="space-y-3">
            {audioContent.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <Mic className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm">
                  {language === 'fr' 
                    ? 'Aucun contenu audio disponible'
                    : 'No audio content available'
                  }
                </p>
              </div>
            ) : (
              audioContent.map((audio) => (
                <div key={audio.id} className="bg-white/70 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 mb-1">
                        {audio.text}
                      </h4>
                      <p className="text-green-700 font-medium mb-2">
                        {audio.textEwondo}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge className={`text-xs ${getDifficultyColor(audio.difficulty)}`}>
                          {audio.difficulty}
                        </Badge>
                        <span className="text-xs text-gray-600">
                          {audio.speakerName} • {audio.region}
                        </span>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => 
                        currentItem?.id === audio.id && isPlaying 
                          ? handleStop() 
                          : handlePlay(audio)
                      }
                      disabled={isPlaying && currentItem?.id !== audio.id}
                      className="ml-3"
                    >
                      {currentItem?.id === audio.id && isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  
                  <div className="bg-blue-50 p-2 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-800">
                      {audio.culturalContext}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Music Tab */}
        {activeTab === 'music' && (
          <div className="space-y-3">
            {musicContent.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <Music className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm">
                  {language === 'fr' 
                    ? 'Aucune musique disponible'
                    : 'No music available'
                  }
                </p>
              </div>
            ) : (
              musicContent.map((music) => (
                <div key={music.id} className="bg-white/70 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 mb-1">
                        {music.title}
                      </h4>
                      <p className="text-green-700 font-medium mb-2">
                        {music.titleEwondo}
                      </p>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {music.genre}
                        </Badge>
                        <span className="text-xs text-gray-600">
                          {music.instruments.join(', ')}
                        </span>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => 
                        currentItem?.id === music.id && isPlaying 
                          ? handleStop() 
                          : handlePlay(music)
                      }
                      disabled={isPlaying && currentItem?.id !== music.id}
                      className="ml-3"
                    >
                      {currentItem?.id === music.id && isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  
                  <div className="bg-amber-50 p-2 rounded-lg border border-amber-200">
                    <p className="text-xs text-amber-800">
                      <strong>{language === 'fr' ? 'Signification:' : 'Significance:'}</strong> {music.culturalSignificance}
                    </p>
                  </div>
                  
                  {music.lyrics && (
                    <div className="mt-2 bg-purple-50 p-2 rounded-lg border border-purple-200">
                      <p className="text-xs text-purple-800">
                        <strong>{language === 'fr' ? 'Paroles:' : 'Lyrics:'}</strong> {music.lyrics}
                      </p>
                      {music.lyricsEwondo && (
                        <p className="text-xs text-purple-700 mt-1">
                          <strong>Ewondo:</strong> {music.lyricsEwondo}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedAudioWidget;
