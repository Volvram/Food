import React from "react";

import "@/app/globals.css";
import { useRouter } from "next/navigation";

import CalendarInvitePage from "@/components/pages/CalendarInvitePage/CalendarInvitePage";
import rootStore from "@/store/RootStore/instance";

const CalendarInvite: React.FC = () => {
  const router = useRouter();

  React.useLayoutEffect(() => {
    rootStore.user.checkAuthorization().catch(() => {
      router.push("/login");
    });
  }, []);

  return <CalendarInvitePage />;
};

export default CalendarInvite;
