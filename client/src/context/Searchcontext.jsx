import { useState, createContext } from "react";

const Searchcontext = createContext();
/* const Searchcontext = createContext({
  search: {
    keyword: "",
    results: [],
  },
  setSearch: () => {},
}); */

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState({
    keyword: "",
    results: [],
  });
  return (
    <Searchcontext.Provider value={[search, setSearch]}>
      {children}
    </Searchcontext.Provider>
  );
};

export default Searchcontext;
