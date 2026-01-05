/* import React from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "antd";

const collectionFilter = (generateCollectionSerachParamsString) => {
  return (
    <fieldset className="w-full flex flex-col items-center gap-4">
      <div>
        <div>
          <Checkbox
            generateCollectionSerachParamsString={
              generateCollectionSerachParamsString
            }
            className="text-white"
          >
            {item.name}
          </Checkbox>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={generateCollectionSerachParamsString(
              "collection",
              "kids clothes"
            )}
          >
            <button
              className="
            px-5 py-2 rounded-full text-sm font-semibold
            bg-purple-600 text-white
            hover:bg-purple-700 transition-all duration-300
            shadow-md hover:shadow-purple-500/40
          "
            >
              kids clothes
            </button>
          </Link>

          <Link
            to={generateCollectionSerachParamsString(
              "collection",
              "mens clothes"
            )}
          >
            <button
              className="
            px-5 py-2 rounded-full text-sm font-semibold
            bg-purple-600 text-white
            hover:bg-purple-700 transition-all duration-300
            shadow-md hover:shadow-purple-500/40
          "
            >
              mens clothes
            </button>
          </Link>

          <Link
            to={generateCollectionSerachParamsString(
              "collection",
              "girls clothes"
            )}
          >
            <button
              className="
            px-5 py-2 rounded-full text-sm font-semibold
            bg-purple-600 text-white
            hover:bg-purple-700 transition-all duration-300
            shadow-md hover:shadow-purple-500/40
          "
            >
              girls clothes
            </button>
          </Link>

          <Link to={generateBrandSearchParamsString("brand", null)}>
            <button
              className="
            px-5 py-2 rounded-full text-sm font-semibold
            border border-purple-400 text-purple-300
            hover:bg-purple-500/20 transition-all duration-300
          "
            >
              All Brands
            </button>
          </Link>
        </div>
      </div>
    </fieldset>
  );
};

export default collectionFilter;
 */
