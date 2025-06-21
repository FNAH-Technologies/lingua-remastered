import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { BookOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from './Header';
import StoryContent from './StoryContent';

const StoryHub = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [readingTime, setReadingTime] = useState([5]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleLevelChange = (value: string) => {
    setLevelFilter(value);
  };

  const handleReadingTimeChange = (value: number[]) => {
    setReadingTime(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header 
        title={language === 'fr' ? 'Histoires' : 'Stories'}
        showBack={false}
      />

      <div className="p-4 flex flex-col md:flex-row items-center justify-between gap-4 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        {/* Search Bar */}
        <Input
          type="search"
          placeholder={language === 'fr' ? 'Rechercher des histoires...' : 'Search stories...'}
          className="max-w-md md:w-auto flex-grow"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        {/* Filters */}
        <div className="flex items-center space-x-4">
          {/* Level Filter */}
          <Select onValueChange={handleLevelChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={language === 'fr' ? 'Niveau' : 'Level'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">{language === 'fr' ? 'Tous les niveaux' : 'All Levels'}</SelectItem>
              <SelectItem value="beginner">{language === 'fr' ? 'Débutant' : 'Beginner'}</SelectItem>
              <SelectItem value="intermediate">{language === 'fr' ? 'Intermédiaire' : 'Intermediate'}</SelectItem>
              <SelectItem value="advanced">{language === 'fr' ? 'Avancé' : 'Advanced'}</SelectItem>
            </SelectContent>
          </Select>

          {/* Reading Time Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{language === 'fr' ? 'Temps de lecture max:' : 'Max Reading Time:'}</span>
            <Slider
              defaultValue={readingTime}
              max={15}
              step={1}
              onValueChange={handleReadingTimeChange}
              className="w-24"
            />
            <span className="text-sm text-gray-600">{readingTime[0]} min</span>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-4xl mx-auto">
        <StoryContent />
      </div>
    </div>
  );
};

export default StoryHub;
