import React from "react";

import "@/app/globals.css";
import { useRouter } from "next/router";

import ProfilePage from "@/components/pages/ProfilePage/ProfilePage";
import rootStore from "@/store/RootStore/instance";

const Profile: React.FC = () => {
  const router = useRouter();

  // TODO Заменить временную заглушку
  React.useEffect(() => {
    rootStore.user.checkUserMock();

    if (!rootStore.user.tempUser) {
      router.push("/login");
    }
  }, []);
  // TODO ----------------------
  return <ProfilePage />;
};

export default Profile;
