
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Star, Play, CheckCircle, MessageCircle, Package, Coffee, Clock, Palette, Utensils, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface Lesson {
  id: string;
  title: string;
  titleFr: string;
  status: 'locked' | 'available' | 'completed';
  stars: number;
  maxStars: number;
  lessonsCount: number;
  completedLessons: number;
  icon: any;
  color: string;
  position: 'left' | 'center' | 'right';
}

const ProgressTree = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const lessons: Lesson[] = [
    {
      id: '1',
      title: 'Basic Communication',
      titleFr: 'Communication de base',
      status: 'completed',
      stars: 3,
      maxStars: 3,
      lessonsCount: 5,
      completedLessons: 5,
      icon: MessageCircle,
      color: 'from-green-400 to-green-600',
      position: 'center'
    },
    {
      id: '2',
      title: 'Numbers & Counting',
      titleFr: 'Nombres et comptage',
      status: 'completed',
      stars: 2,
      maxStars: 3,
      lessonsCount: 4,
      completedLessons: 3,
      icon: Package,
      color: 'from-blue-400 to-blue-600',
      position: 'left'
    },
    {
      id: '3',
      title: 'Family & People',
      titleFr: 'Famille et personnes',
      status: 'available',
      stars: 0,
      maxStars: 3,
      lessonsCount: 6,
      completedLessons: 0,
      icon: Home,
      color: 'from-purple-400 to-purple-600',
      position: 'right'
    },
    {
      id: '4',
      title: 'Daily Activities',
      titleFr: 'Activités quotidiennes',
      status: 'available',
      stars: 0,
      maxStars: 3,
      lessonsCount: 8,
      completedLessons: 0,
      icon: Clock,
      color: 'from-orange-400 to-orange-600',
      position: 'center'
    },
    {
      id: '5',
      title: 'Colors & Descriptions',
      titleFr: 'Couleurs et descriptions',
      status: 'locked',
      stars: 0,
      maxStars: 3,
      lessonsCount: 5,
      completedLessons: 0,
      icon: Palette,
      color: 'from-pink-400 to-pink-600',
      position: 'left'
    },
    {
      id: '6',
      title: 'Food & Dining',
      titleFr: 'Nourriture et repas',
      status: 'locked',
      stars: 0,
      maxStars: 3,
      lessonsCount: 7,
      completedLessons: 0,
      icon: Utensils,
      color: 'from-red-400 to-red-600',
      position: 'right'
    },
    {
      id: '7',
      title: 'Shopping & Market',
      titleFr: 'Achats et marché',
      status: 'locked',
      stars: 0,
      maxStars: 3,
      lessonsCount: 6,
      completedLessons: 0,
      icon: Coffee,
      color: 'from-yellow-400 to-yellow-600',
      position: 'center'
    }
  ];

  const handleLessonClick = (lesson: Lesson) => {
    if (lesson.status !== 'locked') {
      navigate(`/lesson/${lesson.id}`);
    }
  };

  const getPositionClass = (position: string) => {
    const baseClasses = "relative flex items-center justify-center";
    
    switch (position) {
      case 'left':
        return `${baseClasses} justify-start pl-4 md:pl-8`;
      case 'right':
        return `${baseClasses} justify-end pr-4 md:pr-8`;
      default:
        return `${baseClasses} justify-center`;
    }
  };

  const getBubbleClasses = (lesson: Lesson) => {
    const baseClasses = "w-24 h-24 md:w-28 md:h-28 rounded-full border-4 cursor-pointer transition-all duration-500 hover:scale-110 z-10 shadow-lg";
    
    switch (lesson.status) {
      case 'completed':
        return `${baseClasses} bg-gradient-to-br ${lesson.color} border-white text-white shadow-xl animate-pulse-glow`;
      case 'available':
        return `${baseClasses} bg-gradient-to-br ${lesson.color} border-white text-white hover:shadow-2xl`;
      default:
        return `${baseClasses} bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed`;
    }
  };

  const renderStars = (stars: number, maxStars: number, status: string) => {
    if (status === 'locked') return null;
    
    return (
      <div className="flex justify-center space-x-1 mt-2">
        {Array.from({ length: maxStars }, (_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 transition-all duration-300 ${
              i < stars 
                ? 'fill-yellow-400 text-yellow-400 animate-bounce' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const renderProgressBar = (completed: number, total: number, status: string) => {
    if (status === 'locked') return null;
    
    const percentage = (completed / total) * 100;
    
    return (
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div 
          className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-700"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      <div className="relative">
        {/* Enhanced path line with gradient */}
        <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-gradient-to-b from-blue-200 via-purple-200 to-orange-200 transform -translate-x-1/2 z-0 rounded-full shadow-inner"></div>
        
        {lessons.map((lesson, index) => {
          const IconComponent = lesson.icon;
          
          return (
            <div key={lesson.id} className="relative mb-12">
              {/* Enhanced connecting lines */}
              {lesson.position !== 'center' && (
                <div 
                  className={`absolute top-1/2 w-16 h-1 bg-gradient-to-r from-gray-200 to-gray-300 z-0 rounded-full ${
                    lesson.position === 'left' 
                      ? 'left-1/2 transform translate-x-1' 
                      : 'right-1/2 transform -translate-x-1'
                  }`}
                ></div>
              )}
              
              <div className={getPositionClass(lesson.position)}>
                {/* Main lesson bubble */}
                <Card 
                  className={getBubbleClasses(lesson)}
                  onClick={() => handleLessonClick(lesson)}
                >
                  <CardContent className="p-0 h-full flex flex-col items-center justify-center relative">
                    {lesson.status === 'locked' ? (
                      <Lock className="w-8 h-8" />
                    ) : lesson.status === 'completed' ? (
                      <>
                        <CheckCircle className="w-6 h-6 mb-1" />
                        <IconComponent className="w-6 h-6" />
                      </>
                    ) : (
                      <>
                        <IconComponent className="w-8 h-8 mb-1" />
                        <Play className="w-4 h-4" />
                      </>
                    )}
                    
                    {/* Level number badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-gray-800 shadow-md">
                      {lesson.id}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Enhanced lesson info card */}
                <div className={`absolute top-1/2 transform -translate-y-1/2 z-20 ${
                  lesson.position === 'left' 
                    ? 'left-28 md:left-32' 
                    : lesson.position === 'right' 
                      ? 'right-28 md:right-32' 
                      : 'left-1/2 -translate-x-1/2 top-32 translate-y-0'
                }`}>
                  <Card className="bg-white/95 backdrop-blur-sm border-2 border-gray-100 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-4 text-center min-w-40">
                      <h3 className="text-sm font-bold text-gray-800 mb-2">
                        {language === 'fr' ? lesson.titleFr : lesson.title}
                      </h3>
                      
                      {lesson.status !== 'locked' && (
                        <div className="text-xs text-gray-600 mb-2">
                          {lesson.completedLessons}/{lesson.lessonsCount} {language === 'fr' ? 'leçons' : 'lessons'}
                        </div>
                      )}
                      
                      {renderProgressBar(lesson.completedLessons, lesson.lessonsCount, lesson.status)}
                      {renderStars(lesson.stars, lesson.maxStars, lesson.status)}
                      
                      {lesson.status !== 'locked' && (
                        <Badge 
                          variant="secondary" 
                          className={`mt-3 text-xs font-semibold transition-all duration-300 ${
                            lesson.status === 'completed' 
                              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                              : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
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
          );
        })}
      </div>
      
      {/* Enhanced footer with animated icons */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex justify-center space-x-8">
          <div className="flex flex-col items-center text-center group cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-2 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg animate-bounce">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-gray-600 group-hover:text-blue-600 transition-colors">{language === 'fr' ? 'Parler' : 'Speaking'}</span>
          </div>
          
          <div className="flex flex-col items-center text-center group cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-2 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg animate-pulse">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-gray-600 group-hover:text-green-600 transition-colors">{language === 'fr' ? 'Écouter' : 'Listening'}</span>
          </div>
          
          <div className="flex flex-col items-center text-center group cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-2 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg animate-bounce">
              <Star className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-gray-600 group-hover:text-purple-600 transition-colors">{language === 'fr' ? 'Écrire' : 'Writing'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTree;
