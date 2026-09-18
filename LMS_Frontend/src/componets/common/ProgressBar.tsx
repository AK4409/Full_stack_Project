interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  showPercent?: boolean;
  color?: 'indigo' | 'emerald' | 'amber' | 'rose';
  height?: 'sm' | 'md' | 'lg';
}

const colorClasses: Record<string, string> = {
  indigo:  'bg-indigo-500',
  emerald: 'bg-emerald-500',
  amber:   'bg-amber-500',
  rose:    'bg-rose-500',
};

const heightClasses: Record<string, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

function ProgressBar({
  value,
  label,
  showPercent = true,
  color = 'indigo',
  height = 'md',
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs font-medium text-gray-600">{label}</span>}
          {showPercent && <span className="text-xs font-bold text-gray-700">{clamped}%</span>}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${heightClasses[height]}`}>
        <div
          className={`${colorClasses[color]} ${heightClasses[height]} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
