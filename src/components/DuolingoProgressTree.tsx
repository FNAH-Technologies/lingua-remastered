
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
      color: 'from-emerald-500 to-green-600',
      position: { x: 50, y: 90 }
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
      color: 'from-blue-500 to-cyan-600',
      position: { x: 30, y: 75 }
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
      color: 'from-purple-500 to-pink-600',
      position: { x: 70, y: 65 }
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
      color: 'from-orange-500 to-red-600',
      position: { x: 40, y: 50 }
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
      color: 'from-pink-500 to-rose-600',
      position: { x: 65, y: 35 }
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
      color: 'from-indigo-500 to-purple-600',
      position: { x: 35, y: 20 }
    },
    {
      id: '7',
      title: 'Village Life',
      titleFr: 'Vie au village',
      titleEwondo: 'Nduan Dzal (Vie au Village)',
      status: 'locked',
      stars: 0,
      maxStars: 3,
      icon: Home,
      color: 'from-yellow-500 to-orange-600',
      position: { x: 55, y: 5 }
    }
  ];

  const handleLessonClick = (lesson: LessonNode) => {
    if (lesson.status !== 'locked') {
      navigate(`/lesson/${lesson.id}`);
    }
  };

  // Generate animated SVG path for the winding trail
  const generatePath = () => {
    const sortedLessons = [...lessons].sort((a, b) => b.position.y - a.position.y);
    let path = `M ${sortedLessons[0].position.x} ${sortedLessons[0].position.y}`;
    
    for (let i = 1; i < sortedLessons.length; i++) {
      const curr = sortedLessons[i];
      const prev = sortedLessons[i - 1];
      
      // Create smooth bezier curves between points
      const controlPoint1X = prev.position.x + (curr.position.x - prev.position.x) * 0.3;
      const controlPoint1Y = prev.position.y - (prev.position.y - curr.position.y) * 0.3;
      const controlPoint2X = curr.position.x - (curr.position.x - prev.position.x) * 0.3;
      const controlPoint2Y = curr.position.y + (prev.position.y - curr.position.y) * 0.3;
      
      path += ` C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${curr.position.x} ${curr.position.y}`;
    }
    
    return path;
  };

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-b from-amber-400 via-orange-400 to-red-500 rounded-3xl overflow-hidden shadow-xl">
      {/* Enhanced African-inspired background */}
      <div className="absolute inset-0">
        {/* Traditional pattern overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 2px, transparent 2px)`,
          backgroundSize: '40px 40px'
        }}></div>
        
        {/* Floating decorative elements with African colors */}
        <div className="absolute top-8 left-8 w-8 h-8 bg-green-400/40 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-16 right-12 w-6 h-6 bg-yellow-300/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-12 w-7 h-7 bg-red-400/40 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '2.5s' }}></div>
        <div className="absolute bottom-32 right-16 w-5 h-5 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-green-300/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '4s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-6 h-6 bg-orange-300/35 rounded-full animate-pulse" style={{ animationDelay: '2.5s' }}></div>
        
        {/* Enhanced gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
      </div>

      {/* Enhanced SVG Trail with African-inspired colors */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="africanTrailGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="50%" stopColor="rgba(254,240,138,0.8)" />
            <stop offset="100%" stopColor="rgba(34,197,94,0.6)" />
          </linearGradient>
          <filter id="africanGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path
          d={generatePath()}
          stroke="url(#africanTrailGradient)"
          strokeWidth="1.5"
          strokeDasharray="4,3"
          fill="none"
          filter="url(#africanGlow)"
          className="animate-pulse"
          style={{ animationDuration: '3s' }}
        />
      </svg>

      {/* Lesson Nodes with enhanced styling */}
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
            {/* Enhanced Node Circle */}
            <div className={`relative w-18 h-18 rounded-full border-4 border-white shadow-2xl transition-all duration-300 ${
              lesson.status === 'locked'
                ? 'bg-gray-400 shadow-gray-400/50'
                : lesson.status === 'completed'
                ? `bg-gradient-to-br ${lesson.color} shadow-green-500/40`
                : `bg-gradient-to-br ${lesson.color} shadow-blue-500/40`
            } ${lesson.status !== 'locked' ? 'hover:shadow-2xl hover:scale-110 group-hover:border-yellow-400' : ''}`}>
              
              {/* Animated ring for available lessons */}
              {lesson.status === 'available' && (
                <>
                  <div className="absolute inset-0 rounded-full border-2 border-yellow-400 animate-ping opacity-75"></div>
                  <div className="absolute inset-0 rounded-full border-1 border-yellow-300 animate-pulse opacity-50"></div>
                </>
              )}
              
              {/* Icon with better positioning */}
              <div className="absolute inset-0 flex items-center justify-center">
                {lesson.status === 'locked' ? (
                  <Lock className="w-8 h-8 text-gray-600" />
                ) : lesson.status === 'completed' ? (
                  <CheckCircle className="w-8 h-8 text-white drop-shadow-lg" />
                ) : (
                  <IconComponent className="w-8 h-8 text-white drop-shadow-lg" />
                )}
              </div>

              {/* Enhanced Level Badge */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-xl border-2 border-yellow-200 group-hover:border-yellow-400 transition-all duration-300">
                <span className="text-sm font-bold text-gray-800">{lesson.id}</span>
              </div>

              {/* Enhanced Stars */}
              {lesson.status !== 'locked' && lesson.stars > 0 && (
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
                  {Array.from({ length: lesson.stars }, (_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 drop-shadow-sm"
                    />
                  ))}
                </div>
              )}

              {/* Completion glow effect */}
              {lesson.status === 'completed' && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/30 to-green-400/30 animate-pulse"></div>
              )}
            </div>

            {/* Enhanced Hover Tooltip with Ewondo */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10">
              <div className="bg-white/98 backdrop-blur-md rounded-2xl px-5 py-4 shadow-2xl border border-white/40 min-w-max max-w-xs">
                <p className="text-sm font-bold text-gray-800 mb-1">
                  {language === 'fr' ? lesson.titleFr : lesson.title}
                </p>
                <p className="text-xs text-orange-600 font-semibold mb-2">
                  {lesson.titleEwondo}
                </p>
                {lesson.status !== 'locked' && (
                  <div className="flex items-center space-x-1 mb-2">
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
                <div className="text-xs text-gray-600">
                  {lesson.status === 'completed' 
                    ? (language === 'fr' ? 'Terminé!' : 'Completed!')
                    : lesson.status === 'available'
                    ? (language === 'fr' ? 'Disponible' : 'Available')
                    : (language === 'fr' ? 'Verrouillé' : 'Locked')
                  }
                </div>
              </div>
              {/* Enhanced tooltip arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-white/98"></div>
            </div>
          </div>
        );
      })}

      {/* African-inspired Character Mascot */}
      <div className="absolute bottom-6 right-6 w-16 h-16 bg-white/98 rounded-full flex items-center justify-center shadow-2xl animate-bounce cursor-pointer hover:scale-110 transition-transform duration-300 border-2 border-yellow-300">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white text-xl">🌍</span>
        </div>
      </div>

      {/* Enhanced progress indicator */}
      <div className="absolute top-4 left-4 bg-white/95 rounded-full px-4 py-2 text-sm font-bold text-gray-800 shadow-xl border border-yellow-200">
        {lessons.filter(l => l.status === 'completed').length}/{lessons.length} {language === 'fr' ? 'Ewondo Terminé' : 'Ewondo Complete'}
      </div>

      {/* Language indicator */}
      <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full px-3 py-1 text-xs font-bold text-white shadow-lg">
        Ewondo
      </div>
    </div>
  );
};

export default DuolingoProgressTree;
