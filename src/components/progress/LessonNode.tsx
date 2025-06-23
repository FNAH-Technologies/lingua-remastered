
import { Lock, Star, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface LessonNodeProps {
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

const LessonNode = ({ 
  id, 
  title, 
  titleFr, 
  titleEwondo, 
  status, 
  stars, 
  icon: IconComponent, 
  color, 
  position 
}: LessonNodeProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const handleClick = () => {
    if (status !== 'locked') {
      navigate(`/lesson/${id}`);
    }
  };

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 group"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`
      }}
      onClick={handleClick}
    >
      {/* Node Circle */}
      <div className={`relative w-16 h-16 rounded-full border-3 border-white shadow-xl transition-all duration-300 ${
        status === 'locked'
          ? 'bg-gray-300'
          : status === 'completed'
          ? `bg-gradient-to-br ${color}`
          : `bg-gradient-to-br ${color}`
      } ${status !== 'locked' ? 'hover:shadow-2xl group-hover:scale-110' : ''}`}>
        
        {/* Animated ring for available lessons */}
        {status === 'available' && (
          <div className="absolute inset-0 rounded-full border-2 border-yellow-400 animate-ping opacity-75"></div>
        )}
        
        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          {status === 'locked' ? (
            <Lock className="w-6 h-6 text-gray-500" />
          ) : status === 'completed' ? (
            <CheckCircle className="w-6 h-6 text-white" />
          ) : (
            <IconComponent className="w-6 h-6 text-white" />
          )}
        </div>

        {/* Level Badge */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-orange-200">
          <span className="text-xs font-bold text-gray-800">{id}</span>
        </div>

        {/* Stars */}
        {status !== 'locked' && stars > 0 && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
            {Array.from({ length: stars }, (_, i) => (
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
            {language === 'fr' ? titleFr : title}
          </p>
          <p className="text-xs text-orange-600 font-medium">
            {titleEwondo}
          </p>
          <div className="text-xs text-gray-600 mt-1">
            {status === 'completed' 
              ? (language === 'fr' ? 'Terminé!' : 'Completed!')
              : status === 'available'
              ? (language === 'fr' ? 'Disponible' : 'Available')
              : (language === 'fr' ? 'Verrouillé' : 'Locked')
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonNode;
