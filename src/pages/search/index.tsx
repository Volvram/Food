import React from "react";
import "@/app/globals.css";

import SearchPage from "@/components/pages/SearchPage/SearchPage";
import rootStore from "@/store/RootStore/instance";
import { log } from "@/utils/log";

const Search: React.FC = () => {
  React.useLayoutEffect(() => {
    rootStore.user.checkAuthorization().catch((e) => {
      log(e);
    });
  }, []);

  return <SearchPage />;
};

export default Search;
