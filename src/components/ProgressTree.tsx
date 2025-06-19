
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Star, Play, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface Lesson {
  id: string;
  title: string;
  titleFr: string;
  status: 'locked' | 'available' | 'completed';
  stars: number;
  maxStars: number;
  position: 'left' | 'center' | 'right';
}

const ProgressTree = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const lessons: Lesson[] = [
    {
      id: '1',
      title: 'Basic Greetings',
      titleFr: 'Salutations de base',
      status: 'completed',
      stars: 3,
      maxStars: 3,
      position: 'center'
    },
    {
      id: '2',
      title: 'Numbers 1-10',
      titleFr: 'Nombres 1-10',
      status: 'completed',
      stars: 2,
      maxStars: 3,
      position: 'left'
    },
    {
      id: '3',
      title: 'Family Members',
      titleFr: 'Membres de la famille',
      status: 'available',
      stars: 0,
      maxStars: 3,
      position: 'right'
    },
    {
      id: '4',
      title: 'Daily Activities',
      titleFr: 'Activités quotidiennes',
      status: 'available',
      stars: 0,
      maxStars: 3,
      position: 'center'
    },
    {
      id: '5',
      title: 'Colors',
      titleFr: 'Couleurs',
      status: 'locked',
      stars: 0,
      maxStars: 3,
      position: 'left'
    },
    {
      id: '6',
      title: 'Food & Drinks',
      titleFr: 'Nourriture et boissons',
      status: 'locked',
      stars: 0,
      maxStars: 3,
      position: 'right'
    },
    {
      id: '7',
      title: 'Time & Dates',
      titleFr: 'Temps et dates',
      status: 'locked',
      stars: 0,
      maxStars: 3,
      position: 'center'
    }
  ];

  const handleLessonClick = (lesson: Lesson) => {
    if (lesson.status !== 'locked') {
      navigate(`/lesson/${lesson.id}`);
    }
  };

  const getPositionClass = (position: string, index: number) => {
    const baseClasses = "relative flex items-center justify-center";
    
    switch (position) {
      case 'left':
        return `${baseClasses} justify-start pl-8`;
      case 'right':
        return `${baseClasses} justify-end pr-8`;
      default:
        return `${baseClasses} justify-center`;
    }
  };

  const getBubbleColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 border-green-600 text-white';
      case 'available':
        return 'bg-orange-500 border-orange-600 text-white';
      default:
        return 'bg-gray-300 border-gray-400 text-gray-500';
    }
  };

  const renderStars = (stars: number, maxStars: number, status: string) => {
    if (status === 'locked') return null;
    
    return (
      <div className="flex space-x-1 mt-1">
        {Array.from({ length: maxStars }, (_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${
              i < stars 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto py-6">
      <div className="relative">
        {/* Main path line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2 z-0"></div>
        
        {lessons.map((lesson, index) => (
          <div key={lesson.id} className="relative mb-8">
            {/* Connecting lines for off-center bubbles */}
            {lesson.position !== 'center' && (
              <div 
                className={`absolute top-1/2 w-12 h-0.5 bg-gray-200 z-0 ${
                  lesson.position === 'left' 
                    ? 'left-1/2 transform translate-x-1' 
                    : 'right-1/2 transform -translate-x-1'
                }`}
              ></div>
            )}
            
            <div className={getPositionClass(lesson.position, index)}>
              <Card 
                className={`w-20 h-20 rounded-full border-4 cursor-pointer transition-all duration-300 hover:scale-110 z-10 ${getBubbleColor(lesson.status)} ${
                  lesson.status === 'locked' ? 'cursor-not-allowed' : 'hover:shadow-lg'
                }`}
                onClick={() => handleLessonClick(lesson)}
              >
                <CardContent className="p-0 h-full flex flex-col items-center justify-center">
                  {lesson.status === 'locked' ? (
                    <Lock className="w-6 h-6" />
                  ) : lesson.status === 'completed' ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                  
                  <span className="text-xs font-bold mt-1">
                    {lesson.id}
                  </span>
                </CardContent>
              </Card>
              
              {/* Lesson info card */}
              <div className={`absolute top-1/2 transform -translate-y-1/2 z-20 ${
                lesson.position === 'left' 
                  ? 'left-24' 
                  : lesson.position === 'right' 
                    ? 'right-24' 
                    : 'left-1/2 -translate-x-1/2 top-24 translate-y-0'
              }`}>
                <Card className="bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm">
                  <CardContent className="p-3 text-center min-w-32">
                    <h3 className="text-sm font-semibold text-gray-800">
                      {language === 'fr' ? lesson.titleFr : lesson.title}
                    </h3>
                    {renderStars(lesson.stars, lesson.maxStars, lesson.status)}
                    
                    {lesson.status !== 'locked' && (
                      <Badge 
                        variant="secondary" 
                        className={`mt-2 text-xs ${
                          lesson.status === 'completed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {lesson.status === 'completed' 
                          ? (language === 'fr' ? 'Terminé' : 'Complete')
                          : (language === 'fr' ? 'Disponible' : 'Available')
                        }
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTree;
