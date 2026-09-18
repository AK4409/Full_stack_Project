interface BadgeProps {
  text: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'gray';
  size?: 'sm' | 'md';
}

const variantClasses: Record<string, string> = {
  primary: 'bg-indigo-100 text-indigo-700 border border-indigo-200',
  success: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  warning: 'bg-amber-100 text-amber-700 border border-amber-200',
  danger:  'bg-red-100 text-red-700 border border-red-200',
  info:    'bg-sky-100 text-sky-700 border border-sky-200',
  gray:    'bg-gray-100 text-gray-600 border border-gray-200',
};

const levelVariantMap: Record<string, string> = {
  Beginner:     'success',
  Intermediate: 'warning',
  Advanced:     'danger',
  published:    'success',
  draft:        'gray',
};

function Badge({ text, variant, size = 'sm' }: BadgeProps) {
  const resolvedVariant = variant ?? levelVariantMap[text] ?? 'gray';
  const sizeClass = size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1';
  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${sizeClass} ${variantClasses[resolvedVariant]}`}>
      {text}
    </span>
  );
}

export default Badge;
