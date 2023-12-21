import React from "react";
import "@/app/globals.css";

import SearchPage from "@/components/pages/SearchPage/SearchPage";
import rootStore from "@/store/RootStore/instance";

const Search: React.FC = () => {
  // TODO Заменить временную заглушку
  React.useEffect(() => {
    rootStore.user.checkUserMock();
  }, []);
  // TODO ----------------------
  return <SearchPage />;
};

export default Search;
