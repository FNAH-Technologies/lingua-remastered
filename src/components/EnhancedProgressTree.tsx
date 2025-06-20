
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
  bgColor: string;
}

const EnhancedProgressTree = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

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
      color: 'from-emerald-500 to-green-600',
      bgColor: 'from-emerald-50 to-green-50'
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
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50'
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
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50'
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
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-50'
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
      color: 'from-pink-500 to-rose-600',
      bgColor: 'from-pink-50 to-rose-50'
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
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'from-indigo-50 to-purple-50'
    }
  ];

  const handleLessonClick = (lesson: Lesson) => {
    if (lesson.status !== 'locked') {
      navigate(`/lesson/${lesson.id}`);
    }
  };

  return (
    <div className="space-y-4">
      {lessons.map((lesson, index) => {
        const IconComponent = lesson.icon;
        const progressPercentage = (lesson.completedLessons / lesson.lessonsCount) * 100;
        
        return (
          <Card 
            key={lesson.id}
            className={`border-0 shadow-sm rounded-2xl overflow-hidden transition-all duration-200 ${
              lesson.status === 'locked' 
                ? 'opacity-60 cursor-not-allowed' 
                : 'cursor-pointer hover:shadow-md active:scale-95'
            }`}
            onClick={() => handleLessonClick(lesson)}
          >
            <CardContent className={`p-4 bg-gradient-to-r ${lesson.status === 'locked' ? 'from-gray-50 to-gray-100' : lesson.bgColor}`}>
              <div className="flex items-center space-x-4">
                {/* Icon Container */}
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                    lesson.status === 'locked'
                      ? 'bg-gray-300'
                      : `bg-gradient-to-r ${lesson.color}`
                  }`}>
                    {lesson.status === 'locked' ? (
                      <Lock className="w-7 h-7 text-gray-500" />
                    ) : lesson.status === 'completed' ? (
                      <CheckCircle className="w-7 h-7 text-white" />
                    ) : (
                      <IconComponent className="w-7 h-7 text-white" />
                    )}
                  </div>
                  
                  {/* Level Badge */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-gray-100">
                    <span className="text-xs font-bold text-gray-800">{lesson.id}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900 text-sm">
                      {language === 'fr' ? lesson.titleFr : lesson.title}
                    </h3>
                    {lesson.status !== 'locked' && (
                      <div className="flex space-x-0.5">
                        {Array.from({ length: lesson.maxStars }, (_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < lesson.stars 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {lesson.status !== 'locked' && (
                    <>
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                        <span>{lesson.completedLessons}/{lesson.lessonsCount} {language === 'fr' ? 'leçons' : 'lessons'}</span>
                        <span>{Math.round(progressPercentage)}%</span>
                      </div>
                      
                      <div className="w-full bg-white/60 rounded-full h-2 mb-2">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-700"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                      
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          lesson.status === 'completed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {lesson.status === 'completed' 
                          ? (language === 'fr' ? 'Terminé' : 'Completed')
                          : (language === 'fr' ? 'En cours' : 'In Progress')
                        }
                      </Badge>
                    </>
                  )}
                  
                  {lesson.status === 'locked' && (
                    <p className="text-xs text-gray-500">
                      {language === 'fr' ? 'Terminez les leçons précédentes' : 'Complete previous lessons to unlock'}
                    </p>
                  )}
                </div>

                {/* Play/Action Button */}
                {lesson.status !== 'locked' && (
                  <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-md">
                    <Play className="w-4 h-4 text-gray-700" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default EnhancedProgressTree;
