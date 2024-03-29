"use client";
import React from "react";

import Image from "next/image";

import styles from "./page.module.scss";
import qualityIcon from "@/assets/img/quality.png";
import securityIcon from "@/assets/img/security.png";
import supportIcon from "@/assets/img/support.png";
import Header from "@/components/Header/Header";
import rootStore from "@/store/RootStore/instance";
import { log } from "@/utils/log";

export default function Home() {
  React.useEffect(() => {
    rootStore.user.checkAuthorization().catch((e) => {
      log(e);
    });
  }, []);

  return (
    <main className={styles.main}>
      <Header />
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
