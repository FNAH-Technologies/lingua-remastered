
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
        {/* Logo/Icon */}
        <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center animate-bounce-in">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-orange-500">L</span>
          </div>
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
