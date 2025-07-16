
import { useEffect, useState } from 'react';

const SplashScreen = () => {
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    const titleTimer = setTimeout(() => setShowTitle(true), 500);
    const subtitleTimer = setTimeout(() => setShowSubtitle(true), 1200);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(subtitleTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-lingua-gradient flex flex-col items-center justify-center text-white">
      <div className="text-center space-y-8">
        {/* Enhanced Logo with proper bubble container and sizing */}
        <div className="w-32 h-32 mx-auto relative animate-bounce-in">
          <div className="w-full h-full bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30 relative overflow-hidden">
            {/* Inner glow effect */}
            <div className="absolute inset-2 bg-white/20 rounded-full"></div>
            {/* Logo with proper sizing to fill the container */}
            <div className="w-20 h-20 relative z-10 flex items-center justify-center">
              <img 
                src="/-uploads/54bc6f2e-b470-42a0-a685-de2f6c1f6398.png" 
                alt="Lingua Logo" 
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
            </div>
          </div>
          {/* Enhanced floating bubbles with better positioning */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-300/60 rounded-full animate-pulse shadow-lg"></div>
          <div className="absolute top-3 -left-3 w-3 h-3 bg-orange-400/50 rounded-full animate-pulse shadow-md" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute -bottom-2 right-2 w-2 h-2 bg-red-400/60 rounded-full animate-pulse shadow-sm" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1 -left-2 w-2.5 h-2.5 bg-orange-200/70 rounded-full animate-pulse shadow-sm" style={{animationDelay: '1.5s'}}></div>
        </div>

        {/* App Title */}
        {showTitle && (
          <h1 className="text-6xl font-bold animate-slide-up text-white drop-shadow-lg">
            Lingua
          </h1>
        )}

        {/* Subtitle */}
        {showSubtitle && (
          <p className="text-2xl font-medium text-white/95 animate-slide-up drop-shadow-md">
            Découvrez les langues du Cameroun
          </p>
        )}

        {/* Welcome message for new visitors */}
        {showSubtitle && (
          <div className="mt-6 animate-slide-up">
            <p className="text-lg text-white/90 font-medium mb-2 drop-shadow-sm">
              Bienvenue dans votre voyage linguistique
            </p>
            <p className="text-base text-white/80 drop-shadow-sm">
              Apprenez les langues ethniques du Cameroun de manière interactive
            </p>
          </div>
        )}

        {/* Loading indicator */}
        <div className="flex justify-center space-x-2 mt-12">
          <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
