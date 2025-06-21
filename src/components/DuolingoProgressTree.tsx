
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

  // Generate SVG path for the winding trail
  const generatePath = () => {
    const sortedLessons = [...lessons].sort((a, b) => b.position.y - a.position.y);
    let path = `M ${sortedLessons[0].position.x} ${sortedLessons[0].position.y}`;
    
    for (let i = 1; i < sortedLessons.length; i++) {
      const curr = sortedLessons[i];
      const prev = sortedLessons[i - 1];
      
      // Create smooth curves between points
      const midY = (prev.position.y + curr.position.y) / 2;
      path += ` Q ${prev.position.x} ${midY} ${curr.position.x} ${curr.position.y}`;
    }
    
    return path;
  };

  return (
    <div className="relative w-full h-96 bg-gradient-to-b from-green-400 via-blue-400 to-purple-500 rounded-3xl overflow-hidden shadow-lg">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-6 h-6 bg-white/20 rounded-full animate-float"></div>
        <div className="absolute top-20 right-16 w-4 h-4 bg-yellow-300/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-16 left-16 w-5 h-5 bg-pink-300/25 rounded-full animate-bounce"></div>
        <div className="absolute bottom-24 right-20 w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
      </div>

      {/* SVG Trail */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="trailGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
          </linearGradient>
        </defs>
        <path
          d={generatePath()}
          stroke="url(#trailGradient)"
          strokeWidth="0.8"
          strokeDasharray="2,1"
          fill="none"
          className="animate-pulse"
        />
      </svg>

      {/* Lesson Nodes */}
      {lessons.map((lesson) => {
        const IconComponent = lesson.icon;
        
        return (
          <div
            key={lesson.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110"
            style={{
              left: `${lesson.position.x}%`,
              top: `${lesson.position.y}%`
            }}
            onClick={() => handleLessonClick(lesson)}
          >
            {/* Node Circle */}
            <div className={`relative w-14 h-14 rounded-full border-4 border-white shadow-lg transition-all duration-300 ${
              lesson.status === 'locked'
                ? 'bg-gray-400'
                : lesson.status === 'completed'
                ? `bg-gradient-to-br ${lesson.color}`
                : `bg-gradient-to-br ${lesson.color}`
            } ${lesson.status !== 'locked' ? 'hover:shadow-xl hover:scale-105' : ''}`}>
              
              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                {lesson.status === 'locked' ? (
                  <Lock className="w-6 h-6 text-gray-600" />
                ) : lesson.status === 'completed' ? (
                  <CheckCircle className="w-6 h-6 text-white" />
                ) : (
                  <IconComponent className="w-6 h-6 text-white" />
                )}
              </div>

              {/* Level Badge */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-gray-100">
                <span className="text-xs font-bold text-gray-800">{lesson.id}</span>
              </div>

              {/* Stars */}
              {lesson.status !== 'locked' && lesson.stars > 0 && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
                  {Array.from({ length: lesson.stars }, (_, i) => (
                    <Star
                      key={i}
                      className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Hover Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-white/20 min-w-max">
                <p className="text-xs font-semibold text-gray-800">
                  {language === 'fr' ? lesson.titleFr : lesson.title}
                </p>
                {lesson.status !== 'locked' && (
                  <div className="flex items-center space-x-1 mt-1">
                    {Array.from({ length: lesson.maxStars }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-2 h-2 ${
                          i < lesson.stars
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Character Mascot */}
      <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg animate-bounce">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">🦜</span>
        </div>
      </div>
    </div>
  );
};

export default DuolingoProgressTree;
