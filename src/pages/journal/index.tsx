import React from "react";

import "@/app/globals.css";
import { useRouter } from "next/navigation";

import JournalPage from "@/components/pages/JournalPage/JournalPage";
import rootStore from "@/store/RootStore/instance";

const Journal: React.FC = () => {
  const router = useRouter();

  // TODO Заменить временную заглушку
  React.useLayoutEffect(() => {
    rootStore.user.checkUserMock();

    if (!rootStore.user.tempUser) {
      router.push("/login");
    }
  }, []);
  // TODO ----------------------

  return <JournalPage />;
};

export default Journal;
