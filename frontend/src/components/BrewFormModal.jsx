import { useState, useEffect } from "react";
import { BREW_METHODS } from "../api/brews";

const EMPTY = {
  coffeeName: "",
  brewMethod: "",
  coffeeGrams: "",
  waterGrams: "",
  rating: 0,
  tastingNotes: "",
};

export default function BrewFormModal({ brew, onSave, onDelete, onClose }) {
  const isEdit = Boolean(brew);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(
      brew
        ? {
            coffeeName: brew.coffeeName,
            brewMethod: brew.brewMethod,
            coffeeGrams: brew.coffeeGrams,
            waterGrams: brew.waterGrams,
            rating: brew.rating,
            tastingNotes: brew.tastingNotes,
          }
        : EMPTY
    );
    setError("");
  }, [brew]);

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.coffeeName.trim() ||
      !form.brewMethod ||
      form.coffeeGrams === "" ||
      form.waterGrams === "" ||
      !form.tastingNotes.trim()
    ) {
      setError("Please fill in every field before saving.");
      return;
    }

    onSave({
      coffeeName: form.coffeeName.trim(),
      brewMethod: form.brewMethod,
      coffeeGrams: Number(form.coffeeGrams),
      waterGrams: Number(form.waterGrams),
      rating: Number(form.rating),
      tastingNotes: form.tastingNotes.trim(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-[#FAF3E8] w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-2xl text-[#3B2417]">
            {isEdit ? "Edit a brew" : "Add a brew"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-2xl leading-none text-[#3B2417]"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-mono text-[#3B2417] mb-1">
              Beans
            </label>
            <input
              type="text"
              value={form.coffeeName}
              onChange={update("coffeeName")}
              className="w-full border border-[#E4D6BE] rounded-lg px-3 py-2 bg-white text-[#3B2417] focus:outline-none focus:ring-2 focus:ring-[#9C4A2B]"
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-[#3B2417] mb-1">
              Method
            </label>
            <select
              value={form.brewMethod}
              onChange={update("brewMethod")}
              className="w-full border border-[#E4D6BE] rounded-lg px-3 py-2 bg-white text-[#3B2417] focus:outline-none focus:ring-2 focus:ring-[#9C4A2B]"
            >
              <option value="">Select a method</option>
              {BREW_METHODS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-mono text-[#3B2417] mb-1">
                Coffee grams
              </label>
              <input
                type="number"
                min="1"
                value={form.coffeeGrams}
                onChange={update("coffeeGrams")}
                className="w-full border border-[#E4D6BE] rounded-lg px-3 py-2 bg-white text-[#3B2417] focus:outline-none focus:ring-2 focus:ring-[#9C4A2B]"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-mono text-[#3B2417] mb-1">
                Water grams
              </label>
              <input
                type="number"
                min="1"
                value={form.waterGrams}
                onChange={update("waterGrams")}
                className="w-full border border-[#E4D6BE] rounded-lg px-3 py-2 bg-white text-[#3B2417] focus:outline-none focus:ring-2 focus:ring-[#9C4A2B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-mono text-[#3B2417] mb-1">
              Rating (out of 5)
            </label>
            <input
              type="number"
              min="0"
              max="5"
              value={form.rating}
              onChange={update("rating")}
              className="w-full border border-[#E4D6BE] rounded-lg px-3 py-2 bg-white text-[#3B2417] focus:outline-none focus:ring-2 focus:ring-[#9C4A2B]"
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-[#3B2417] mb-1">
              Tasting notes
            </label>
            <input
              type="text"
              value={form.tastingNotes}
              onChange={update("tastingNotes")}
              className="w-full border border-[#E4D6BE] rounded-lg px-3 py-2 bg-white text-[#3B2417] focus:outline-none focus:ring-2 focus:ring-[#9C4A2B]"
            />
          </div>

          {error && <p className="text-sm text-[#B5493D]">{error}</p>}

          <div className="flex gap-3 pt-2">
            {isEdit && (
              <button
                type="button"
                onClick={() => onDelete(brew.id)}
                className="flex-1 bg-[#B5493D] text-white rounded-full py-2.5 font-medium"
              >
                Delete
              </button>
            )}
            <button
              type="submit"
              className="flex-1 bg-[#3B2417] text-white rounded-full py-2.5 font-medium"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}