
import { ArrowLeft, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LogoBubble from './LogoBubble';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showSettings?: boolean;
  onBack?: () => void;
  className?: string;
}

const Header = ({ title, showBack = false, showSettings = false, onBack, className = '' }: HeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={`flex items-center justify-between p-4 glass-ios border-b border-white/20 safe-top ${className}`}>
      <div className="flex items-center space-x-3">
        {showBack && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBack}
            className="p-3 rounded-full hover:bg-white/20 active:scale-95 transition-all duration-200 ripple-ios"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
          </Button>
        )}
        
        <LogoBubble size="sm" showBubbles={false} />
        
        {title && (
          <h1 className="text-xl font-semibold text-gray-800 tracking-tight">{title}</h1>
        )}
      </div>

      {showSettings && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/settings')}
          className="p-3 rounded-full hover:bg-white/20 active:scale-95 transition-all duration-200 ripple-ios"
        >
          <Settings className="w-5 h-5" strokeWidth={2.5} />
        </Button>
      )}
    </div>
  );
};

export default Header;
