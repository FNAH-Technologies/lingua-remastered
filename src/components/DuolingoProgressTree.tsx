
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, Star, Play, CheckCircle, MessageCircle, Package, Coffee, Clock, Palette, Utensils, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface LessonNode {
  id: string;
  title: string;
  titleFr: string;
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
      title: 'Basic Communication',
      titleFr: 'Communication de base',
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
      status: 'completed',
      stars: 2,
      maxStars: 3,
      icon: Package,
      color: 'from-blue-500 to-cyan-600',
      position: { x: 30, y: 75 }
    },
    {
      id: '3',
      title: 'Family & People',
      titleFr: 'Famille et personnes',
      status: 'available',
      stars: 1,
      maxStars: 3,
      icon: Home,
      color: 'from-purple-500 to-pink-600',
      position: { x: 70, y: 65 }
    },
    {
      id: '4',
      title: 'Daily Activities',
      titleFr: 'Activités quotidiennes',
      status: 'available',
      stars: 0,
      maxStars: 3,
      icon: Clock,
      color: 'from-orange-500 to-red-600',
      position: { x: 40, y: 50 }
    },
    {
      id: '5',
      title: 'Colors & Descriptions',
      titleFr: 'Couleurs et descriptions',
      status: 'locked',
      stars: 0,
      maxStars: 3,
      icon: Palette,
      color: 'from-pink-500 to-rose-600',
      position: { x: 65, y: 35 }
    },
    {
      id: '6',
      title: 'Food & Dining',
      titleFr: 'Nourriture et repas',
      status: 'locked',
      stars: 0,
      maxStars: 3,
      icon: Utensils,
      color: 'from-indigo-500 to-purple-600',
      position: { x: 35, y: 20 }
    },
    {
      id: '7',
      title: 'Shopping',
      titleFr: 'Achats',
      status: 'locked',
      stars: 0,
      maxStars: 3,
      icon: Coffee,
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
    <div className="relative w-full h-[450px] bg-gradient-to-b from-green-400 via-blue-400 to-purple-500 rounded-3xl overflow-hidden shadow-xl">
      {/* Enhanced background with floating elements */}
      <div className="absolute inset-0">
        {/* Floating decorative elements */}
        <div className="absolute top-8 left-8 w-8 h-8 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-16 right-12 w-6 h-6 bg-yellow-300/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-12 w-7 h-7 bg-pink-300/35 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '2.5s' }}></div>
        <div className="absolute bottom-32 right-16 w-5 h-5 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-cyan-300/30 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '4s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-6 h-6 bg-emerald-300/25 rounded-full animate-pulse" style={{ animationDelay: '2.5s' }}></div>
        
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
      </div>

      {/* Enhanced SVG Trail with glow effect */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="trailGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.5)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path
          d={generatePath()}
          stroke="url(#trailGradient)"
          strokeWidth="1.2"
          strokeDasharray="3,2"
          fill="none"
          filter="url(#glow)"
          className="animate-pulse"
          style={{ animationDuration: '4s' }}
        />
      </svg>

      {/* Lesson Nodes with enhanced interactions */}
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
            {/* Node Circle with enhanced styling */}
            <div className={`relative w-16 h-16 rounded-full border-4 border-white shadow-xl transition-all duration-300 ${
              lesson.status === 'locked'
                ? 'bg-gray-400 shadow-gray-300/50'
                : lesson.status === 'completed'
                ? `bg-gradient-to-br ${lesson.color} shadow-green-400/30`
                : `bg-gradient-to-br ${lesson.color} shadow-blue-400/30`
            } ${lesson.status !== 'locked' ? 'hover:shadow-2xl hover:scale-105 group-hover:border-yellow-300' : ''}`}>
              
              {/* Animated ring for available lessons */}
              {lesson.status === 'available' && (
                <div className="absolute inset-0 rounded-full border-2 border-yellow-300 animate-ping opacity-75"></div>
              )}
              
              {/* Icon with better positioning */}
              <div className="absolute inset-0 flex items-center justify-center">
                {lesson.status === 'locked' ? (
                  <Lock className="w-7 h-7 text-gray-600" />
                ) : lesson.status === 'completed' ? (
                  <CheckCircle className="w-7 h-7 text-white drop-shadow-lg" />
                ) : (
                  <IconComponent className="w-7 h-7 text-white drop-shadow-lg" />
                )}
              </div>

              {/* Enhanced Level Badge */}
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-100 group-hover:border-yellow-300 transition-all duration-300">
                <span className="text-xs font-bold text-gray-800">{lesson.id}</span>
              </div>

              {/* Enhanced Stars */}
              {lesson.status !== 'locked' && lesson.stars > 0 && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
                  {Array.from({ length: lesson.stars }, (_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-yellow-400 text-yellow-400 drop-shadow-sm"
                    />
                  ))}
                </div>
              )}

              {/* Completion glow effect */}
              {lesson.status === 'completed' && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/20 to-green-400/20 animate-pulse"></div>
              )}
            </div>

            {/* Enhanced Hover Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-xl border border-white/30 min-w-max">
                <p className="text-sm font-bold text-gray-800">
                  {language === 'fr' ? lesson.titleFr : lesson.title}
                </p>
                {lesson.status !== 'locked' && (
                  <div className="flex items-center space-x-1 mt-1.5">
                    {Array.from({ length: lesson.maxStars }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-2.5 h-2.5 ${
                          i < lesson.stars
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
                <div className="text-xs text-gray-600 mt-1">
                  {lesson.status === 'completed' 
                    ? (language === 'fr' ? 'Terminé!' : 'Completed!')
                    : lesson.status === 'available'
                    ? (language === 'fr' ? 'Disponible' : 'Available')
                    : (language === 'fr' ? 'Verrouillé' : 'Locked')
                  }
                </div>
              </div>
              {/* Tooltip arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/95"></div>
            </div>
          </div>
        );
      })}

      {/* Enhanced Character Mascot */}
      <div className="absolute bottom-6 right-6 w-14 h-14 bg-white/95 rounded-full flex items-center justify-center shadow-xl animate-bounce cursor-pointer hover:scale-110 transition-transform duration-300">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white text-lg">🦜</span>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="absolute top-4 left-4 bg-white/90 rounded-full px-3 py-1 text-xs font-semibold text-gray-800 shadow-lg">
        {lessons.filter(l => l.status === 'completed').length}/{lessons.length} {language === 'fr' ? 'Terminé' : 'Complete'}
      </div>
    </div>
  );
};

export default DuolingoProgressTree;
