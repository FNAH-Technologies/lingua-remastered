
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, Star, Play, CheckCircle, MessageCircle, Hash, Users, Clock, Palette, Utensils, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface LessonNode {
  id: string;
  title: string;
  titleFr: string;
  titleEwondo: string;
  status: 'locked' | 'available' | 'completed';
  stars: number;
  maxStars: number;
  icon: any;
  color: string;
  position: { x: number; y: number };
}

const DuolingoProgressTree = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const lessons: LessonNode[] = [
    {
      id: '1',
      title: 'Basic Greetings',
      titleFr: 'Salutations de base',
      titleEwondo: 'Mbolo (Salutations)',
      status: 'completed',
      stars: 3,
      maxStars: 3,
      icon: MessageCircle,
      color: 'from-emerald-400 to-green-500',
      position: { x: 50, y: 85 }
    },
    {
      id: '2',
      title: 'Numbers & Counting',
      titleFr: 'Nombres et comptage',
      titleEwondo: 'Enyañ (Nombres)',
      status: 'completed',
      stars: 2,
      maxStars: 3,
      icon: Hash,
      color: 'from-blue-400 to-cyan-500',
      position: { x: 25, y: 70 }
    },
    {
      id: '3',
      title: 'Family & Relations',
      titleFr: 'Famille et relations',
      titleEwondo: 'Ndap (Famille)',
      status: 'available',
      stars: 1,
      maxStars: 3,
      icon: Users,
      color: 'from-purple-400 to-pink-500',
      position: { x: 75, y: 60 }
    },
    {
      id: '4',
      title: 'Daily Life',
      titleFr: 'Vie quotidienne',
      titleEwondo: 'Nduan asɔ́b (Vie quotidienne)',
      status: 'available',
      stars: 0,
      maxStars: 3,
      icon: Clock,
      color: 'from-orange-400 to-red-500',
      position: { x: 40, y: 45 }
    },
    {
      id: '5',
      title: 'Colors & Nature',
      titleFr: 'Couleurs et nature',
      titleEwondo: 'Mvɔ́ñ ne Dzom (Couleurs et Nature)',
      status: 'locked',
      stars: 0,
      maxStars: 3,
      icon: Palette,
      color: 'from-pink-400 to-rose-500',
      position: { x: 65, y: 30 }
    },
    {
      id: '6',
      title: 'Food & Culture',
      titleFr: 'Nourriture et culture',
      titleEwondo: 'Bídí ne Bikukú (Nourriture et Culture)',
      status: 'locked',
      stars: 0,
      maxStars: 3,
      icon: Utensils,
      color: 'from-indigo-400 to-purple-500',
      position: { x: 35, y: 15 }
    }
  ];

  const handleLessonClick = (lesson: LessonNode) => {
    if (lesson.status !== 'locked') {
      navigate(`/lesson/${lesson.id}`);
    }
  };

  return (
    <div className="relative w-full h-[400px] bg-gradient-to-br from-orange-100 via-yellow-50 to-amber-100 rounded-3xl overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-8 left-8 w-6 h-6 bg-orange-300/40 rounded-full animate-pulse"></div>
        <div className="absolute top-16 right-12 w-4 h-4 bg-yellow-400/60 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-12 w-5 h-5 bg-amber-400/50 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 right-16 w-3 h-3 bg-orange-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Connecting Path */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(251, 146, 60, 0.6)" />
            <stop offset="50%" stopColor="rgba(245, 158, 11, 0.4)" />
            <stop offset="100%" stopColor="rgba(34, 197, 94, 0.8)" />
          </linearGradient>
        </defs>
        <path
          d="M 50 85 Q 35 75 25 70 Q 55 55 75 60 Q 45 50 40 45 Q 55 35 65 30 Q 45 25 35 15"
          stroke="url(#pathGradient)"
          strokeWidth="2"
          strokeDasharray="5,3"
          fill="none"
          className="animate-pulse"
          style={{ animationDuration: '4s' }}
        />
      </svg>

      {/* Lesson Nodes */}
      {lessons.map((lesson) => {
        const IconComponent = lesson.icon;
        
        return (
          <div
            key={lesson.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 group"
            style={{
              left: `${lesson.position.x}%`,
              top: `${lesson.position.y}%`
            }}
            onClick={() => handleLessonClick(lesson)}
          >
            {/* Node Circle */}
            <div className={`relative w-16 h-16 rounded-full border-3 border-white shadow-xl transition-all duration-300 ${
              lesson.status === 'locked'
                ? 'bg-gray-300'
                : lesson.status === 'completed'
                ? `bg-gradient-to-br ${lesson.color}`
                : `bg-gradient-to-br ${lesson.color}`
            } ${lesson.status !== 'locked' ? 'hover:shadow-2xl group-hover:scale-110' : ''}`}>
              
              {/* Animated ring for available lessons */}
              {lesson.status === 'available' && (
                <div className="absolute inset-0 rounded-full border-2 border-yellow-400 animate-ping opacity-75"></div>
              )}
              
              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                {lesson.status === 'locked' ? (
                  <Lock className="w-6 h-6 text-gray-500" />
                ) : lesson.status === 'completed' ? (
                  <CheckCircle className="w-6 h-6 text-white" />
                ) : (
                  <IconComponent className="w-6 h-6 text-white" />
                )}
              </div>

              {/* Level Badge */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-orange-200">
                <span className="text-xs font-bold text-gray-800">{lesson.id}</span>
              </div>

              {/* Stars */}
              {lesson.status !== 'locked' && lesson.stars > 0 && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
                  {Array.from({ length: lesson.stars }, (_, i) => (
                    <Star
                      key={i}
                      className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl border border-gray-200 min-w-max">
                <p className="text-sm font-bold text-gray-800">
                  {language === 'fr' ? lesson.titleFr : lesson.title}
                </p>
                <p className="text-xs text-orange-600 font-medium">
                  {lesson.titleEwondo}
                </p>
                <div className="text-xs text-gray-600 mt-1">
                  {lesson.status === 'completed' 
                    ? (language === 'fr' ? 'Terminé!' : 'Completed!')
                    : lesson.status === 'available'
                    ? (language === 'fr' ? 'Disponible' : 'Available')
                    : (language === 'fr' ? 'Verrouillé' : 'Locked')
                  }
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Progress Indicator */}
      <div className="absolute top-4 left-4 bg-white/90 rounded-full px-3 py-2 text-sm font-bold text-gray-800 shadow-lg">
        {lessons.filter(l => l.status === 'completed').length}/{lessons.length} Ewondo
      </div>

      {/* Mascot */}
      <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg animate-bounce">
        <span className="text-lg">🌍</span>
      </div>
    </div>
  );
};

export default DuolingoProgressTree;
