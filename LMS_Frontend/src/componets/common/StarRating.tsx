import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

function StarRating({ rating, max = 5, size = 'sm', showValue = false }: StarRatingProps) {
  const sizeClass = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  }[size];

  const stars = Array.from({ length: max }, (_, i) => {
    const filled = i + 1 <= Math.floor(rating);
    const half = !filled && i + 0.5 < rating;
    return { filled, half };
  });

  return (
    <span className={`inline-flex items-center gap-1 ${sizeClass}`}>
      {stars.map((star, i) => (
        <span key={i} className="text-amber-400">
          {star.filled ? <FaStar /> : star.half ? <FaStarHalfAlt /> : <FaRegStar />}
        </span>
      ))}
      {showValue && (
        <span className="text-gray-600 font-semibold ml-1">{rating.toFixed(1)}</span>
      )}
    </span>
  );
}

export default StarRating;
