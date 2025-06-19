
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
  const [hoveredLesson, setHoveredLesson] = useState<string | null>(null);

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

  const getBubbleClasses = (lesson: Lesson, isHovered: boolean) => {
    const baseClasses = "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-4 cursor-pointer transition-all duration-500 z-10 shadow-lg transform";
    
    const hoverScale = isHovered && lesson.status !== 'locked' ? 'scale-110' : 'scale-100';
    
    switch (lesson.status) {
      case 'completed':
        return `${baseClasses} bg-gradient-to-br ${lesson.color} border-white text-white shadow-xl ${hoverScale} ${isHovered ? 'animate-pulse-glow shadow-2xl' : ''}`;
      case 'available':
        return `${baseClasses} bg-gradient-to-br ${lesson.color} border-white text-white hover:shadow-2xl ${hoverScale} ${isHovered ? 'shadow-2xl' : ''}`;
      default:
        return `${baseClasses} bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed ${hoverScale}`;
    }
  };

  const renderStars = (stars: number, maxStars: number, status: string) => {
    if (status === 'locked') return null;
    
    return (
      <div className="flex justify-center space-x-1 mt-2">
        {Array.from({ length: maxStars }, (_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-300 ${
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
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto py-4 sm:py-6 md:py-8 px-2 sm:px-4">
      <div className="relative">
        {/* Enhanced path line with gradient */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 sm:w-2 bg-gradient-to-b from-blue-200 via-purple-200 to-orange-200 transform -translate-x-1/2 z-0 rounded-full shadow-inner"></div>
        
        {lessons.map((lesson, index) => {
          const IconComponent = lesson.icon;
          const isHovered = hoveredLesson === lesson.id;
          
          return (
            <div key={lesson.id} className="relative mb-8 sm:mb-10 md:mb-12">
              {/* Enhanced connecting lines */}
              {lesson.position !== 'center' && (
                <div 
                  className={`absolute top-1/2 w-8 sm:w-12 md:w-16 h-0.5 sm:h-1 bg-gradient-to-r from-gray-200 to-gray-300 z-0 rounded-full ${
                    lesson.position === 'left' 
                      ? 'left-1/2 transform translate-x-0.5 sm:translate-x-1' 
                      : 'right-1/2 transform -translate-x-0.5 sm:-translate-x-1'
                  }`}
                ></div>
              )}
              
              <div className={`relative flex items-center ${
                lesson.position === 'left' 
                  ? 'justify-start pl-2 sm:pl-4 md:pl-8' 
                  : lesson.position === 'right' 
                    ? 'justify-end pr-2 sm:pr-4 md:pr-8' 
                    : 'justify-center'
              }`}>
                
                {/* Main lesson bubble */}
                <Card 
                  className={getBubbleClasses(lesson, isHovered)}
                  onClick={() => handleLessonClick(lesson)}
                  onMouseEnter={() => setHoveredLesson(lesson.id)}
                  onMouseLeave={() => setHoveredLesson(null)}
                >
                  <CardContent className="p-0 h-full flex flex-col items-center justify-center relative">
                    {lesson.status === 'locked' ? (
                      <Lock className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                    ) : lesson.status === 'completed' ? (
                      <>
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mb-1" />
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      </>
                    ) : (
                      <>
                        <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mb-1" />
                        <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                      </>
                    )}
                    
                    {/* Level number badge */}
                    <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-gray-800 shadow-md">
                      {lesson.id}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Enhanced lesson info card - positioned to avoid overlaps */}
                <div className={`absolute z-20 transition-all duration-300 ${
                  isHovered ? 'opacity-100 scale-100' : 'opacity-90 scale-95'
                } ${
                  lesson.position === 'left' 
                    ? 'left-24 sm:left-28 md:left-32 top-1/2 -translate-y-1/2' 
                    : lesson.position === 'right' 
                      ? 'right-24 sm:right-28 md:right-32 top-1/2 -translate-y-1/2' 
                      : 'left-1/2 -translate-x-1/2 top-24 sm:top-28 md:top-32'
                }`}>
                  <Card className="bg-white/98 backdrop-blur-sm border-2 border-gray-100 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <CardContent className="p-3 sm:p-4 text-center min-w-32 sm:min-w-36 md:min-w-40 max-w-48">
                      <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-2 leading-tight">
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
                          className={`mt-2 sm:mt-3 text-xs font-semibold transition-all duration-300 ${
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
      
      {/* Enhanced footer with interactive animated icons */}
      <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
        <div className="flex justify-center space-x-4 sm:space-x-6 md:space-x-8">
          <div 
            className="flex flex-col items-center text-center group cursor-pointer"
            onMouseEnter={(e) => e.currentTarget.classList.add('animate-bounce')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('animate-bounce')}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-2 transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-blue-300/50 group-active:scale-110">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-xs text-gray-600 group-hover:text-blue-600 transition-colors font-medium">{language === 'fr' ? 'Parler' : 'Speaking'}</span>
          </div>
          
          <div 
            className="flex flex-col items-center text-center group cursor-pointer"
            onMouseEnter={(e) => e.currentTarget.classList.add('animate-pulse')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('animate-pulse')}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-2 transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-green-300/50 group-active:scale-110">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-xs text-gray-600 group-hover:text-green-600 transition-colors font-medium">{language === 'fr' ? 'Écouter' : 'Listening'}</span>
          </div>
          
          <div 
            className="flex flex-col items-center text-center group cursor-pointer"
            onMouseEnter={(e) => {
              const star = e.currentTarget.querySelector('.star-icon');
              star?.classList.add('animate-spin');
            }}
            onMouseLeave={(e) => {
              const star = e.currentTarget.querySelector('.star-icon');
              star?.classList.remove('animate-spin');
            }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-2 transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-purple-300/50 group-active:scale-110">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white star-icon transition-transform duration-500" />
            </div>
            <span className="text-xs text-gray-600 group-hover:text-purple-600 transition-colors font-medium">{language === 'fr' ? 'Écrire' : 'Writing'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTree;
