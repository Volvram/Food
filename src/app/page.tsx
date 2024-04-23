"use client";
import React from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import styles from "./page.module.scss";
import qualityIcon from "@/assets/img/quality.png";
import securityIcon from "@/assets/img/security.png";
import supportIcon from "@/assets/img/support.png";
import { CompleteAltRegister } from "@/components/CompleteAltRegister";
import Header from "@/components/Header/Header";
import WithModal from "@/components/WithModal/WithModal";
import rootStore from "@/store/RootStore/instance";
import { log } from "@/utils/log";
import { useAuthCode } from "@/utils/useAuthCode";

export default function Home() {
  const router = useRouter();
  const [needsRegister, setNeedsRegister, userEmail] = useAuthCode();

  React.useEffect(() => {
    if (!needsRegister) {
      rootStore.user.checkAuthorization().catch((e) => {
        log(e);
      });
    }
  }, [needsRegister]);

  const manageAltRegisterModal = () => {
    const answer = confirm(
      "Вы уверены, что хотите остановить процесс регистрации? Прогресс будет потерян.",
    );
    if (answer) {
      rootStore.user.logOut();
      router.push("/");
      setNeedsRegister(false);
    }
  };

  return (
    <main className={styles.main}>
      <Header />
      {needsRegister && (
        <WithModal
          open={needsRegister}
          onClose={manageAltRegisterModal}
          withCross={true}
        >
          <CompleteAltRegister
            email={userEmail}
            onClose={() => {
              setNeedsRegister(false);
            }}
          />
        </WithModal>
      )}
      <div className={styles.page}>
        <div className={styles.page_features}>
          <div className={styles.page_features_section}>
            <Image
              src={securityIcon}
              className={styles.page_features_section_icon}
              alt=""
            />
            <h2 className={styles.page_features_section_h}>
              High security to protect from piracy
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy.
            </p>
          </div>
          <div className={styles.page_features_section}>
            <Image
              src={qualityIcon}
              className={styles.page_features_section_icon}
              alt=""
            />
            <h2 className={styles.page_features_section_h}>
              Premium quality performance
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy.
            </p>
          </div>
          <div className={styles.page_features_section}>
            <Image
              src={supportIcon}
              className={styles.page_features_section_icon}
              alt=""
            />
            <h2 className={styles.page_features_section_h}>
              Full time customer support - 24/7
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy.
            </p>
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <div className={styles.footer_section}></div>
        <div className={styles.footer_section}></div>
      </footer>
    </main>
  );
}
