
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
    <div className={`flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b border-gray-100 ${className}`}>
      <div className="flex items-center space-x-3">
        {showBack && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBack}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
        
        <LogoBubble size="sm" showBubbles={false} />
        
        {title && (
          <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
        )}
      </div>

      {showSettings && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/settings')}
          className="p-2"
        >
          <Settings className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};

export default Header;
