
interface LogoBubbleProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBubbles?: boolean;
}

const LogoBubble = ({ size = 'md', className = '', showBubbles = true }: LogoBubbleProps) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16', 
    lg: 'w-20 h-20',
    xl: 'w-24 h-24'
  };

  const logoSizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16', 
    xl: 'w-20 h-20'
  };

  const bubbleSizes = {
    sm: { large: 'w-2 h-2', medium: 'w-1.5 h-1.5', small: 'w-1 h-1' },
    md: { large: 'w-3 h-3', medium: 'w-2.5 h-2.5', small: 'w-2 h-2' },
    lg: { large: 'w-4 h-4', medium: 'w-3 h-3', small: 'w-2 h-2' },
    xl: { large: 'w-5 h-5', medium: 'w-4 h-4', small: 'w-3 h-3' }
  };

  return (
    <div className={`${sizeClasses[size]} relative ${className}`}>
      <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 shadow-lg">
        <div className="w-[85%] h-[85%] bg-white/95 rounded-full flex items-center justify-center p-1">
          <img 
            src="/lovable-uploads/54bc6f2e-b470-42a0-a685-de2f6c1f6398.png" 
            alt="Lingua Logo" 
            className={`${logoSizeClasses[size]} object-contain`}
          />
        </div>
      </div>
      
      {/* Floating bubbles */}
      {showBubbles && (
        <>
          <div className={`absolute -top-1 -right-1 ${bubbleSizes[size].large} bg-white/20 rounded-full animate-pulse`}></div>
          <div className={`absolute top-2 -left-2 ${bubbleSizes[size].medium} bg-white/15 rounded-full animate-pulse`} style={{animationDelay: '0.5s'}}></div>
          <div className={`absolute -bottom-1 left-1/3 ${bubbleSizes[size].small} bg-white/25 rounded-full animate-pulse`} style={{animationDelay: '1s'}}></div>
        </>
      )}
    </div>
  );
};

export default LogoBubble;
