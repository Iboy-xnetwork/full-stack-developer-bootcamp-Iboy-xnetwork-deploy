function ratingColor(rating) {
  if (rating >= 4) return "#4B7B4E"; // green
  if (rating === 3) return "#C7862B"; // amber
  return "#B5493D"; // red
}

export default function RatingStamp({ rating }) {
  return (
    <div
      className="flex items-center justify-center w-10 h-10 rounded-full text-white font-mono font-bold shrink-0"
      style={{ backgroundColor: ratingColor(rating) }}
    >
      {rating}
    </div>
  );
}