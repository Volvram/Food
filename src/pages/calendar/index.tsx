import React from "react";

import "@/app/globals.css";
import { useRouter } from "next/navigation";

import CalendarPage from "@/components/pages/CalendarPage/CalendarPage";
import rootStore from "@/store/RootStore/instance";

const Calendar: React.FC = () => {
  const router = useRouter();

  React.useLayoutEffect(() => {
    rootStore.user.checkAuthorization().then(() => {
      if (!rootStore.user.authorized) {
        router.push("/login");
      }
    });
  }, []);

  return <CalendarPage />;
};

export default Calendar;
