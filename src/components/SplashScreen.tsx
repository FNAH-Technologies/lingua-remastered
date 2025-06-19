
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
        {/* Logo with bubble container */}
        <div className="w-32 h-32 mx-auto relative animate-bounce-in">
          <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 shadow-2xl">
            <div className="w-24 h-24 bg-white/90 rounded-full flex items-center justify-center p-2">
              <img 
                src="/lovable-uploads/54bc6f2e-b470-42a0-a685-de2f6c1f6398.png" 
                alt="Lingua Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          {/* Floating bubbles around logo */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute top-4 -left-3 w-3 h-3 bg-white/15 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute -bottom-1 left-6 w-2 h-2 bg-white/25 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        {/* App Title */}
        {showTitle && (
          <h1 className="text-5xl font-bold animate-slide-up">
            Lingua
          </h1>
        )}

        {/* Subtitle */}
        {showSubtitle && (
          <p className="text-xl opacity-90 animate-slide-up">
            Découvrez les langues du Cameroun
          </p>
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
