import React from "react";

const CollectionForm = ({ handleSubmit, value, setValue }) => {
  return (
    <div>
      <fieldset className="w-full space-y-1 dark:text-gray-400 text-2xl">
        <label className="block font-medium underline">
          create a new collection
        </label>
        <form className="flex" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="enter the new collections name here"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex flex-1 border sm:text-sm rounded-r-md focus:ring-inset dark:border-gray-300 dark:text-gray-800 dark:bg-gray-100 focus:dark:ring-violet-600"
          />
          <button type="submit" className="bg-green-500 text-black">
            submit collection
          </button>
        </form>
      </fieldset>
    </div>
  );
};

export default CollectionForm;
