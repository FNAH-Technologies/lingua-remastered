
interface ProgressIndicatorProps {
  completedLessons: number;
  totalLessons: number;
}

const ProgressIndicator = ({ completedLessons, totalLessons }: ProgressIndicatorProps) => {
  return (
    <div className="absolute top-4 left-4 bg-white/90 rounded-full px-3 py-2 text-sm font-bold text-gray-800 shadow-lg">
      {completedLessons}/{totalLessons} Ewondo
    </div>
  );
};

export default ProgressIndicator;
