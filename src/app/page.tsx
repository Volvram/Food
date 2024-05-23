"use client";
import React from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./page.module.scss";
import qualityIcon from "@/assets/img/quality.png";
import securityIcon from "@/assets/img/security.png";
import supportIcon from "@/assets/img/support.png";
import { Button } from "@/components/Button";
import { CompleteAltRegister } from "@/components/CompleteAltRegister";
import Header from "@/components/Header/Header";
import WithModal from "@/components/WithModal/WithModal";
import rootStore from "@/store/RootStore/instance";
import { log } from "@/utils/log";
import { useAuthCode } from "@/utils/useAuthCode";
import useWindowDimensions from "@/utils/useWindowDimensions";

export default function Home() {
  const router = useRouter();
  const [needsRegister, setNeedsRegister, userEmail] = useAuthCode();
  const { width } = useWindowDimensions();

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

      <div className={styles.page}>
        <div className={styles.page_cover}>
          <div className={styles.page_cover_info}>
            <div className={styles.page_cover_info_title}>
              {"Дайте вашему питанию "}
              <span className={styles.page_cover_info_title_new}>новое</span>
              {" направление"}
            </div>
            {width <= 768 && (
              <div className={styles.page_cover_picture}>
                <img
                  src="https://framerusercontent.com/images/vspyf25cxABJb2vAUc84yQJXEg.png"
                  className={styles.page_cover_picture_img}
                  alt=""
                  srcSet="https://framerusercontent.com/images/vspyf25cxABJb2vAUc84yQJXEg.png?scale-down-to=512 450w, https://framerusercontent.com/images/vspyf25cxABJb2vAUc84yQJXEg.png?scale-down-to=1024 901w, https://framerusercontent.com/images/vspyf25cxABJb2vAUc84yQJXEg.png?scale-down-to=2048 1803w, https://framerusercontent.com/images/vspyf25cxABJb2vAUc84yQJXEg.png 2133w"
                  sizes="calc((min(max(100vw, 0px), 1300px) - 100px) * 0.4984)"
                />
              </div>
            )}
            <p className={styles.page_cover_info_description}>
              Представьте, что вам не нужно беспокоиться о диете, потому что мы
              предлагаем вам планы здорового и вкусного питания.
            </p>
            <Link href="/login" className={styles.page_cover_info_link}>
              <Button className={styles.page_cover_info_link_start}>
                Начать работу
              </Button>
            </Link>
          </div>
          {width > 768 && (
            <div className={styles.page_cover_picture}>
              <img
                src="https://framerusercontent.com/images/vspyf25cxABJb2vAUc84yQJXEg.png"
                className={styles.page_cover_picture_img}
                alt=""
                srcSet="https://framerusercontent.com/images/vspyf25cxABJb2vAUc84yQJXEg.png?scale-down-to=512 450w, https://framerusercontent.com/images/vspyf25cxABJb2vAUc84yQJXEg.png?scale-down-to=1024 901w, https://framerusercontent.com/images/vspyf25cxABJb2vAUc84yQJXEg.png?scale-down-to=2048 1803w, https://framerusercontent.com/images/vspyf25cxABJb2vAUc84yQJXEg.png 2133w"
                sizes="calc((min(max(100vw, 0px), 1300px) - 100px) * 0.4984)"
              />
            </div>
          )}
        </div>

        <div className={styles.page_gradient} />

        <div className={styles.page_nutrients}>
          <div className={styles.page_nutrients_title}>
            Питание, которое меняет твою жизнь
          </div>
          <div className={styles.page_nutrients_description}>
            Следите за уровнем нутриентов, создавайте персонализированные
            профили и собственные рецепты. Наше приложение предоставит вам все
            инструмента для простого и полезного анализа питания
          </div>
        </div>

        <div className={styles.page_features}>
          <div className={styles.page_features_section}>
            <Image
              src={securityIcon}
              className={styles.page_features_section_icon}
              alt=""
            />
            <h2 className={styles.page_features_section_h}>
              Высокий уровень безопасности
            </h2>
          </div>
          <div className={styles.page_features_section}>
            <Image
              src={qualityIcon}
              className={styles.page_features_section_icon}
              alt=""
            />
            <h2 className={styles.page_features_section_h}>
              Премиальное качество исполнения
            </h2>
          </div>
          <div className={styles.page_features_section}>
            <Image
              src={supportIcon}
              className={styles.page_features_section_icon}
              alt=""
            />
            <h2 className={styles.page_features_section_h}>Служба поддержки</h2>
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
