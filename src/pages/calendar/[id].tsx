import React from "react";

import { useRouter } from "next/router";

import "@/app/globals.css";
import CalendarContentPage from "@/components/pages/CalendarPage/components/CalendarContentPage/CalendarContentPage";
import rootStore from "@/store/RootStore/instance";
import { log } from "@/utils/log";

const CalendarContent: React.FC = () => {
  const router = useRouter();

  React.useLayoutEffect(() => {
    rootStore.user.checkAuthorization().catch((e) => {
      log(e);
    });
  }, []);

  return <CalendarContentPage id={router.query.id} />;
};

export default CalendarContent;
