import React from "react";

import "@/app/globals.css";
import { useRouter } from "next/navigation";

import JournalPage from "@/components/pages/JournalPage/JournalPage";
import rootStore from "@/store/RootStore/instance";

const Journal: React.FC = () => {
  const router = useRouter();

  React.useLayoutEffect(() => {
    rootStore.user.checkAuthorization().then(() => {
      if (!rootStore.user.authorized) {
        router.push("/login");
      }
    });
  }, []);

  return <JournalPage />;
};

export default Journal;
