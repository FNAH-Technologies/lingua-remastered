
import { useState } from 'react';
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

const EnhancedProgressTree = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
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
      color: 'from-emerald-400 to-emerald-600',
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
      stars: 1,
      maxStars: 3,
      lessonsCount: 6,
      completedLessons: 2,
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
    }
  ];

  const handleLessonClick = (lesson: Lesson) => {
    if (lesson.status !== 'locked') {
      navigate(`/lesson/${lesson.id}`);
    }
  };

  const renderProgressCircle = (completed: number, total: number) => {
    const percentage = (completed / total) * 100;
    const circumference = 2 * Math.PI * 16;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="absolute -top-2 -right-2 w-10 h-10">
        <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="3"
          />
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-gray-700">{completed}</span>
        </div>
      </div>
    );
  };

  const renderStars = (stars: number, maxStars: number) => (
    <div className="flex justify-center space-x-0.5 mt-1">
      {Array.from({ length: maxStars }, (_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 transition-all duration-300 ${
            i < stars 
              ? 'fill-yellow-400 text-yellow-400' 
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="relative w-full max-w-md mx-auto py-8 px-4">
      {/* Curved Path SVG */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-0" 
        viewBox="0 0 400 800"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e0e7ff" />
            <stop offset="50%" stopColor="#c7d2fe" />
            <stop offset="100%" stopColor="#a5b4fc" />
          </linearGradient>
        </defs>
        <path
          d="M200 50 Q150 120 200 180 Q250 240 200 300 Q150 360 200 420 Q250 480 200 540 Q150 600 200 660"
          stroke="url(#pathGradient)"
          strokeWidth="4"
          fill="none"
          className="drop-shadow-sm"
        />
      </svg>

      {/* Lesson Nodes */}
      <div className="relative z-10 space-y-16">
        {lessons.map((lesson, index) => {
          const IconComponent = lesson.icon;
          const isHovered = hoveredLesson === lesson.id;
          
          return (
            <div 
              key={lesson.id} 
              className={`flex ${
                lesson.position === 'left' ? 'justify-start pl-8' 
                : lesson.position === 'right' ? 'justify-end pr-8' 
                : 'justify-center'
              }`}
            >
              <div className="relative group">
                {/* Main Lesson Bubble */}
                <div
                  className={`relative w-20 h-20 rounded-full border-4 cursor-pointer transition-all duration-500 transform ${
                    lesson.status === 'locked'
                      ? 'bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed'
                      : `bg-gradient-to-br ${lesson.color} border-white text-white shadow-lg hover:shadow-xl hover:scale-110 active:scale-95`
                  } ${isHovered ? 'animate-pulse-glow' : ''}`}
                  onClick={() => handleLessonClick(lesson)}
                  onMouseEnter={() => setHoveredLesson(lesson.id)}
                  onMouseLeave={() => setHoveredLesson(null)}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    {lesson.status === 'locked' ? (
                      <Lock className="w-8 h-8" />
                    ) : lesson.status === 'completed' ? (
                      <>
                        <CheckCircle className="w-5 h-5 mb-0.5" />
                        <IconComponent className="w-5 h-5" />
                      </>
                    ) : (
                      <>
                        <IconComponent className="w-7 h-7 mb-0.5" />
                        <Play className="w-3 h-3" />
                      </>
                    )}
                  </div>

                  {/* Progress Circle */}
                  {lesson.status !== 'locked' && renderProgressCircle(lesson.completedLessons, lesson.lessonsCount)}
                  
                  {/* Level Badge */}
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-gray-800 shadow-md border-2 border-gray-100">
                    {lesson.id}
                  </div>
                </div>

                {/* Lesson Info Card */}
                <Card className={`absolute ${
                  lesson.position === 'left' ? 'left-24 top-1/2 -translate-y-1/2' 
                  : lesson.position === 'right' ? 'right-24 top-1/2 -translate-y-1/2' 
                  : 'left-1/2 -translate-x-1/2 top-24'
                } transition-all duration-300 transform ${
                  isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                } bg-white/95 backdrop-blur-sm border-2 shadow-xl rounded-2xl min-w-40 max-w-48 z-20`}>
                  <CardContent className="p-4">
                    <h3 className="text-sm font-bold text-gray-800 mb-2 text-center">
                      {language === 'fr' ? lesson.titleFr : lesson.title}
                    </h3>
                    
                    {lesson.status !== 'locked' && (
                      <>
                        <div className="text-xs text-gray-600 text-center mb-2">
                          {lesson.completedLessons}/{lesson.lessonsCount} {language === 'fr' ? 'leçons' : 'lessons'}
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div 
                            className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full transition-all duration-700"
                            style={{ width: `${(lesson.completedLessons / lesson.lessonsCount) * 100}%` }}
                          />
                        </div>
                        
                        {renderStars(lesson.stars, lesson.maxStars)}
                        
                        <div className="flex justify-center mt-3">
                          <Badge 
                            variant="secondary" 
                            className={`text-xs font-semibold ${
                              lesson.status === 'completed' 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : 'bg-orange-100 text-orange-700'
                            }`}
                          >
                            {lesson.status === 'completed' 
                              ? (language === 'fr' ? 'Terminé' : 'Complete')
                              : (language === 'fr' ? 'En cours' : 'In Progress')
                            }
                          </Badge>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Skills Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200/50">
        <div className="flex justify-center space-x-8">
          {[
            { icon: MessageCircle, label: language === 'fr' ? 'Parler' : 'Speaking', color: 'from-blue-400 to-blue-600', delay: '0s' },
            { icon: Package, label: language === 'fr' ? 'Écouter' : 'Listening', color: 'from-emerald-400 to-emerald-600', delay: '0.1s' },
            { icon: Star, label: language === 'fr' ? 'Écrire' : 'Writing', color: 'from-purple-400 to-purple-600', delay: '0.2s' }
          ].map((skill, index) => (
            <div 
              key={index}
              className="flex flex-col items-center group cursor-pointer"
              style={{ animationDelay: skill.delay }}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${skill.color} rounded-full flex items-center justify-center mb-2 transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg group-active:scale-110 shadow-md`}>
                <skill.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-gray-600 group-hover:text-gray-800 transition-colors font-medium">
                {skill.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedProgressTree;
