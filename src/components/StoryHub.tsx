
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, BookOpen, Clock, Users } from 'lucide-react';

const StoryHub = () => {
  const navigate = useNavigate();
  const [selectedStory, setSelectedStory] = useState<number | null>(null);

  const stories = [
    {
      id: 1,
      title: 'La Tortue et l\'Éléphant',
      language: 'Ewondo',
      duration: '8 min',
      difficulty: 'Débutant',
      description: 'Un conte traditionnel sur la sagesse et la patience',
      cultural_note: 'Ce conte enseigne l\'importance de la persévérance dans la culture ewondo',
      thumbnail: '🐢',
      audio_available: true
    },
    {
      id: 2,
      title: 'Le Roi des Pygmées',
      language: 'Baka',
      duration: '12 min',
      difficulty: 'Intermédiaire',
      description: 'L\'histoire du petit roi sage de la forêt',
      cultural_note: 'Légende qui explique l\'harmonie entre les Baka et la nature',
      thumbnail: '👑',
      audio_available: true
    },
    {
      id: 3,
      title: 'La Danseuse du Mandara',
      language: 'Fulfuldé',
      duration: '15 min',
      difficulty: 'Avancé',
      description: 'Romance épique dans les montagnes du Nord',
      cultural_note: 'Histoire qui célèbre les traditions peules du Cameroun',
      thumbnail: '💃',
      audio_available: false
    }
  ];

  const StoryModal = ({ story }: { story: any }) => (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50">
      <div className="bg-white rounded-t-3xl w-full max-h-[80vh] animate-slide-up">
        <div className="p-6">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
          
          <div className="flex items-start space-x-4 mb-6">
            <div className="text-6xl">{story.thumbnail}</div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{story.title}</h2>
              <div className="flex items-center space-x-3 mb-3">
                <Badge variant="secondary">{story.language}</Badge>
                <Badge variant="outline">{story.difficulty}</Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{story.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>2.3k vues</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-4">{story.description}</p>
          
          <div className="bg-orange-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-orange-800 mb-2">Note culturelle</h3>
            <p className="text-orange-700 text-sm">{story.cultural_note}</p>
          </div>

          <div className="flex space-x-3">
            <Button 
              className="flex-1 bg-lingua-gradient text-white"
              disabled={!story.audio_available}
            >
              <Play className="w-4 h-4 mr-2" />
              {story.audio_available ? 'Écouter' : 'Audio bientôt'}
            </Button>
            <Button variant="outline" className="flex-1">
              <BookOpen className="w-4 h-4 mr-2" />
              Lire
            </Button>
          </div>

          <Button
            variant="ghost"
            onClick={() => setSelectedStory(null)}
            className="w-full mt-4"
          >
            Fermer
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-cultura-gradient text-white p-6 rounded-b-3xl">
        <div className="flex items-center space-x-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/20 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Histoires & Culture</h1>
        </div>
        <p className="opacity-90">Découvrez les contes traditionnels du Cameroun</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Featured Story */}
        <Card className="animate-bounce-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">⭐</span>
              <span>Histoire du jour</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{stories[0].thumbnail}</div>
              <div className="flex-1">
                <h3 className="font-semibold">{stories[0].title}</h3>
                <p className="text-sm text-gray-600">{stories[0].description}</p>
                <Badge variant="secondary" className="mt-2">{stories[0].language}</Badge>
              </div>
            </div>
            <Button 
              className="w-full mt-4 bg-green-500 hover:bg-green-600"
              onClick={() => setSelectedStory(stories[0].id)}
            >
              Découvrir
            </Button>
          </CardContent>
        </Card>

        {/* Stories List */}
        <div>
          <h2 className="text-xl font-bold mb-4">Toutes les histoires</h2>
          <div className="space-y-4">
            {stories.map((story, index) => (
              <Card 
                key={story.id} 
                className="cursor-pointer hover:shadow-md transition-all animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedStory(story.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{story.thumbnail}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{story.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{story.description}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">{story.language}</Badge>
                        <Badge variant="outline" className="text-xs">{story.difficulty}</Badge>
                        <span className="text-xs text-gray-500 flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{story.duration}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Language Categories */}
        <div>
          <h2 className="text-xl font-bold mb-4">Par langue</h2>
          <div className="grid grid-cols-2 gap-4">
            {['Ewondo', 'Duala', 'Bamiléké', 'Fulfuldé'].map((language) => (
              <Card key={language} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold">{language}</h3>
                  <p className="text-sm text-gray-600">
                    {Math.floor(Math.random() * 10) + 3} histoires
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Story Modal */}
      {selectedStory && (
        <StoryModal story={stories.find(s => s.id === selectedStory)} />
      )}
    </div>
  );
};

export default StoryHub;
