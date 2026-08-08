import BrewListItem from "./BrewListItem";
import { BREW_METHODS } from "../api/brews";

export default function BrewLog({
  brews,
  loading,
  error,
  filterMethod,
  onFilterChange,
  onAdd,
  onEdit,
}) {
  return (
    <div className="max-w-md mx-auto sm:max-w-lg px-4 py-6 sm:py-10">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-serif text-3xl text-[#3B2417]">Brew log</h1>
        <button
          onClick={onAdd}
          className="bg-[#3B2417] text-white rounded-full px-5 py-2 font-medium"
        >
          Add
        </button>
      </div>

      <select
        value={filterMethod}
        onChange={(e) => onFilterChange(e.target.value)}
        className="w-full border border-[#E4D6BE] rounded-lg px-3 py-2 bg-white text-[#3B2417] mb-5 focus:outline-none focus:ring-2 focus:ring-[#9C4A2B]"
      >
        <option value="">Filter by method</option>
        {BREW_METHODS.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <div className="bg-white rounded-2xl px-4 sm:px-5 shadow-sm">
        {loading && <p className="py-6 text-[#3B2417]">Loading brews...</p>}
        {error && <p className="py-6 text-[#B5493D]">{error}</p>}
        {!loading && !error && brews.length === 0 && (
          <p className="py-6 text-[#3B2417]">No brews logged yet — add one above.</p>
        )}
        {!loading &&
          !error &&
          brews.map((brew) => (
            <BrewListItem key={brew.id} brew={brew} onEdit={onEdit} />
          ))}
      </div>
    </div>
  );
}