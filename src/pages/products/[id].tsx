import React from "react";

import { useRouter } from "next/router";

import "@/app/globals.css";
import ProductPage from "@/components/pages/ProductPage/ProductPage";
import rootStore from "@/store/RootStore/instance";
import { log } from "@/utils/log";

const Product: React.FC = () => {
  const router = useRouter();

  React.useLayoutEffect(() => {
    rootStore.user.checkAuthorization().catch((e) => {
      log(e);
    });
  }, []);

  return <ProductPage id={router.query.id} />;
};

export default Product;
