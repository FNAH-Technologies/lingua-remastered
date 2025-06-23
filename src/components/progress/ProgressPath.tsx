
const ProgressPath = () => {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="pathGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="rgba(251, 146, 60, 0.6)" />
          <stop offset="50%" stopColor="rgba(245, 158, 11, 0.4)" />
          <stop offset="100%" stopColor="rgba(34, 197, 94, 0.8)" />
        </linearGradient>
      </defs>
      <path
        d="M 50 85 Q 35 75 25 70 Q 55 55 75 60 Q 45 50 40 45 Q 55 35 65 30 Q 45 25 35 15"
        stroke="url(#pathGradient)"
        strokeWidth="2"
        strokeDasharray="5,3"
        fill="none"
        className="animate-pulse"
        style={{ animationDuration: '4s' }}
      />
    </svg>
  );
};

export default ProgressPath;
