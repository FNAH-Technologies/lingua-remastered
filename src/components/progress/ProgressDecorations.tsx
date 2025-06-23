
const ProgressDecorations = () => {
  return (
    <div className="absolute inset-0">
      <div className="absolute top-8 left-8 w-6 h-6 bg-orange-300/40 rounded-full animate-pulse"></div>
      <div className="absolute top-16 right-12 w-4 h-4 bg-yellow-400/60 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-12 w-5 h-5 bg-amber-400/50 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-32 right-16 w-3 h-3 bg-orange-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
    </div>
  );
};

export default ProgressDecorations;
