import RatingStamp from "./RatingStamp";

export default function BrewListItem({ brew, onEdit }) {
  return (
    <div className="flex items-center gap-3 py-4 border-b border-[#E4D6BE] last:border-b-0">
      <RatingStamp rating={brew.rating} />

      <div className="flex-1 min-w-0">
        <h3 className="font-serif text-lg text-[#3B2417] truncate">
          {brew.coffeeName}
        </h3>
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          <span className="text-xs font-mono px-2 py-0.5 rounded-full border border-[#E4D6BE] text-[#3B2417]">
            {brew.brewMethod}
          </span>
          <span className="text-xs font-mono px-2 py-0.5 rounded-full border border-[#E4D6BE] text-[#3B2417]">
            🌱 {brew.coffeeGrams}g
          </span>
          <span className="text-xs font-mono px-2 py-0.5 rounded-full border border-[#E4D6BE] text-[#3B2417]">
            💧 {brew.waterGrams}g
          </span>
        </div>
      </div>

      <button
        onClick={() => onEdit(brew)}
        aria-label={`Edit ${brew.coffeeName}`}
        className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg border border-[#E4D6BE] hover:bg-[#F0E5D2] transition-colors"
      >
        ✏️
      </button>
    </div>
  );
}