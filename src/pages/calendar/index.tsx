import React from "react";

import "@/app/globals.css";
import { useRouter } from "next/navigation";

import CalendarPage from "@/components/pages/CalendarPage/CalendarPage";
import rootStore from "@/store/RootStore/instance";

const Calendar: React.FC = () => {
  const router = useRouter();

  // TODO Заменить временную заглушку
  React.useLayoutEffect(() => {
    rootStore.user.checkUserMock();

    if (!rootStore.user.tempUser) {
      router.push("/login");
    }
  }, []);
  // TODO ----------------------

  return <CalendarPage />;
};

export default Calendar;
