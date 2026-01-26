import React from "react";

const CollectionForm = ({ handleSubmit, value, setValue, label }) => {
  return (
    <div className="w-full max-w-md">
      <fieldset className="space-y-4 p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200">
        <label className="block text-lg font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
          {label}
        </label>
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter the new collection name here"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 px-5 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 bg-white/50 backdrop-blur-sm text-lg placeholder-gray-500 transition-all duration-200 shadow-sm hover:shadow-md"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-green-700 transform hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
          >
            + Add Collection
          </button>
        </form>
      </fieldset>
    </div>
  );
};

export default CollectionForm;
