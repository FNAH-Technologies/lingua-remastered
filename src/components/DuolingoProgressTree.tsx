
import { MessageCircle, Hash, Users, Clock, Palette, Utensils } from 'lucide-react';
import LessonNode from './progress/LessonNode';
import ProgressPath from './progress/ProgressPath';
import ProgressIndicator from './progress/ProgressIndicator';
import ProgressMascot from './progress/ProgressMascot';
import ProgressDecorations from './progress/ProgressDecorations';

interface LessonNodeData {
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
  const lessons: LessonNodeData[] = [
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

  const completedLessons = lessons.filter(l => l.status === 'completed').length;

  return (
    <div className="relative w-full h-[400px] bg-gradient-to-br from-orange-100 via-yellow-50 to-amber-100 rounded-3xl overflow-hidden">
      {/* Decorative Elements */}
      <ProgressDecorations />

      {/* Connecting Path */}
      <ProgressPath />

      {/* Lesson Nodes */}
      {lessons.map((lesson) => (
        <LessonNode
          key={lesson.id}
          {...lesson}
        />
      ))}

      {/* Progress Indicator */}
      <ProgressIndicator 
        completedLessons={completedLessons} 
        totalLessons={lessons.length} 
      />

      {/* Mascot */}
      <ProgressMascot />
    </div>
  );
};

export default DuolingoProgressTree;
