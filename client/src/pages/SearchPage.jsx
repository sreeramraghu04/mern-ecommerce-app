// import React, { useContext } from "react";
// import Searchcontext from "../context/Searchcontext";
// import { Link } from "react-router-dom";

// const SearchPage = () => {
//   const searchContext = useContext(Searchcontext);

//   /* const { values, setValues } = useContext(Searchcontext); */
//   const [search, setSearch] = searchContext;

//   return (
//     <div className="bg-gray-400 min-h-screen p-5">
//       <h1 className="text-xl font-bold mb-2">Search results</h1>

//       <p>
//         {/* {values?.results.length < 1 ? "No products found" : found ${values?.results.length}} */}
//         {search?.results?.length < 1
//           ? "No products found"
//           : `Found ${search?.results.length} products`}
//       </p>

//       <div className="grid grid-cols-3 gap-4 mt-4">
//         {/* {values?.results.map((item) => ( */}
//         {search?.results?.map((item) => (
//           <div key={item._id} className="bg-white p-3 rounded">
//             <img
//               src={`http://localhost:5000/api/v1/product/get-product-image/${item._id}`}
//               alt={item.name}
//               className="h-40 w-full object-cover"
//             />
//             <div>
//               <h5 className="font-semibold">{item.name}</h5>
//               <p>{item.description.substring(0, 30)}...</p>
//               <p>₹ {item.price}</p>
//               <Link to="/get-product/:slug">
//                 <button className="mr-2">More details</button>
//               </Link>
//               <button>Add to cart</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchPage;

import React, { useContext } from "react";
import Searchcontext from "../context/Searchcontext";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [search] = useContext(Searchcontext);

  return (
    <div className="bg-gray-400 min-h-screen p-5">
      <h1 className="text-xl font-bold mb-2">Search results</h1>

      <p>
        {search?.results?.length < 1
          ? "No products found"
          : `Found ${search?.results.length} products`}
      </p>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {search?.results?.map((item) => (
          <div key={item._id} className="bg-white p-3 rounded">
            <img
              src={`http://localhost:5000/api/v1/product/get-product-image/${item._id}`}
              alt={item.name}
              className="h-40 w-full object-cover"
            />

            <h5 className="font-semibold">{item.name}</h5>
            <p>{item.description.substring(0, 30)}...</p>
            <p>₹ {item.price}</p>

            {item.slug ? (
              <Link to={`/product/${item.slug}`}>
                <button className="mr-2">More details</button>
              </Link>
            ) : (
              <button disabled className="opacity-50">
                No details
              </button>
            )}

            <button>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
