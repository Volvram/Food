import React from "react";

import "@/app/globals.css";
import { useRouter } from "next/navigation";

import ProfilePage from "@/components/pages/ProfilePage/ProfilePage";
import rootStore from "@/store/RootStore/instance";

const Profile: React.FC = () => {
  const router = useRouter();

  React.useLayoutEffect(() => {
    rootStore.user.checkAuthorization().catch(() => {
      router.push("/login");
    });
  }, []);
  return <ProfilePage />;
};

export default Profile;
